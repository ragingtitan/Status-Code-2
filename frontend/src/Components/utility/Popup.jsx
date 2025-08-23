import { useEffect } from "react";

const Popup = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm ">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative appear">
        <button
          className="absolute top-0 right-2 duration-150 text-gray-400 hover:text-red-500 text-2xl font-bold disppear"
          onClick={onClose}
        >
          ×
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
