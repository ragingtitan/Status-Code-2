import { Rnd } from "react-rnd";

export default function Start({ folder, onClose }) {
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      }}
      bounds="parent"
    >
      <div className="bg-gray-800 border border-gray-600 rounded shadow-lg flex flex-col h-full">
        {/* Title bar */}
        <div className="bg-gray-700 px-3 py-1 flex justify-between items-center">
          <span className="text-white">{folder.name}</span>
          <button onClick={onClose} className="text-red-400">X</button>
        </div>

        {/* Folder content */}
        <div className="grid grid-cols-3 gap-4 p-4 flex-1 overflow-auto">
          {folder.children?.map((child, idx) => (
            <div key={idx} className="flex flex-col items-center text-white cursor-pointer">
              <child.icon size={30} />
              <p className="text-xs mt-1">{child.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Rnd>
  );
}
