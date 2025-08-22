import React from 'react'
import { files } from '../assets/files';
const Sidebar = () => {
  return (
    <div className='h-screen w-24 fixed'>
        <div className='h-1/2 absolute top-1/4 rounded-r-lg w-24 resize bg-[#05161a]'>
            {console.log(files)}
            {files.map((file, index) => (
                <div key={index} className='flex items-center gap-2 p-2 text-white hover:bg-[#0a1f26] rounded-lg'>
                    <file.icon className='text-xl' />
                    <span className='text-xs'>{file.name}</span>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Sidebar