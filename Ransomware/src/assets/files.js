import {
  FaFolder,
  FaFileAlt,
  FaImage,
  FaMusic,
  FaVideo,
  FaTerminal,
  FaGlobe,
  FaLock,
  FaCog,
  FaCode,
  FaEnvelope,
  FaTrash,
  FaSkull,
} from "react-icons/fa";

export const files = [
  {
    name: "Documents",
    type: "folder",
    icon: FaFolder,
    children: [
      { name: "Resume.pdf", type: "file", icon: FaFileAlt, locked:false, lockedName:"" },
      { name: "Notes.txt", type: "file", icon: FaFileAlt },
    ],
  },
  {
    name: "Pictures",
    type: "folder",
    icon: FaFolder,
    children: [
      { name: "photo1.png", type: "image", icon: FaImage },
      { name: "wallpaper.jpg", type: "image", icon: FaImage },
    ],
  },
  {
    name: "Music",
    type: "folder",
    icon: FaFolder,
    children: [{ name: "song1.mp3", type: "music", icon: FaMusic }],
  },


  // --- Apps (Linux-like desktop apps) ---
  { name: "Terminal", type: "app", icon: FaTerminal },
  // { name: "Browser", type: "app", icon: FaGlobe },
  { name: "Settings", type: "app", icon: FaCog },
  { name: "Code Editor", type: "app", icon: FaCode },
  { name: "Trash", type: "app", icon: FaTrash },
  { name: "Ransomware.exe", type: "malware", icon: FaSkull },
  
  // Example of "encrypted/locked" file
  //   { name: "Locked_File.key", type: "file", icon: FaLock }
];
