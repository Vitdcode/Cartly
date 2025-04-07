import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const GroceriesScreen = () => {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Fab iconName={"plus"} />
      <Fab iconName={"text-search"} bottomValue={100} />
    </View>
  );
};

const Fab = ({ iconName, bottomValue = 20 }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: bottomValue,
      backgroundColor: theme.colors.secondary,
    },
  });

  return <FAB icon={iconName} style={styles.fab} onPress={() => console.log("Pressed")} />;
};

export default GroceriesScreen;
