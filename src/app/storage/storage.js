import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveGroceryList = async (list) => {
  try {
    await AsyncStorage.setItem("groceryList", JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save list:", e);
  }
};

export const loadGroceryList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("groceryList");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load list", e);
    return [];
  }
};

export const saveCompletedGroceryList = async (list) => {
  try {
    await AsyncStorage.setItem("completedGroceryList", JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save list:", e);
  }
};

export const loadCompletedGroceryList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("completedGroceryList");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load list", e);
    return [];
  }
};

export const clearEntireStorage = async () => {
  try {
    await AsyncStorage.clear();
    ("Entire AsyncStorage cleared");
    return true;
  } catch (e) {
    console.error("Failed to clear storage:", e);
    return false;
  }
};
