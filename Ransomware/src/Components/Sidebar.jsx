import React from "react";
import { files } from "../assets/files";
import FolderStart from "./FolderStart";
const Sidebar = () => {
  return (

      <div className="h-1/2 absolute z-100 top-1/4 p-4 rounded-r-lg w-24 bg-gray-800 shadow-lg">
        <div className="w-full flex flex-col justify-start items-center gap-4">
          {files.map((file, index) => (
            <div
              onClick={() => {
                FolderStart(file);
              }}
              key={index}
              className={`text-gray-200 hover:bg-gray-700 rounded-lg transition-all ${
                file.name === "Browser" ||
                file.name === "Terminal" ||
                file.name === "Settings"
                  ? "flex items-center gap-2 p-2"
                  : "hidden"
              }`}
            >
              <div>
                <file.icon
                  className={`text-4xl ${
                    file.name === "Terminal"
                      ? "bg-gray-900 px-3 py-2 rounded-md"
                      : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Sidebar;