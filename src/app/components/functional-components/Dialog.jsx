import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput, useTheme } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/context";
import { saveGroceryList } from "../../storage/storage";
import { MaterialIcons } from "@expo/vector-icons";

const DialogWindow = ({ visible, setVisible, label }) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const theme = useTheme();
  const {
    addItemInput,
    setAddItemInput,
    groceries,
    setGroceries,
    completedGroceries,
    setCompletedGroceries,
  } = useAppContext();

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
    setGroceries((prev) => [...prev, { name: addItemInput, quantity: 1 }]);
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
            top: 180,
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
          <Dialog.Actions style={{ gap: 30 }}>
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
          </Dialog.Actions>
          {isDuplicate && (
            <View style={styles.duplicateText}>
              <Text>Item already exists</Text>
              <MaterialIcons name="error-outline" size={24} color={theme.colors.yellow} />
            </View>
          )}
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogWindow;
