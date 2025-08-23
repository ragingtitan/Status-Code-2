import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const DesktopProvider = ({ children }) => {
  // --- Read from localStorage safely ---
  const getLocalStorageBool = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    return value !== null ? value === "true" : defaultValue;
  };

  // --- States with persistence ---
  const [isRansomwareActive, setIsRansomwareActive] = useState(() =>
    getLocalStorageBool("ransomwareActive", false)
  );
  const [isSessionActive, setIsSessionActive] = useState(() =>
    getLocalStorageBool("sessionActive", true)
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState({ heading: "", message: "", open: false });

  // --- Keep localStorage in sync when states change ---
  useEffect(() => {
    localStorage.setItem("ransomwareActive", isRansomwareActive);
  }, [isRansomwareActive]);

  useEffect(() => {
    localStorage.setItem("sessionActive", isSessionActive);
  }, [isSessionActive]);

  // --- Functions to change states globally ---
  const changeMalwareState = (state) => {
    setIsRansomwareActive(state);
  };

  const changeSessionState = (active) => {
    setIsSessionActive(active);
  };

  return (
    <AppContext.Provider
      value={{
        isRansomwareActive,
        setIsRansomwareActive,
        isLoggedIn,
        setIsLoggedIn,
        isSessionActive,
        setIsSessionActive,
        popup,
        setPopup,
        changeMalwareState,
        changeSessionState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
