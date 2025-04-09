import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Text, Button } from "react-native-paper";
import { useAppContext } from "../../context/context";

const GroceryItem = ({ item, index, theme, screenName }) => {
  const { groceries, setGroceries, completedGroceries, setCompletedGroceries } = useAppContext();

  const styles = StyleSheet.create({
    itemStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 20,
      alignItems: "center",
      padding: 5,
    },
    itemDetails: {
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

    deleteIcon: {
      padding: 5,
      height: 50,
    },
  });

  const handleQuantityIncrease = (item) => {
    if (screenName === "groceriesScreen") {
      setGroceries((prev) =>
        prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))
      );
    } else {
      setCompletedGroceries((prev) =>
        prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))
      );
    }
  };

  const handleQuantityDecrease = (item) => {
    if (screenName === "groceriesScreen") {
      setGroceries((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity === 1 ? 1 : i.quantity - 1 } : i
        )
      );
    } else {
      setCompletedGroceries((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity === 1 ? 1 : i.quantity - 1 } : i
        )
      );
    }
  };

  const moveItem = (item) => {
    if (screenName === "groceriesScreen") {
      setCompletedGroceries([...completedGroceries, { name: item.name, quantity: 1 }]);
      setGroceries(groceries.filter((i) => i.name != item.name));
    } else {
      setGroceries([...groceries, item]);
      setCompletedGroceries(completedGroceries.filter((i) => i.name != item.name));
    }
  };

  return (
    <View>
      <View style={styles.itemStyle}>
        <Text variant="titleLarge">{item.name}</Text>
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
          <IconButton
            icon={
              screenName === "groceriesScreen"
                ? "checkbox-marked-circle-outline"
                : "arrow-left-bold-circle-outline"
            }
            iconColor={theme.colors.gray}
            size={30}
            onPress={() => moveItem(item)}
          />
        </View>
      </View>
      <Divider horizontalInset={true} />
    </View>
  );
};
{
  /* <MaterialCommunityIcons name="arrow-left-bold-circle-outline" size={24} color="black" />
<MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="black" />
 */
}
export default GroceryItem;
