import { useState, useContext } from "react";
import { Rnd } from "react-rnd";
import { AppContext } from "./AppContext";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const fakeCommands = {
  help: "Available commands: help, whoami, date, clear",
  whoami: "raging_titan",
  date: new Date().toString(),
  clear: "",
};

export default function Terminal({ terminal }) {
  // ✅ useContext properly
  const { closeFile } = useContext(AppContext);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Welcome to the simulated terminal. Type 'help'",
  ]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (trimmed in fakeCommands) {
      if (trimmed === "clear") {
        setOutput([]);
      } else {
        setOutput((prev) => [...prev, `$ ${trimmed}`, fakeCommands[trimmed]]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        `$ ${trimmed}`,
        `Command not found: ${trimmed}`,
      ]);
    }
    setInput("");
  };

  const navigate = useNavigate();

  return (
    <Rnd default={{ x: 300, y: 25, width: 800, height: 600 }} bounds="parent">
      <div className="flex flex-col bg-black text-white border border-gray-600 rounded shadow-lg h-full">
        {/* Title Bar */}
        <div className="flex justify-between items-center bg-gray-800 px-3 py-1">
          <span>{terminal?.name || "Terminal"}</span>
          <button
            className="text-red-400"
            onClick={() => {
              navigate('/');
            }}
          >
            <FiX/>
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-2 overflow-auto font-mono text-sm">
          {output.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          className="w-full p-2 bg-black border-t border-gray-600 text-white font-mono outline-none"
          placeholder="Type a command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommand(input);
          }}
        />
      </div>
    </Rnd>
  );
}
