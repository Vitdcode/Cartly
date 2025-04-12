import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Dialog, Portal, TextInput, useTheme } from "react-native-paper";
import AddItemAnim from "../../animations/AddItemAnim";
import { useAppContext } from "../../context/context";
import { clearEntireStorage } from "../../storage/storage";

const DialogWindow = ({ visible, setVisible, label }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const { addItemInput, setAddItemInput, groceries, setGroceries, completedGroceries } =
    useAppContext();
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

  const showKeyboard = () => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 50);
  };

  const styles = StyleSheet.create({
    dialogBtn: {
      color: "black",
      borderRadius: 10,
      padding: 2,
      borderWidth: 1,
      borderColor: "white",
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
  });

  return (
    <Modal animationType="fade" visible={visible} transparent={true} onShow={showKeyboard}>
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
            height: 300,
            width: "90%",
            padding: 10,
            borderRadius: 10,
            gap: 20,
            backgroundColor: theme.colors.dialog,
            justifyContent: "flex-end",
          }}
        >
          <TextInput
            mode="flat"
            label={label}
            value={addItemInput}
            ref={inputRef}
            onChangeText={setAddItemInput}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            submitBehavior="submit"
            style={{
              backgroundColor: theme.colors.lightYellow,
            }}
          />

          <View
            style={{
              color: theme.colors.textColor,
              backgroundColor: theme.colors.lightYellow,
              borderRadius: 10,
              width: "90%",
              marginHorizontal: "auto",
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
            style={{ flexDirection: "row", gap: 30, marginHorizontal: "auto", marginBottom: 20 }}
          >
            <Button
              mode="contained"
              buttonColor={theme.colors.yellow}
              textColor="black"
              style={styles.dialogBtn}
              onPress={() => setVisible(!visible)}
            >
              Close
            </Button>
            <Button
              mode="contained"
              buttonColor={theme.colors.yellow}
              textColor="black"
              style={styles.dialogBtn}
              onPress={handleSubmit}
            >
              + Add
            </Button>
          </View>

          <AddItemAnim
            item={isDuplicate}
            text={"Item already exists"}
            icon={<MaterialIcons name="error-outline" size={24} color={theme.colors.yellow} />}
          />

          <AddItemAnim
            item={itemAdded}
            text={"Item Added"}
            icon={
              <MaterialIcons name="check-circle-outline" size={24} color={theme.colors.yellow} />
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default DialogWindow;
