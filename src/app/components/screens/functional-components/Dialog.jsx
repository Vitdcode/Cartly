import { View } from "react-native";
import { Button, Dialog, Portal, TextInput, useTheme } from "react-native-paper";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../../context/context";

const DialogWindow = ({ visible, setVisible, label }) => {
  const theme = useTheme();
  const { addItemInput, setAddItemInput, groceries, setGroceries } = useAppContext();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    setGroceries([...groceries, addItemInput]);
  };

  return (
    <View style={{ position: "relative" }}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          onShow={() => inputRef.current?.focus()}
          style={{
            position: "absolute",
            top: 200,
            left: 50,
            width: "80%",
            marginHorizontal: "auto",
          }}
        >
          <Dialog.Title>{label}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label={label}
              defaultValue={addItemInput} //workaround, instead of value to eliminate cursor flickering
              /*    value={addItemInput} */
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
              textColor={theme.colors.textColor}
              style={{ borderRadius: 10, padding: 2 }}
              onPress={hideDialog}
            >
              Close
            </Button>
            <Button
              mode="contained"
              buttonColor={theme.colors.yellow}
              textColor={theme.colors.textColor}
              style={{ borderRadius: 10, padding: 2 }}
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
