import { createContext, useContext, useState } from "react";

// Create context
const DesktopContext = createContext();

// Custom hook to use the context easily
export const useDesktop = () => useContext(DesktopContext);

// Provider component
export const DesktopProvider = ({ children }) => {
  const [openFolders, setOpenFolders] = useState([]);
  const [openFiles, setOpenFiles] = useState([]);

  // Open a folder
  const openFolder = (folder) => {
    if (!openFolders.includes(folder)) setOpenFolders([...openFolders, folder]);
  };

  // Close a folder
  const closeFolder = (folder) => {
    setOpenFolders(openFolders.filter((f) => f !== folder));
  };

  // Open a file
  const openFile = (file) => {
    if (!openFiles.includes(file)) setOpenFiles([...openFiles, file]);
  };

  // Close a file
  const closeFile = (file) => {
    setOpenFiles(openFiles.filter((f) => f !== file));
  };

  return (
    <DesktopContext.Provider
      value={{
        openFolders,
        openFiles,
        openFolder,
        closeFolder,
        openFile,
        closeFile,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};

