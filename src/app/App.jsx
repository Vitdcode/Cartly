import * as NavigationBar from "expo-navigation-bar";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import merge from "deepmerge";
import { AppProvider } from "./context/context";
import Colors from "../constants/Colors.js";
import GroceriesScreen from "./components/screens/Groceries-Screen.jsx";
import { useEffect } from "react";

const CombinedLightTheme = merge(MD3LightTheme, { colors: Colors.light });
const CombinedDarkTheme = merge(MD3DarkTheme, { colors: Colors.dark });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  useEffect(() => {
    const setNavBarTransparent = async () => {
      try {
        NavigationBar.setPositionAsync("absolute");
        NavigationBar.setBackgroundColorAsync(theme.colors.background);
      } catch (error) {
        console.error("Failed to set navigation bar color:", error);
      }
    };

    setNavBarTransparent();
  }, [theme]);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <AppProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: theme.colors.background,
            }}
          >
            <GroceriesScreen />
          </SafeAreaView>
          <StatusBar
            style={theme.dark ? "light" : "dark"} // Auto-detects from theme
            backgroundColor={theme.colors.statusBar} // Uses theme's secondary color
          />
        </AppProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
