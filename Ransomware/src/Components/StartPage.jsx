import React from "react";

export default function StartPage() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-pink-600 flex flex-col justify-center items-center text-white relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full -top-20 -left-20 animate-ping-slow"></div>
        <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full top-40 left-10 animate-ping-slow delay-200"></div>
        <div className="absolute w-72 h-72 bg-white opacity-10 rounded-full bottom-10 right-10 animate-ping-slow delay-400"></div>
      </div>

      {/* Main content */}
      <h1 className="text-6xl font-extrabold mb-6 text-center drop-shadow-lg">
        Status Code 2
      </h1>
      <p className="text-xl md:text-2xl mb-12 text-center drop-shadow-md">
        Gamified Cybersecurity Learning Platform
      </p>

      {/* Call to action buttons */}
      <div className="flex gap-6">
        <a
          href="#desktop"
          className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Launch Simulation
        </a>
        <a
          href="#about"
          className="px-8 py-3 border-2 border-white font-semibold rounded-full hover:bg-white hover:text-purple-700 transition-colors duration-300"
        >
          Learn More
        </a>
      </div>

      {/* Footer text */}
      <p className="absolute bottom-6 text-sm opacity-60">
        Hackathon Demo • Status Code 2 • 2025
      </p>
    </div>
  );
}
