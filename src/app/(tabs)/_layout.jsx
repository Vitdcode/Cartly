import { Tabs } from "expo-router";
/* icons */
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();

  const screenOptions = {
    tabBarStyle: {
      borderTopWidth: 0,
      elevation: 5,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: theme.fonts.regular.fontFamily,
    },
    headerStyle: {
      backgroundColor: theme.colors.secondary, // Header color for all screens
    },
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Groceries-list",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
