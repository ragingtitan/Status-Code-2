import React from "react";
import { FaWifi, FaSpeakerDeck } from "react-icons/fa";
import { MdBatteryFull, MdPower } from "react-icons/md";
import { FiVolume2, FiPower } from "react-icons/fi";
const Navbar = () => {
  return (
    <div className="bg-gray-900 fixed h-8 z-10000 w-full flex justify-between text-gray-200 px-4 shadow-md">
      <div className="flex items-center">
        <button className="text-gray-200 hover:text-blue-400 font-mono">
          Activities
        </button>
      </div>
      <div className="flex items-center">
        <span className="date flex w-fit font-mono text-sm">
          19 Sep, 09:36
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <button className="hover:text-blue-400">
          <FaWifi />
        </button>
        <button className="hover:text-blue-400">
          <FiVolume2 />
        </button>
        <button className="hover:text-blue-400">
          <MdBatteryFull />
        </button>
        <button className="hover:text-blue-400">
          <FiPower />
        </button>
      </div>
    </div>
  );
};

export default Navbar;