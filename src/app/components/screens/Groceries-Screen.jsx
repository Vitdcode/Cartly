import { Text, useTheme, Button, Icon, IconButton } from "react-native-paper";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Fab from "../functional-components/Fab";
import { useAppContext } from "../../context/context";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import GroceryItem from "../helperComponents/GroceryItem";
import { useEffect, useState } from "react";
import { loadCompletedGroceryList, loadGroceryList, saveGroceryList } from "../../storage/storage";

const GroceriesScreen = () => {
  const theme = useTheme();
  const { groceries, setGroceries, setCompletedGroceries } = useAppContext();
  const [itemsPerCategory, setItemsByCategory] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const loadGroceries = async () => {
      const list = await loadGroceryList();
      if (list) setGroceries(list);
    };

    const loadCompletedGroceries = async () => {
      const list = await loadCompletedGroceryList();
      if (list) setCompletedGroceries(list);
    };

    loadGroceries();
    loadCompletedGroceries();
  }, []);

  useEffect(() => {
    const saveGroceries = async () => {
      await saveGroceryList(groceries);
    };
    saveGroceries();
  }, [groceries]);

  const metricDate = () => {
    const today = new Date();
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return today.toLocaleDateString("de-DE", options);
  };

  useEffect(() => {
    setItemsByCategory(
      groceries.reduce((acc, item) => {
        const categoryOrder = item?.category.split("|")[1];
        const category = item?.category.split("|")[0];
        if (!acc[categoryOrder]) {
          acc[categoryOrder] = { category: category, items: [] };
        }

        acc[categoryOrder]["items"].push({
          name: item.name,
          quantity: item.quantity,
          category: item.category,
        });
        return acc;
      }, {})
    );
  }, [groceries]);

  const styles = StyleSheet.create({
    date: {
      marginHorizontal: "auto",
      padding: 4,
      backgroundColor: theme.colors.yellow,
      color: "black",
      borderRadius: 10,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 210 }} stickyHeaderIndices={[0]}>
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: theme.colors.lightYellow,
            borderBottomWidth: 1,
            borderColor: "white",
          }}
        >
          <Text variant="titleMedium" style={{ marginHorizontal: "auto" }}>
            {metricDate()}
          </Text>
          <Text variant="titleMedium" style={{ marginHorizontal: "auto", marginTop: 10 }}>
            Einkaufsliste
          </Text>
        </View>
        <View style={{ gap: 30, marginTop: 350 }}>
          {Object.values(itemsPerCategory).map(({ category, items }) => (
            <View key={category}>
              <Text
                variant="bodyLarge"
                style={{
                  backgroundColor: theme.colors.lightYellow,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "white",
                  textAlign: "center",
                  color: theme.colors.textColor,
                  padding: 4,
                  marginBottom: 10,
                }}
              >
                {category}
              </Text>
              <View style={{ gap: 20 }}>
                {items?.map((item, index) => (
                  <GroceryItem
                    item={item}
                    theme={theme}
                    screenName={"groceriesScreen"}
                    key={index}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Fab iconName={"plus"} />
      <Fab
        iconName={"checkbox-marked-circle-outline"}
        bottomValue={120}
        onPress={() => navigation.navigate("Completed groceries")}
      />
    </SafeAreaView>
  );
};

export default GroceriesScreen;
