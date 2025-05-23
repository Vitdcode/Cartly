import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Dialog, Portal, Text, TextInput, useTheme } from "react-native-paper";
import AddItemAnim from "../../animations/AddItemAnim";
import { useAppContext } from "../../context/context";
import { clearEntireStorage } from "../../storage/storage";

const DialogWindow = ({ visible, setVisible, label }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const {
    addItemInput,
    setAddItemInput,
    groceries,
    setGroceries,
    completedGroceries,
    setCompletedGroceries,
    searchResults,
    setSearchResults,
    searchResultsNotCompleted,
    setSearchResultsNotCompleted,
  } = useAppContext();
  const inputRef = useRef(null);
  const theme = useTheme();

  const categories = [
    "Obst|1",
    "Fleisch|2",
    "Diverse Lebensmittel|3",
    "Milchprodukte|4",
    "Haushalt|5",
    "Drogerie|6",
    "Tiefkühl|7",
    "Getränke|8",
    "Sonstiges|9",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[categories.length - 1]);

  const handleSubmit = () => {
    const alreadyExists = groceries?.some(
      (item) => item.name.toLowerCase().trim() === addItemInput.toLowerCase().trim()
    );
    const alreadyExistsCompleted = completedGroceries.some(
      (item) => item.name.toLowerCase().trim() === addItemInput.toLowerCase().trim()
    );
    if (alreadyExists || alreadyExistsCompleted) {
      setIsDuplicate(true);
      setTimeout(() => {
        setIsDuplicate(false);
      }, 1000);
      setAddItemInput("");
      return;
    }
    setItemAdded(true);

    setTimeout(() => {
      setItemAdded(false);
    }, 1000);

    setGroceries((prev) => [
      ...prev,
      { name: addItemInput, quantity: 1, category: selectedCategory },
    ]);
    setAddItemInput("");
  };

  const handleSubmitSearch = (itemFromSearch) => {
    const alreadyExists = groceries?.some(
      (item) => item.name.toLowerCase().trim() === itemFromSearch.name.toLowerCase().trim()
    );

    if (alreadyExists) {
      setIsDuplicate(true);
      setTimeout(() => {
        setIsDuplicate(false);
      }, 1000);
      return;
    }
    setItemAdded(true);

    setTimeout(() => {
      setItemAdded(false);
    }, 1000);

    setGroceries((prev) => [
      ...prev,
      { name: itemFromSearch.name, quantity: 1, category: itemFromSearch.category },
    ]);

    setCompletedGroceries(completedGroceries.filter((item) => item.name != itemFromSearch.name));
    setSearchResults(searchResults.filter((item) => item.name != itemFromSearch.name));
  };

  const showKeyboard = () => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 50);
  };

  const changeInputTextAndSearchGroceries = (text) => {
    // Always update the input text state immediately
    setAddItemInput(text);

    // Function to handle search logic for both groceries and completedGroceries
    const handleSearch = (items, setSearchResultsFn) => {
      // If the input text is empty, clear the search results and exit
      if (text.length === 0) {
        setSearchResultsFn([]);
        return;
      }

      const lowerCaseText = text.toLowerCase(); // Optimize by converting text to lowercase once

      // Use a Set to keep track of names that have already been added to our search results
      // This efficiently prevents duplicates by name.
      const seenNames = new Set();

      // Filter the items array to find all matches
      const filteredResults = items.filter((item) => {
        const lowerCaseItemName = item.name.toLowerCase();

        // Check if the item name includes the search text AND if this specific item name
        // has not already been added to our filtered results.
        if (lowerCaseItemName.includes(lowerCaseText) && !seenNames.has(lowerCaseItemName)) {
          seenNames.add(lowerCaseItemName); // Add the name to the Set to mark it as seen
          return true; // Include this item in the results
        }
        return false; // Exclude this item
      });

      // Update the searchResults state once with the new, de-duplicated list of matches
      setSearchResultsFn(filteredResults);
    };

    // Perform search on completedGroceries
    handleSearch(completedGroceries, setSearchResults);

    // Perform search on groceries
    handleSearch(groceries, setSearchResultsNotCompleted);
  };

  const styles = StyleSheet.create({
    dialogBtn: {
      borderRadius: 10,
      padding: 2,
      borderWidth: 1,
      borderColor: "rgba(22, 22, 22, 0.05)",
      width: 100,
    },
    duplicateText: {
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
    searchResult: {
      backgroundColor: theme.colors.onPrimary,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.07)",
      fontSize: 20,
      color: theme.colors.textColor,
    },
  });

  return (
    <Modal animationType="slide" visible={visible} transparent={true} onShow={showKeyboard}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(43, 43, 43, 0.5)",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            height: 350,
            width: "90%",
            padding: 10,
            borderRadius: 20,
            gap: 20,
            backgroundColor: theme.colors.background,
            justifyContent: "flex-end",
          }}
        >
          <TextInput
            mode="outlined"
            label={label}
            value={addItemInput}
            ref={inputRef}
            onChangeText={(text) => changeInputTextAndSearchGroceries(text)}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            submitBehavior="submit"
            cursorColor={theme.colors.secondary}
            underlineColor={theme.colors.secondary}
            activeUnderlineColor={theme.colors.secondary}
            outlineColor="rgba(0, 0, 0, 0.07)"
            activeOutlineColor="rgba(97, 97, 97, 0.88)"
            style={{
              backgroundColor: theme.colors.lightGray,
              width: "90%",
              marginHorizontal: "auto",
              marginTop: 50,
            }}
          />

          <View
            style={{
              color: theme.colors.textColor,
              backgroundColor: theme.colors.lightGray,
              borderRadius: 10,
              width: "85%",
              marginHorizontal: "auto",
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.07)",
            }}
          >
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              mode="dropdown"
              style={{
                color: theme.colors.textColor,
              }}
            >
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category.split("|")[0]} value={category} />
              ))}
            </Picker>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 30,
              marginHorizontal: "auto",
            }}
          >
            <Button
              mode="contained"
              buttonColor={theme.colors.onPrimary}
              textColor="rgb(141, 141, 141)"
              style={styles.dialogBtn}
              onPress={() => setVisible(!visible)}
            >
              Close
            </Button>
            <Button
              mode="contained"
              buttonColor="rgb(92, 94, 231)"
              textColor="rgb(236, 236, 236)"
              style={styles.dialogBtn}
              onPress={handleSubmit}
            >
              + Add
            </Button>
          </View>

          <AddItemAnim
            item={isDuplicate}
            text={"Item already exists"}
            icon={<MaterialIcons name="error-outline" size={25} color={theme.colors.blue} />}
          />

          <AddItemAnim
            item={itemAdded}
            text={"Item Added"}
            icon={<MaterialIcons name="check-circle" size={25} color={theme.colors.blue} />}
          />
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexDirection: "row",
              gap: 20,
              height: 50,
            }}
            keyboardShouldPersistTaps="always"
          >
            {searchResults.length > 0 &&
              searchResults.map((item, index) => (
                <Text
                  key={index}
                  style={styles.searchResult}
                  onPress={() => handleSubmitSearch(item)}
                >
                  {item.name}
                </Text>
              ))}
            {searchResultsNotCompleted.length > 0 &&
              searchResultsNotCompleted.map((item, index) => (
                <View style={{ position: "relative" }} key={index}>
                  <Text style={styles.searchResult}>{item.name}</Text>
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={20}
                    color={theme.colors.blue}
                    style={{ position: "absolute", top: 0, right: 0, zIndex: 100 }}
                  />
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DialogWindow;
