import Checkbox from "expo-checkbox";
import { useMemo, useState } from "react";
import {
  Alert,
  Clipboard,
  FlatList,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Circle as ProgressCircle } from "react-native-progress";
import colors from "tailwindcss/colors";
import PasteIcon from "./Paste";
import TrashIcon from "./TrashIcon";
import WhatsIcon from "./WhtasIcon";

const FlatListBasics = () => {
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
      const dataCopy = [...data, { name: input, value: false }];
      setData(dataCopy);
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
    console.log({ text });
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
    <View className="flex-1 bg-neutral-800 p-6 gap-4 grid">
      {!focus && (
        <View className="grid justify-center items-center">
          <ProgressCircle
            textStyle={{ fontSize: 20, fontWeight: "bold" }}
            progress={percentage}
            size={100}
            color={colors.purple[300]}
            thickness={5}
            showsText={true}
          ></ProgressCircle>
        </View>
      )}

      <FlatList
        className="bg-neutral-900 px-4 py-2 rounded-lg"
        data={data}
        renderItem={({ item }) => (
          <View className="flex flex-row gap-4 items-center mb-2 border-b border-neutral-700 p-2">
            <Checkbox
              value={item.value}
              color={item.value ? "#AE37FF" : undefined}
              onValueChange={() => handleChange(item)}
            ></Checkbox>
            <Text className="text-neutral-300 text-lg capitalize">{`${item.name}`}</Text>
            <TouchableOpacity
              onPress={() => removeOneAlert(item)}
              className="px-4 py-1  border border-purple-400 rounded-full  flex justify-center items-center"
            >
              <Text className="text-purple-400 text-xs ">Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View className="flex flex-row gap-4">
        <TouchableOpacity onPress={() => fetchCopiedText()}>
          <PasteIcon></PasteIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeAllAlert()}>
          <TrashIcon></TrashIcon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSendWhats()}>
          <WhatsIcon></WhatsIcon>
        </TouchableOpacity>
      </View>
      <View className="grid gap-2">
        <TextInput
          className="border border-neutral-500 p-1 pl-4 text-neutral-300 rounded"
          value={input}
          onChangeText={setInput}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        ></TextInput>
        <TouchableOpacity
          onPress={handleAdd}
          className="bg-purple-400 p-2 rounded-lg flex justify-center items-center"
        >
          <Text className="font-bold text-lg text-neutral-800">Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatListBasics;
