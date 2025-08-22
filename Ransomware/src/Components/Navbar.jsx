import React from 'react'
import {FaWifi, FaSpeakerDeck} from 'react-icons/fa'
import {MdBatteryFull} from 'react-icons/md'
import {FiVolume2} from 'react-icons/fi'
const Navbar = () => {
  return (
    <div className='bg-black fixed h-6 w-full flex justify-between text-white px-2'>
        <div className='flex'>
            <button className='text-white'>Activities</button>
        </div>
        <div>
            <span className='date flex w-fit'>19 Sep, 09:36</span>
        </div>
        <div className='flex gap-2'>
            <button><FaWifi/></button>
            <button><FiVolume2 fill='white'/></button>
            <button><MdBatteryFull/></button>
        </div>
    </div>
  )
}

export default Navbar