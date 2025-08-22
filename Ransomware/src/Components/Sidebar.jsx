import React from 'react'
import { files } from '../assets/files';
import FolderStart from './FolderStart';
const Sidebar = () => {
  return (
    <div className='h-screen w-24 fixed'>
        <div className='h-1/2 absolute top-1/4 p-4 rounded-r-lg w-24 resize bg-[#05161a]'>
            {console.log(files)}
            <div className='w-full flex flex-col justify-start items-center gap-4'>
              {files.map((file, index) => (
                <div onClick={()=>{
                  FolderStart(file);
                }} key={index} className={` text-white hover:bg-[#0a1f26] rounded-lg ${file.name === "Browser" || file.name === "Terminal" || file.name === "Settings"? "flex items-center gap-2 p-2":"hidden"}`}>
                     <div>
                    <file.icon className={`text-5xl ${file.name==="Terminal"?"bg-black px-3 py-2 rounded-md":""}`} />
                    </div>
                </div>
            ))}
            </div>
        </div>

    </div>
  )
}

export default Sidebar