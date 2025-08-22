// files.js
import { FaFolder, FaFileAlt, FaImage, FaMusic, FaVideo, FaTerminal, FaGlobe, FaLock } from "react-icons/fa";

export const files = [
  {
    name: "Documents",
    type: "folder",
    icon: FaFolder,
    children: [
      { name: "Resume.pdf", type: "file", icon: FaFileAlt },
      { name: "Notes.txt", type: "file", icon: FaFileAlt }
    ]
  },
  {
    name: "Pictures",
    type: "folder",
    icon: FaFolder,
    children: [
      { name: "photo1.png", type: "image", icon: FaImage },
      { name: "wallpaper.jpg", type: "image", icon: FaImage }
    ]
  },
  {
    name: "Music",
    type: "folder",
    icon: FaFolder,
    children: [
      { name: "song1.mp3", type: "music", icon: FaMusic }
    ]
  },
  {
    name: "Videos",
    type: "folder",
    icon: FaFolder,
    children: [
      { name: "video.mp4", type: "video", icon: FaVideo }
    ]
  },
  { name: "Terminal", type: "app", icon: FaTerminal },
  { name: "Browser", type: "app", icon: FaGlobe },
  { name: "Locked_File.key", type: "file", icon: FaLock }
];
