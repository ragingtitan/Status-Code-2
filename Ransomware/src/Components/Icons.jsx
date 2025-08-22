import { files } from "../assets/files";
import FolderStart from "./FolderStart";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const Icons = ({heading, message}) => {
  const [openFolders, setOpenFolders] = useState([]);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white select-none">
      
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="h-1/2 text-center lg:w-1/2 w-full px-40 grid grid-cols-3 place-items-center rounded-lg">
          {files.map((file, idx) => (
            <div
              key={idx}
              onDoubleClick={() =>
                file.type === "folder" && setOpenFolders([...openFolders, file])
              }
              className="desktop-icon flex flex-col items-center cursor-pointer gap-2 p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <file.icon size={40} />
              <p>{file.name}</p>
            </div>
          ))}

          {/* Render open folders */}
        </div>
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
