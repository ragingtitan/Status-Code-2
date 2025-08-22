import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./AppContext";
export default function StartPage() {
  const { setIsRansomwareActive,
setIsSessionActive } = useContext(AppContext);
const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-pink-600 flex flex-col justify-center items-center text-white relative overflow-hidden">
      {/* Static background pattern instead of animated circles */}
     

      {/* Main content */}
      <h1 className="text-6xl font-extrabold mb-6 text-center drop-shadow-lg">
        Ransomware Simulation
      </h1>
      <p className="text-xl md:text-2xl mb-12 text-center drop-shadow-md">
        Learn to protect your system in a simulated attack!
      </p>

      {/* Call to action buttons */}
      <div className="flex gap-6 p-4">
        <button onClick={() => {
          setIsSessionActive(true);
          navigate("/main");
        }}
          to="/main"
          className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Start Simulation
        </button>
        <Link
          to="/about"
          className="px-8 py-3 border-2 border-white font-semibold rounded-full hover:bg-white hover:text-purple-700 transition-colors duration-300"
        >
          About Ransomware
        </Link>
      </div>

      {/* Footer text */}
      <p className="absolute bottom-6 text-sm opacity-60">
        Hackathon Demo • Status Code 2 • 2025
      </p>
    </div>
  );
}
