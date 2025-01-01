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
  const [selectedSearch, setSelectedSearch] = useState("");

  const updateSelectedSearch = (value) => setSelectedSearch(value);

  const updateLastSearches = (newSearch) => {
    setLastSearches((prevSearches) => {
      if (prevSearches.length > 0 && prevSearches[0].city === newSearch.city) {
        return prevSearches;
      }
      const updatedSearches = [newSearch, ...prevSearches];
      return updatedSearches.slice(0, process.env.MAX_SEARCHES);
    });
  };
  const removeSearchByIndex = (index) => {
    setLastSearches((prevSearches) =>
      prevSearches.filter((search, i) => i !== index)
    );
  };
  const removeSearch = (index) => {
    const isSelected = selectedSearch.city === lastSearches[index].city;
  
    if (isSelected) {
      updateSelectedSearch("");
    }
    removeSearchByIndex(index);
    if (isSelected && lastSearches.length > 1) {
      const nextIndex = (index + 1) % lastSearches.length;
      updateSelectedSearch(lastSearches[nextIndex]);
    }
  };
  

  return (
    <SearchContext.Provider
      value={{
        lastSearches,
        updateLastSearches,
        selectedSearch,
        updateSelectedSearch,
        removeSearchByIndex,
        removeSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [dailyWeather, setDailyWeather] = useState({ city: "", days: [] });

  const updateDailyWeather = (value) => setDailyWeather(value);

  return (
    <WeatherContext.Provider
      value={{
        dailyWeather,
        updateDailyWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
