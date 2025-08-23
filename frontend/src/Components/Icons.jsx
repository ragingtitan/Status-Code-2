import { files } from "../assets/files";
import FolderStart from "./FolderStart";
import { useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";

const Icons = ({ heading, message }) => {
  const [openFolders, setOpenFolders] = useState([]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white select-none">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="h-1/2 text-center lg:w-1/2 w-full px-10 sm:px-20 lg:px-40 grid grid-cols-2 sm:grid-cols-3 gap-6 place-items-center rounded-lg">
          {files.map((file, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Folder / Default File */}
              <div
                onDoubleClick={() =>
                  file.type === "folder" &&
                  setOpenFolders([...openFolders, file])
                }
                className={`desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition ${
                  file.type === "app" || file.type === "malware" ? "hidden" : ""
                }`}
              >
                <file.icon size={40} />
                <p className="text-sm">{file.name}</p>
              </div>

              {/* Application */}
              <Link
                to={`/${file.link}`}
                onDoubleClick={() =>
                  file.type === "folder" &&
                  setOpenFolders([...openFolders, file])
                }
                className={`desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition ${
                  file.type === "app" ? "" : "hidden"
                }`}
              >
                <file.icon size={40} />
                <p className="text-sm">{file.name}</p>
              </Link>

              {/* Malware */}
              <Link
                to={`/${file.link}`}
                onDoubleClick={() =>
                  file.type === "malware" &&
                  setOpenFolders([...openFolders, file])
                }
                className={`desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition ${
                  file.type === "malware" ? "" : "hidden"
                }`}
              >
                <file.icon size={40} className="text-red-500" />
                <p className="text-sm">{file.name}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Open folders */}
        {openFolders.map((folder, idx) => (
          <FolderStart
            key={idx}
            folder={folder}
            onClose={() =>
              setOpenFolders(openFolders.filter((f) => f !== folder))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Icons;
