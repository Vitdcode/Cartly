import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Fab from "./functional-components/Fab";
import { useAppContext } from "../../context/context";

const GroceriesScreen = () => {
  const { addItemInput, setAddItemInput, groceries, setGroceries } = useAppContext();
  return (
    <View style={{ flex: 1 }}>
      <View style={{}}>
        {groceries.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
      <Fab iconName={"plus"} />
      <Fab iconName={"text-search"} bottomValue={120} />
    </View>
  );
};

export default GroceriesScreen;
