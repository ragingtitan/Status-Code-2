import { Rnd } from "react-rnd";
import { FaWindowClose } from "react-icons/fa";
import { encrypt } from "./Encrypt";
import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Start({ folder, onClose }) {
  const { isRansomwareActive } = useContext(AppContext);
  return (
    <Rnd
      default={{
        x: 500,
        y: 200,
        width: 800,
        height: 600,
      }}
      bounds="parent"
    >
      <div className="bg-gray-800 border border-gray-600 rounded shadow-lg flex flex-col h-full">
        {/* Title bar */}
        <div className="bg-gray-700 px-3 py-1 flex justify-between items-center">
          <span className="text-white">{folder.name}</span>
          <button onClick={onClose} className="text-red-400">
            <FaWindowClose />
          </button>
        </div>

        {/* Folder content */}
        <div className={` p-4 flex-1 overflow-auto ${!isRansomwareActive ? 'grid grid-cols-3 gap-4' : 'hidden'}`}>
          {folder?.children.map((child, idx) => (
            <div key={idx} className="">
              {console.log(child)}
              <a
                href=""
                className="flex flex-col items-center text-white cursor-pointer"
              >
                <child.icon size={30} />
                <p className="text-xs mt-1">{child.name}</p>
                <iframe
                  src={child.path}
                  title={folder.name}
                  className="flex-1 w-full"
                />
              </a>
            </div>
          ))}
        </div>
        <div className={` p-4 flex-1 overflow-auto ${isRansomwareActive ? 'grid grid-cols-3 gap-4' : 'hidden'}`}>
          {folder?.children.map((child, idx) => (
            <div key={idx} className="">
              {console.log(child)}
              <a
                href=""
                className="flex flex-col items-center text-white cursor-pointer"
              >
                <child.icon size={30} />
                <p className="text-xs mt-1">{encrypt(child.name)}</p>
                <iframe
                  src={child.path}
                  title={folder.name}
                  className="flex-1 w-full"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Rnd>
  );
}
