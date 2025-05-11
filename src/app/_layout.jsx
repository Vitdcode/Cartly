import { Stack } from "expo-router";
import { AppProvider } from "./context/context";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import merge from "deepmerge";
import { Appearance } from "react-native";
import { useEffect } from "react";

// Define themes directly with your custom colors
const CombinedLightTheme = merge(MD3LightTheme, { colors: Colors.light });

const CombinedDarkTheme = merge(MD3DarkTheme, { colors: Colors.dark });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const newTheme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
      SystemUI.setBackgroundColorAsync(newTheme.colors.background);
    });

    return () => subscription.remove(); // Cleanup on unmount
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        <AppProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home Screen" }} />
          </Stack>
          <StatusBar
            style={theme.dark ? "light" : "dark"} // Auto-detects from theme
            backgroundColor={theme.colors.secondary} // Uses theme's secondary color
          />
        </AppProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}
