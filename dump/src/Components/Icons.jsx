import { files } from "../assets/files";
import FolderStart from "./FolderStart";
import { useState } from "react";
const Icons = () => {
  const [openFolders, setOpenFolders] = useState([]);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white select-none">
      <div className="h-1/2 w-2/3 grid grid-cols-3 place-items-center gap-5 rounded-lg">
        {files.map((file, idx) => (
          <div
            key={idx}
            onDoubleClick={() =>
              file.type === "folder" && setOpenFolders([...openFolders, file])
            }
            className="desktop-icon"
          >
            <file.icon size={40} />
            <p>{file.name}</p>
          </div>
        ))}

        {/* Render open folders */}
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
