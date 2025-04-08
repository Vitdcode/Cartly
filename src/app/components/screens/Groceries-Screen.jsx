import { Text, Divider, useTheme, Button } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import Fab from "./functional-components/Fab";
import { useAppContext } from "../../context/context";

const GroceriesScreen = () => {
  const theme = useTheme();
  const { addItemInput, setAddItemInput, groceries, setGroceries } = useAppContext();

  const styles = StyleSheet.create({
    itemStyle: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      padding: 5,
    },
    itemDetails: {
      backgroundColor: theme.colors.yellow,
      flexDirection: "row",
      borderRadius: 11,
      padding: 5,
    },
  });

  const handleQuantityIncrease = (item) => {
    console.log(item);
    setGroceries((prev) =>
      prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const handleQuantityDecrease = (item) => {
    setGroceries((prev) =>
      prev.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity === 1 ? 1 : i.quantity - 1 } : i
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <View style={{ gap: 30, marginTop: 30 }}>
          {groceries.map((item, index) => (
            <View key={index}>
              <View style={styles.itemStyle}>
                <Text variant="titleLarge" key={index}>
                  {item.name}
                </Text>
                <View style={styles.itemDetails}>
                  <Button onPress={() => handleQuantityIncrease(item)}>+</Button>
                  <Text variant="titleLarge">{item.quantity}</Text>
                  <Button onPress={() => handleQuantityDecrease(item)}>-</Button>
                </View>
              </View>
              <Divider horizontalInset={true} />
            </View>
          ))}
        </View>
      </ScrollView>
      <Fab iconName={"plus"} />
      <Fab iconName={"text-search"} bottomValue={120} />
    </View>
  );
};

export default GroceriesScreen;
