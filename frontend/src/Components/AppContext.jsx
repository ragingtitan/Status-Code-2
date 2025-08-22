// import { createContext, useContext, useState } from "react";

// // Create context
// const AppContext = createContext();

// // Custom hook for easy usage
// export const useAppContext = () => useContext(AppContext);

// // Provider component
// export const DesktopProvider = ({ children }) => {
//   const [openFolders, setOpenFolders] = useState([]);
//   const [openFiles, setOpenFiles] = useState([]);
//   const [isRansomwareActive, setIsRansomwareActive] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSessionActive, setIsSessionActive] = useState(false);

//   // Folder functions
//   const openFolder = (folder) => {
//     if (!openFolders.includes(folder)) {
//       setOpenFolders([...openFolders, folder]);
//     }
//   };

//   const closeFolder = (folder) => {
//     setOpenFolders(openFolders.filter((f) => f !== folder));
//   };

//   // File functions
//   const openFile = (file) => {
//     if (!openFiles.includes(file)) {
//       setOpenFiles([...openFiles, file]);
//     }
//   };

//   const closeFile = (file) => {
//     setOpenFiles(openFiles.filter((f) => f !== file));
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         openFolders,
//         openFiles,
//         openFolder,
//         closeFolder,
//         openFile,
//         closeFile,
//         isRansomwareActive,
//         setIsRansomwareActive,
//         isLoggedIn,
//         setIsLoggedIn,
//         isSessionActive,
//         setIsSessionActive,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };


// AppContext.jsx
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const DesktopProvider = ({ children }) => {
  // state stuff...

  const [isRansomwareActive, setIsRansomwareActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [popup, setPopup] = useState({heading: "", message: "", open: false});

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
