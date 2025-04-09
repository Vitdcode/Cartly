import { Text, Divider, useTheme, Button, Icon } from "react-native-paper";
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
      justifyContent: "space-between",
      marginHorizontal: 20,
      alignItems: "center",
      padding: 5,
    },
    itemDetails: {
      /*    backgroundColor: theme.colors.yellow, */
      borderWidth: 1,
      borderColor: "white",
      flexDirection: "row",
      borderRadius: 11,
      padding: 5,
      alignItems: "center",
    },
    itemQuantityText: {
      color: theme.colors.textColor,
      padding: 4,
    },
    date: {
      marginHorizontal: "auto",
      marginTop: 20,
      padding: 4,
      backgroundColor: theme.colors.yellow,
      color: "black",
      borderRadius: 10,
    },
    deleteIcon: {
      padding: 5,
      height: 50,
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

  const metricDate = () => {
    const today = new Date();
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return today.toLocaleDateString("de-DE", options);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <Text variant="titleMedium" style={styles.date}>
          {metricDate()}
        </Text>
        <View style={{ gap: 30, marginTop: 350 }}>
          {groceries.map((item, index) => (
            <View key={index}>
              <View style={styles.itemStyle}>
                <Text variant="titleLarge" key={index}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 25,
                  }}
                >
                  <View style={styles.itemDetails}>
                    <Button onPress={() => handleQuantityIncrease(item)}>+</Button>
                    <Text variant="titleLarge" style={styles.itemQuantityText}>
                      {item.quantity}
                    </Text>
                    <Button onPress={() => handleQuantityDecrease(item)}>-</Button>
                  </View>
                  <Icon source="delete-outline" color={theme.colors.gray} size={30} />
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
