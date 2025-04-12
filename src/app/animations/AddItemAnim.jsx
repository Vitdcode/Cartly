import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const AddItemAnim = ({ item, text, icon }) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);

  const styles = StyleSheet.create({
    fadeinOutStyle: {
      position: "absolute",
      top: 10,
      right: 10,
      flexDirection: "row",
      gap: "10",
      backgroundColor: theme.colors.lightYellow,
      padding: 5,
      borderRadius: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "white",
    },
  });

  useEffect(() => {
    if (item) {
      setShow(true);
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Then fade out after 2 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => setShow(false)); // hide after fade out
      }, 1000);
    }
  }, [item]);

  return (
    show && (
      <Animated.View style={[styles.fadeinOutStyle, { opacity: fadeAnim }]}>
        <Text style={{ color: theme.colors.textColor }}>{text}</Text>
        {icon}
      </Animated.View>
    )
  );
};

export default AddItemAnim;
