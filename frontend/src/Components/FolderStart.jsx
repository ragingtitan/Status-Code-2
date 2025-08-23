import { Rnd } from "react-rnd";
import { FaWindowClose } from "react-icons/fa";
import { encrypt } from "./Encrypt";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";

import { MdLock } from "react-icons/md";

export default function Start({ folder, onClose }) {
  const { isRansomwareActive } = useContext(AppContext);
  const { popup, setPopup } = useContext(AppContext);
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
        <div
          className={` p-4 flex-1 overflow-auto ${
            !isRansomwareActive ? "grid grid-cols-3 gap-4" : "hidden"
          }`}
        >
          {folder?.children.map((child, idx) => (
            <div key={idx} className="">
              {console.log(child)}
              <Link
                to="/file"
                state={{
          name: child.name,
          type: child.type,
          icon: child.iconName, // store icon as string, e.g. "FaFolder"
          content:child.content
        }}
                className="flex flex-col items-center text-white cursor-pointer"
              >
                <child.icon size={30} />
                <p className="text-xs mt-1">{child.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div
          className={` p-4 flex-1 overflow-auto ${
            isRansomwareActive ? "grid grid-cols-3 gap-4" : "hidden"
          }`}
        >
          {folder?.children.map((child, idx) => (
            <div key={idx} className="">
              {console.log(child)}
              <button
                onClick={() =>
                  setPopup({
                    open: true,
                    heading: "File Encrypted",
                    message: (
                      <div>
                        <p className="text-red-600 font-extrabold text-center text-lg animate-pulse">
                          ☠️ Y͟O͟U͟R͟ F͟I͟L͟E͟ <b>{encrypt(child.name)}</b> I͟S͟ D͟O͟O͟M͟E͟D͟ ⚠️ ☠️
                          <br />
                          <span className="text-white">
                            The file <b>{encrypt(child.name)}</b> has been{" "}
                            <span className="underline">corrupted</span> beyond
                            recovery.
                          </span>
                          <br />
                          <span className="text-red-500">
                            Every second you waste… more files fall into the
                            abyss.
                          </span>
                          <br />
                          <span className="text-yellow-400">
                            Surrender to the darkness and pay $3000 or watch everything
                            perish.
                          </span>
                        </p>

                        <div className="flex gap-2 mt-3">
                          <Link to="/pay"
                            onClick={() => {
                              console.log("User acknowledged.");
                              setPopup((prev) => ({ ...prev, open: false }));
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                          >
                            Pay Ransome Now
                          </Link>
                        </div>
                      </div>
                    ),
                    onClose: () => {
                      console.log("Popup closed manually");
                    },
                  })
                }
                className="flex flex-col items-center text-white cursor-pointer"
              >
               <div className="px-4 py-2 bg-gray-700 rounded">

  <MdLock size={30} className="text-yellow-500" />
 </div>
                <p className="text-xs mt-1">{encrypt(child.name)}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Rnd>
  );
}
