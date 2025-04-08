import { View } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useEffect, useRef } from "react";

const DialogWindow = ({ visible, setVisible, label }) => {
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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
