import { Stack } from "expo-router";

import { ThemeProvider } from "@react-navigation/native";
import { SafeAreaView, useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import merge from "deepmerge";
import { AppProvider } from "./context/context";
import Colors from "../constants/Colors.js";
import GroceriesScreen from "./components/screens/Groceries-Screen.jsx";

const CombinedLightTheme = merge(MD3LightTheme, { colors: Colors.light });
const CombinedDarkTheme = merge(MD3DarkTheme, { colors: Colors.dark });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <AppProvider>
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "center",
              position: "relative",
              backgroundColor: theme.colors.background,
            }}
          >
            <GroceriesScreen />
          </SafeAreaView>
          <StatusBar
            style={theme.dark ? "light" : "dark"} // Auto-detects from theme
            backgroundColor={theme.colors.primary} // Uses theme's secondary color
          />
        </AppProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
