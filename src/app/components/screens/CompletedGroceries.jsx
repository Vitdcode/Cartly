import { Text, useTheme } from "react-native-paper";
import { useAppContext } from "../../context/context";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GroceryItem from "../helperComponents/GroceryItem";

const CompletedGroceries = () => {
  const { completedGroceries, setCompletedGroceries } = useAppContext();
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <View style={{ gap: 30, marginTop: 350 }}>
          {completedGroceries.map((item, index) => (
            <GroceryItem
              item={item}
              index={index}
              theme={theme}
              screenName={"completedGroceriesScreen"}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedGroceries;
