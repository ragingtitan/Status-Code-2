import { useState } from "react";

import { AppContext } from "./AppContext";
import { useContext } from "react";
export default function AntivirusUI() {
    const {   changeMalwareState,
        changeSessionState } = useContext(AppContext);
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleScan = () => {
    setScanning(true);
    setStatus("Scanning for threats...");

    setTimeout(() => {
      setStatus("Threat detected: Ransomware");
    }, 2000);

    setTimeout(() => {
      setStatus("Removing ransomware...");
    }, 4000);
    
    changeMalwareState(false);
    setTimeout(() => {
      setStatus("✅ Ransomware removed successfully!");
      setScanning(false);
    }, 6000);
  };

  const handleReset = () => {
    setStatus("idle");
    setScanning(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-[400px] text-center">
        <div className="flex flex-col items-center">
          {/* Shield-like UI */}
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-4 text-black font-bold text-2xl">
            AV
          </div>
          <h1 className="text-2xl font-bold mb-2">SecureShield Antivirus</h1>
          <p className="text-gray-400 mb-6">
            Protecting your system in real-time
          </p>
        </div>

        {/* Status Area */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6 h-20 flex items-center justify-center text-lg">
          {status === "idle" ? (
            <span className="text-gray-400">No scan in progress</span>
          ) : (
            <span>{status}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          {!scanning && status === "idle" && (
            <button
              onClick={handleScan}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold"
            >
              Start Scan
            </button>
          )}

          {!scanning && status !== "idle" && (
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Reset
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        {scanning && (
          <div className="mt-6">
            <div className="w-full bg-gray-600 h-2 rounded">
              <div className="bg-yellow-400 h-2 rounded animate-pulse w-2/3"></div>
            </div>
            <p className="mt-2 text-sm text-gray-400">Scanning in progress...</p>
          </div>
        )}
      </div>
    </div>
  );
}
