import React, { useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AppContext } from "./AppContext";

export default function PopupMsg() {
  const {
    popup,
    setPopup,
    isRansomwareActive,
    setIsRansomwareActive,
    isSessionActive,
    setIsSessionActive,
  } = useContext(AppContext);

  const handleClose = () => {
    if (popup.onClose) popup.onClose(); // call custom logic if provided
    setPopup({ ...popup, open: false }); // close state
  };

  return (
    <Popup open={popup.open} modal nested onClose={handleClose}>
      {(close) => (
        <div className="modal bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold">{popup.heading}</h2>
          <div className="mt-2">{popup.message}</div>
          <button
            onClick={() => {
              handleClose();
              close();
            }}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </Popup>
  );
}
