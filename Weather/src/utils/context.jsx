import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [misparIshi, setMisparIshi] = useState("");
  const [username, setUsername] = useState("");

  const updateUserDisplayName = (value) => setUserDisplayName(value);
  const updateMisparIshi = (value) => setMisparIshi(value);
  const updateUsername = (value) => setUsername(value);
  return (
    <AppContext.Provider
      value={{
        userDisplayName,
        misparIshi,
        username,
        updateMisparIshi,
        updateUsername,
        updateUserDisplayName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
