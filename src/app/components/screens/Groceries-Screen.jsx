import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Fab from "./functional-components/Fab";

const GroceriesScreen = () => {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Fab iconName={"plus"} />
      <Fab iconName={"text-search"} bottomValue={120} />
    </View>
  );
};

export default GroceriesScreen;
