import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Text, Button } from "react-native-paper";
import { useAppContext } from "../../context/context";
import { loadCompletedGroceryList, saveCompletedGroceryList } from "../../storage/storage";
import { useEffect } from "react";

const GroceryItem = ({ item, theme, screenName, items, index }) => {
  const { groceries, setGroceries, completedGroceries, setCompletedGroceries } = useAppContext();
  useEffect(() => {
    const saveCompletedGroceries = async () => {
      await saveCompletedGroceryList(completedGroceries);
    };
    saveCompletedGroceries();
  }, [completedGroceries]);
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
      borderRadius: 15,
      padding: 5,
      alignItems: "center",
      backgroundColor: theme.colors.lightYellow,
    },
    itemQuantityText: {
      color: theme.colors.textColor,
      padding: 4,
      marginHorizontal: 7,
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
      setCompletedGroceries([
        ...completedGroceries,
        { name: item.name, quantity: 1, category: item.category },
      ]);
      setGroceries(groceries.filter((i) => i.name != item.name));
    } else {
      setGroceries([...groceries, item]);
      setCompletedGroceries(completedGroceries.filter((i) => i.name != item.name));
    }
  };

  const deleteItem = (item) => {
    if (screenName === "groceriesScreen") {
      setGroceries(groceries.filter((i) => i.name != item.name));
    } else {
      setCompletedGroceries(completedGroceries.filter((i) => i.name != item.name));
    }
  };

  const checkNextItem = () => {
    if (!items[index + 1]) return;

    if (item.category === items[index + 1].category) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View>
      <View style={styles.itemStyle}>
        <Text
          variant="titleMedium"
          style={{ maxWidth: "30%" }}
          android_hyphenationFrequency="normal"
        >
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 25,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="delete-outline"
              iconColor={theme.colors.gray}
              size={28}
              onPress={() => deleteItem(item)}
            />

            <View style={styles.itemDetails}>
              <IconButton
                icon="minus-thick"
                iconColor={theme.colors.gray}
                onPress={() => handleQuantityDecrease(item)}
                size={20}
              />
              <Text variant="titleLarge" style={styles.itemQuantityText}>
                {item.quantity}
              </Text>
              <IconButton
                iconColor={theme.colors.gray}
                icon="plus-thick"
                onPress={() => handleQuantityIncrease(item)}
                size={20}
              />
            </View>
            <IconButton
              icon={
                screenName === "groceriesScreen"
                  ? "checkbox-marked-circle-outline"
                  : "arrow-left-bold-circle-outline"
              }
              iconColor={theme.colors.gray}
              size={28}
              onPress={() => moveItem(item)}
            />
          </View>
        </View>
      </View>
      {checkNextItem() && <Divider horizontalInset={true} style={{ marginTop: 10 }} />}
    </View>
  );
};

export default GroceryItem;
