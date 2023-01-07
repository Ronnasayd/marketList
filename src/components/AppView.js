import Clipboard from "@react-native-clipboard/clipboard";
import clsx from "clsx";
import Checkbox from "expo-checkbox";
import { useMemo, useState } from "react";
import {
  Alert,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Circle as ProgressCircle } from "react-native-progress";
import colors from "tailwindcss/colors";
import PasteIcon from "./icons/PasteIcon";
import TrashIcon from "./icons/TrashIcon";
import WhatsIcon from "./icons/WhtasIcon";

const RenderItem = ({ item, drag, isActive, handleChange, removeOneAlert }) => {
  return (
    <TouchableOpacity
      onPress={() => handleChange(item)}
      onLongPress={drag}
      className={isActive ? "bg-neutral-700" : "bg-transparent"}
    >
      <View className="py-2 px-4 border-b border-neutral-700 l-inline-between-center">
        <View className="l-inline-start-center gap-3">
          <Checkbox
            value={item.value}
            color={item.value ? colors.violet[500] : undefined}
            onValueChange={() => handleChange(item)}
          ></Checkbox>
          <Text className="text-neutral-300 text-lg capitalize">{`${item.name}`}</Text>
        </View>

        <TouchableOpacity
          onPress={() => removeOneAlert(item)}
          className="px-4 py-1  border border-violet-400 rounded-full    l-inline-center-center"
        >
          <Text className="text-violet-400 text-xs ">Remover</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const AddView = ({ input, setInput, setFocus, handleAdd, addClass }) => {
  return (
    <View className={clsx(addClass, " gap-y-2")}>
      <TextInput
        className="border border-neutral-500 p-1 pl-4 text-neutral-300 rounded"
        value={input}
        onChangeText={setInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      ></TextInput>
      <TouchableOpacity
        onPress={handleAdd}
        className="bg-violet-400 p-2 rounded-lg l-inline-center-center"
      >
        <Text className="font-bold text-lg text-neutral-800">Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const OptionButtons = ({
  fetchCopiedText,
  removeAllAlert,
  handleSendWhats,
  addClass,
}) => {
  return (
    <View className={clsx(addClass, " l-inline-evenly-center")}>
      <TouchableOpacity
        className="bg-neutral-900 rounded-full p-4"
        onPress={() => fetchCopiedText()}
      >
        <PasteIcon></PasteIcon>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-neutral-900 rounded-full p-4"
        onPress={() => removeAllAlert()}
      >
        <TrashIcon></TrashIcon>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-neutral-900 rounded-full p-4"
        onPress={() => handleSendWhats()}
      >
        <WhatsIcon></WhatsIcon>
      </TouchableOpacity>
    </View>
  );
};

const ItensList = ({
  data,
  removeOneAlert,
  handleChange,
  addClass,
  setData,
}) => {
  return (
    <DraggableFlatList
      keyExtractor={(item, index) => item.name}
      onDragEnd={({ data }) => {
        setData(data);
      }}
      className={clsx(addClass, "bg-neutral-900 rounded-lg ")}
      data={data}
      renderItem={({ item, drag, isActive }) => (
        <RenderItem
          item={item}
          drag={drag}
          isActive={isActive}
          handleChange={handleChange}
          removeOneAlert={removeOneAlert}
        />
      )}
    />
  );
};

const ProgressBar = ({ percentage, addClass }) => {
  return (
    <View className={clsx(addClass, " grid justify-center items-center")}>
      <ProgressCircle
        textStyle={{ fontSize: 20, fontWeight: "bold" }}
        progress={percentage}
        size={100}
        color={colors.violet[400]}
        thickness={8}
        showsText={true}
      ></ProgressCircle>
    </View>
  );
};

const AppView = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    if (text) {
      const copyList = text
        .split("\n")
        .map((item) => ({ name: item, value: false }));
      setData([...data, ...copyList]);
    }
  };

  function handleChange(item) {
    const index = data.findIndex((d) => d.name === item.name);
    const dataCopy = [...data];
    dataCopy[index].value = !dataCopy[index].value;
    setData(dataCopy);
  }

  function handleAdd() {
    if (input) {
      const item = data.find(
        (item) => item.name.toLowerCase() === input.toLowerCase()
      );
      if (!item) {
        const dataCopy = [...data, { name: input, value: false }];
        setData(dataCopy);
      }
      setInput("");
    }
  }
  function handleRemoveAll() {
    setData([]);
  }
  function handleRemoveOne(item) {
    const dataCopy = [...data].filter((i) => i.name !== item.name);
    setData(dataCopy);
  }
  function handleSendWhats() {
    const text = data.map((item) => item.name).join("\n");
    const url = `whatsapp://send?text=${text}`;
    Linking.openURL(url);
  }

  const percentage = useMemo(() => {
    if (!data.length) return 0.0;
    return (
      data.reduce((prev, curr) => {
        prev = prev + curr.value;
        return prev;
      }, 0.0) / data.length
    );
  }, [data]);

  const removeOneAlert = (item) =>
    Alert.alert("Remover item", "Tem certeza que deseja remover este item?", [
      {
        text: "Cancelar",
        onPress: () => {},
      },
      { text: "OK", onPress: () => handleRemoveOne(item) },
    ]);

  const removeAllAlert = () =>
    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover todos os itens?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
        },
        { text: "OK", onPress: () => handleRemoveAll() },
      ]
    );

  return (
    <View className="bg-neutral-800 py-6 px-8 h-screen l-stack-between-nowrap">
      {!focus && <ProgressBar percentage={percentage} />}

      <ItensList
        setData={setData}
        data={data}
        handleChange={handleChange}
        removeOneAlert={removeOneAlert}
        addClass="h-[50%]"
      />
      <OptionButtons
        fetchCopiedText={fetchCopiedText}
        handleSendWhats={handleSendWhats}
        removeAllAlert={removeAllAlert}
        addClass=""
      />
      <AddView
        handleAdd={handleAdd}
        input={input}
        setFocus={setFocus}
        setInput={setInput}
        addClass=""
      />
    </View>
  );
};

export default AppView;
