import { useState } from "react";

export default function FileViewer({ file, onClose }) {
  return (
    <div className="absolute top-24 left-24 w-96 h-96 bg-gray-800 border border-gray-600 rounded-md shadow-lg flex flex-col">
      <div className="flex justify-between items-center bg-gray-700 px-3 py-1">
        <span className="text-white">{file.name}</span>
        <button onClick={onClose} className="text-red-400">X</button>
      </div>

      <iframe
        src={file.path}
        title={file.name}
        className="flex-1 w-full"
      />
    </div>
  );
}
