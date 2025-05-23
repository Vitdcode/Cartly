import * as NavigationBar from "expo-navigation-bar";
import { ThemeProvider } from "@react-navigation/native";
import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import merge from "deepmerge";
import { AppProvider } from "./context/context";
import Colors from "../constants/Colors.js";
import GroceriesScreen from "./components/screens/Groceries-Screen.jsx";
import { useEffect } from "react";
import CompletedGroceries from "./components/screens/CompletedGroceries.jsx";

const CombinedLightTheme = merge(MD3LightTheme, { colors: Colors.light });
const CombinedDarkTheme = merge(MD3DarkTheme, { colors: Colors.dark });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  const Stack = createNativeStackNavigator();

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

  const styles = StyleSheet.create({
    header: {
      headerStyle: {
        backgroundColor: theme.colors.background, // Background color
        elevation: 0,
        headerShadowVisible: false,
      },
      headerTintColor: theme.colors.textColor, // Text/icon color
      headerTitleStyle: {
        fontWeight: "bold", // Font weight
        fontSize: 20, // Font size
      },
    },
  });

  SystemUI.setBackgroundColorAsync(theme.colors.background);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <NavigationContainer>
          <AppProvider>
            <Stack.Navigator
              screenOptions={{
                animation: "slide_from_right",
                headerShadowVisible: false,
              }}
            >
              {/* using React Native navigation instead of tab navigation from expo */}
              <Stack.Screen
                name="Groceries"
                component={GroceriesScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Completed groceries"
                component={CompletedGroceries}
                options={styles.header}
              />
            </Stack.Navigator>

            <StatusBar
              style={theme.dark ? "light" : "dark"} // Auto-detects from theme
              backgroundColor={theme.colors.background} // Uses theme's secondary color
            />
          </AppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
}
