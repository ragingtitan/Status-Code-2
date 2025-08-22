import { files } from "../assets/files";
import FolderStart from "./FolderStart";
const Icons = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="h-1/2 w-2/3 grid grid-cols-3 place-items-center gap-5 rounded-lg">
   
        {files.map((file, index) => (
          <div
            onDoubleClick={() => {
              
            }}
            key={index}
            className="flex flex-col items-center p-2 gap-1 text-white hover:bg-white hover:bg-opacity-20 cursor-pointer rounded-lg"
          >
            <file.icon
              className={`text-5xl ${
                file.name === "Terminal" ? "bg-black p-2 rounded-md" : ""
              }`}
            />
            <span className="text-xs">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Icons;
