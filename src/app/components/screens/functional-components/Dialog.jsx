import { View } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useEffect, useRef } from "react";

const DialogWindow = ({ visible, setVisible, label }) => {
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          onShow={() => inputRef.current?.focus()}
          style={{ position: "absolute", bottom: 30, left: 50, width: "70%" }}
        >
          <Dialog.Title>{label}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label={label}
              value={""}
              autoFocus
              /*    onChangeText={setSearchInput}
              onSubmitEditing={}
              returnKeyType="search" */
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogWindow;
