import React, { createContext, useState, useContext, ReactNode } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([]);
  const [completedGroceries, setCompletedGroceries] = useState([]);
  const [addItemInput, setAddItemInput] = useState("");
  const [searchDialogVisible, SetSearchDialogVisible] = useState(false);
  const [addItemDialogVisible, SetAddItemDialogVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsNotCompleted, setSearchResultsNotCompleted] = useState([]);

  return (
    <AppContext.Provider
      value={{
        groceries,
        setGroceries,
        completedGroceries,
        setCompletedGroceries,
        addItemInput,
        setAddItemInput,
        searchDialogVisible,
        SetSearchDialogVisible,
        addItemDialogVisible,
        SetAddItemDialogVisible,
        searchResults,
        setSearchResults,
        searchResultsNotCompleted,
        setSearchResultsNotCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
