import { Rnd } from "react-rnd";
import { FaWindowMinimize, FaWindowMaximize, FaWindowClose } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "./GoBack";

export default function LinuxFile({ file }) {
  const location = useLocation();
  const fileData = location.state;
  console.log(fileData);
  return (
    <Rnd
      default={{
        x: 200,
        y: 100,
        width: 600,
        height: 400,
      }}
      bounds="parent"
      dragHandleClassName="title-bar"
    >
      <div className="bg-gray-900 border border-gray-700 rounded-md shadow-lg flex flex-col h-full">
        {/* Title Bar */}
        <div className="title-bar bg-gray-800 px-3 py-1 flex justify-between items-center cursor-move select-none">
          <span className="text-white text-sm font-semibold truncate">
            {fileData.name || "untitled"} - gedit
          </span>
          <div className="flex gap-3 text-gray-300">
            <button className="hover:text-yellow-400">
              <FaWindowMinimize />
            </button>
            <button className="hover:text-green-400">
              <FaWindowMaximize />
            </button>
            <button
              className="hover:text-red-500"
            >
              <GoBack />
            </button>
          </div>
        </div>

        {/* File Content Area */}
        <div className="flex-1 bg-gray-950 p-4 text-gray-300 font-mono text-sm overflow-auto whitespace-pre-wrap">
          {fileData.content ? (
            fileData.content
          ) : (
            <span className="text-gray-500 italic"># Empty file</span>
          )}
        </div>
      </div>
    </Rnd>
  );
}
