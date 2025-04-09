import { StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, TextInput, useTheme } from "react-native-paper";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../../context/context";

const DialogWindow = ({ visible, setVisible, label }) => {
  const theme = useTheme();
  const { addItemInput, setAddItemInput, groceries, setGroceries } = useAppContext();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    setGroceries([...groceries, { name: addItemInput, quantity: 1 }]);
  };

  const styles = StyleSheet.create({
    dialogBtn: {
      color: "black",
      borderRadius: 10,
      padding: 2,
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
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogWindow;
