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
  FaUnlock
} from "react-icons/fa";
export const files = [
  {
    name: "Documents",
    type: "folder",
    icon: FaFolder,
    children: [
      {
        name: "Resume.pdf",
        type: "file",
        icon: FaFileAlt,
        content: `John Doe
123 Main Street
Kolkata, India

Education:
- B.Tech in Electronics & Communication, Heritage Institute of Technology

Skills:
- Data Structures & Algorithms
- Machine Learning, VLSI, Embedded Systems
- C++, Python, Verilog, SQL

Experience:
- Internship at ABC Corp (Summer 2024)

References available on request.`,
      },
      {
        name: "Notes.txt",
        type: "file",
        icon: FaFileAlt,
        content: `TODO:
- Revise DBMS normalization before exam
- Complete Striver's A2Z DSA sheet
- Work on VLSI project
- Finish ML project on crop pest detection
- Gym: push day workout`,
      },
    ],
  },
  {
    name: "Pictures",
    type: "folder",
    icon: FaFolder,
    children: [
      {
        name: "photo1.png",
        type: "image",
        icon: FaImage,
        path: "/src/assets/",
        content: "Binary image data (not displayed here).",
      },
      {
        name: "wallpaper.jpg",
        type: "image",
        icon: FaImage,
        path: "/src/assets/",
        content: "HD wallpaper image (not displayed here).",
      },
    ],
  },
  {
    name: "Music",
    type: "folder",
    icon: FaFolder,
    children: [
      {
        name: "song1.mp3",
        type: "music",
        icon: FaMusic,
        path: "/src/assets/",
        content: "Audio file data (mp3 stream).",
      },
    ],
  },

  // --- Apps (Linux-like desktop apps) ---
  { name: "Terminal", type: "app", icon: FaTerminal, link:'terminal' },
  // { name: "Browser", type: "app", icon: FaGlobe },
  { name: "Settings", type: "app", icon: FaCog,link:'settings' },
  // { name: "Code Editor", type: "app", icon: FaCode },
  {
    name: "Trash",
    type: "folder",
    icon: FaTrash,
    children: [
      {
        name: "deleted_notes.txt",
        type: "file",
        icon: FaFileAlt,
        content: `This file was deleted on 21 Aug 2025.

Old content:
"Reminder: Backup project files before formatting PC."`,
      },
      {
        name: "deleted_image.jpg",
        type: "image",
        icon: FaImage,
        path: "/src/assets/",
        content: "Deleted image file (not displayed).",
      },
    ],
  },
  {
    name: "Ransomware.exe",
    type: "malware",
    icon: FaSkull,
    content: `⚠️ WARNING ⚠️
This program encrypts your files when executed.
Do not run unless you want your data locked.`,
  },
  {
    name: "Antivirus.exe",
    type: "antivirus",
    icon: FaUnlock,
    link: 'antivirus',
    content: `⚠️ WARNING ⚠️,
This program encrypts your files when executed.
Do not run unless you want your data locked.`,
  }
];
