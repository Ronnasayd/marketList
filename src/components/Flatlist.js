import Checkbox from "expo-checkbox";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Circle as ProgressCircle } from "react-native-progress";

const FlatListBasics = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);

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
  function handleRemove(item) {
    const dataCopy = [...data].filter((i) => i.name !== item.name);
    setData(dataCopy);
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

  const createTwoButtonAlert = (item) =>
    Alert.alert("Remover item", "Tem certeza que deseja remover este item?", [
      {
        text: "Cancelar",
        onPress: () => {},
      },
      { text: "OK", onPress: () => handleRemove(item) },
    ]);

  return (
    <View className="flex-1 bg-neutral-800 p-6 gap-4 grid">
      {!focus && (
        <View className="grid justify-center items-center">
          <ProgressCircle
            textStyle={{ fontSize: 20, fontWeight: "bold" }}
            progress={percentage}
            size={100}
            color="#AE37FF"
            thickness={5}
            showsText={true}
          ></ProgressCircle>
        </View>
      )}

      <FlatList
        className="py-4"
        data={data}
        renderItem={({ item }) => (
          <View className="flex flex-row gap-4 items-center mb-2">
            <Checkbox
              value={item.value}
              color={item.value ? "#AE37FF" : undefined}
              onValueChange={() => handleChange(item)}
            ></Checkbox>
            <Text className="text-neutral-300 text-lg capitalize">{`${item.name}`}</Text>
            <TouchableOpacity
              onPress={() => createTwoButtonAlert(item)}
              className="px-4 py-1  border border-purple-500 rounded-full  flex justify-center items-center"
            >
              <Text className="text-purple-500 text-xs ">Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
          className="bg-purple-500 p-2 rounded-lg flex justify-center items-center"
        >
          <Text className="font-bold text-lg text-neutral-800">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatListBasics;
