import { Text, useTheme, Button, Icon, IconButton } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import Fab from "../functional-components/Fab";
import { useAppContext } from "../../context/context";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import GroceryItem from "../helperComponents/GroceryItem";
import { useEffect } from "react";
import { loadCompletedGroceryList, loadGroceryList, saveGroceryList } from "../../storage/storage";

const GroceriesScreen = () => {
  const theme = useTheme();
  const {
    addItemInput,
    setAddItemInput,
    groceries,
    setGroceries,
    completedGroceries,
    setCompletedGroceries,
  } = useAppContext();
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
        <View style={{ paddingVertical: 10 }}>
          <Text variant="titleMedium" style={styles.date}>
            {metricDate()}
          </Text>
        </View>
        <View style={{ gap: 30, marginTop: 350 }}>
          {groceries?.map((item, index) => (
            <GroceryItem
              item={item}
              index={index}
              theme={theme}
              screenName={"groceriesScreen"}
              key={index}
            />
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
