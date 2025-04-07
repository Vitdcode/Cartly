import React, { createContext, useState, useContext, ReactNode } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [groceries, setGroceries] = useState([]);

  return (
    <AppContext.Provider
      value={{
        groceries,
        setGroceries,
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
