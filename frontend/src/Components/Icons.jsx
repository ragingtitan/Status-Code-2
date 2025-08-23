import { files } from "../assets/files";
import FolderStart from "./FolderStart";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";

const Icons = () => {
  const [openFolders, setOpenFolders] = useState([]);
  const { changeMalwareState, isRansomwareActive } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAppOpen = (file) => {
    if (isRansomwareActive && file.type != "antivirus") {
      toast.error("Cannot open applications while ransomware is active!");
      return;
    }
    navigate(`/${file.link}`);
  };

  const handleFolderOpen = (file) => {
    setOpenFolders((prev) => [...prev, file]);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white select-none">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="h-1/2 text-center lg:w-1/2 w-full px-10 sm:px-20 lg:px-40 grid grid-cols-2 sm:grid-cols-3 gap-6 place-items-center rounded-lg">
          {files.map((file, idx) => (
            <div key={idx} className="flex flex-col lg:gap-20 items-center">
              {/* Folder */}
              {file.type === "folder" && (
                <div
                  onDoubleClick={() => handleFolderOpen(file)}
                  className="desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition"
                >
                  <file.icon size={40} />
                  <p className="text-sm">{file.name}</p>
                </div>
              )}

              {/* Application */}
              {file.type === "app" && (
                <div
                  onDoubleClick={() => handleAppOpen(file)}
                  className="desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition"
                >
                  <file.icon size={40} />
                  <p className="text-sm">{file.name}</p>
                </div>
              )}

              {file.type === "antivirus" && (
                <div
                  onDoubleClick={() => handleAppOpen(file)}
                  className="desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition"
                >
                  <file.icon size={40} />
                  <p className="text-sm">{file.name}</p>
                </div>
              )}

              {/* Malware */}
              {file.type === "malware" && (
                <button
                  onDoubleClick={() => changeMalwareState(true)}
                  className="desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition"
                >
                  <file.icon size={40} className="text-red-500" />
                  <p className="text-sm">{file.name}</p>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Open folders */}
        {openFolders.map((folder, idx) => (
          <FolderStart
            key={idx}
            folder={folder}
            onClose={() =>
              setOpenFolders((prev) => prev.filter((f) => f !== folder))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Icons;
