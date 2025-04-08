import { StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import DialogWindow from "./Dialog";
import { useAppContext } from "../../../context/context";

const Fab = ({ iconName, bottomValue = 40 }) => {
  const {
    searchDialogVisible,
    SetSearchDialogVisible,
    addItemDialogVisible,
    SetAddItemDialogVisible,
  } = useAppContext();

  const theme = useTheme();
  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: bottomValue,
      backgroundColor: theme.colors.yellow,
      borderWidth: 1,
      borderColor: "white",
    },
  });

  const handlePress = () => {
    iconName === "plus"
      ? SetAddItemDialogVisible(!addItemDialogVisible)
      : SetSearchDialogVisible(!searchDialogVisible);
  };

  return (
    <>
      <FAB icon={iconName} style={styles.fab} onPress={handlePress} color="black" />
      {iconName === "plus" ? (
        <DialogWindow
          visible={addItemDialogVisible}
          setVisible={SetAddItemDialogVisible}
          label={"Add item"}
        />
      ) : (
        <DialogWindow
          visible={searchDialogVisible}
          setVisible={SetSearchDialogVisible}
          label={"Search list"}
        />
      )}
    </>
  );
};

export default Fab;
