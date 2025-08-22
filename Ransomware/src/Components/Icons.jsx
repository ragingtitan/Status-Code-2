import React from "react";
import { files } from "../assets/files";

const Icons = () => {
  return (
    <div className="h-">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 text-white hover:bg-[#0a1f26] rounded-lg"
        >
          <file.icon className="text-xl" />
          <span className="text-xs">{file.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Icons;
