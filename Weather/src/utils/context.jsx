import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [misparIshi, setMisparIshi] = useState("");
  const [username, setUsername] = useState("");

  const updateUserDisplayName = (value) => setUserDisplayName(value);
  const updateMisparIshi = (value) => setMisparIshi(value);
  const updateUsername = (value) => setUsername(value);

  return (
    <UserContext.Provider
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
    </UserContext.Provider>
  );
};

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [lastSearches, setLastSearches] = useState([]);

  const updateLastSearches = (newSearch) => {
    setLastSearches((prevSearches) => {
      const updatedSearches = [newSearch, ...prevSearches];
      return updatedSearches.slice(0, process.env.MAX_SEARCHES);
    });
  };

  return (
    <SearchContext.Provider
      value={{
        lastSearches,
        updateLastSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
