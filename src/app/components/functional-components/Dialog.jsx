import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput, useTheme } from "react-native-paper";
import { useAppContext } from "../../context/context";
import { Picker } from "@react-native-picker/picker";
import { clearEntireStorage } from "../../storage/storage";

const DialogWindow = ({ visible, setVisible, label }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);

  const categories = [
    "Obst|1",
    "Fleisch|2",
    "Diverse Lebensmittel|3",
    "Milchprodukte|4",
    "Drogerie|5",
    "Tiefkühl|6",
    "Getränke|7",
    "Sonstiges|8",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[categories.length - 1]);

  const theme = useTheme();
  const { addItemInput, setAddItemInput, groceries, setGroceries, completedGroceries } =
    useAppContext();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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
  };

  const handleDeleteStorage = () => {
    const deleteStorage = async () => {
      await clearEntireStorage();
    };

    deleteStorage();
  };

  const styles = StyleSheet.create({
    dialogBtn: {
      color: "black",
      borderRadius: 10,
      padding: 2,
      borderWidth: 1,
      borderColor: "white",
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
    <View style={{ position: "relative" }}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          onShow={() => inputRef.current?.focus()}
          style={{
            position: "absolute",
            top: 110,
            left: 50,
            width: "80%",
            marginHorizontal: "auto",
            backgroundColor: theme.colors.dialog,
          }}
        >
          <Dialog.Title>{label}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="flat"
              label={label}
              defaultValue={addItemInput} //workaround, instead of value to eliminate cursor flickering
              autoFocus
              onChangeText={setAddItemInput}
              onSubmitEditing={handleSubmit}
              returnKeyType="send"
              submitBehavior="submit"
              style={{ backgroundColor: theme.colors.lightYellow }}
            />
          </Dialog.Content>
          <Dialog.Actions style={{ gap: 30, flexDirection: "column" }}>
            <View
              style={{
                color: theme.colors.textColor,
                backgroundColor: theme.colors.lightYellow,
                borderRadius: 10,
                width: "90%",
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

            <View style={{ flexDirection: "row", gap: 20 /*  marginLeft: "auto" */ }}>
              <Button
                mode="contained"
                buttonColor={theme.colors.yellow}
                textColor="black"
                style={styles.dialogBtn}
                onPress={handleDeleteStorage}
              >
                Delete
              </Button>
              <Button
                mode="contained"
                buttonColor={theme.colors.yellow}
                textColor="black"
                style={styles.dialogBtn}
                onPress={hideDialog}
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
          </Dialog.Actions>
          {isDuplicate && (
            <View style={styles.duplicateText}>
              <Text>Item already exists</Text>
              <MaterialIcons name="error-outline" size={24} color={theme.colors.yellow} />
            </View>
          )}
          {itemAdded && (
            <View style={styles.duplicateText}>
              <Text>Item added</Text>
              <MaterialIcons name="check-circle-outline" size={24} color={theme.colors.yellow} />
            </View>
          )}
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogWindow;
