import React, { useContext } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AppContext } from "./AppContext";

export default function PopupMsg() {
  const { popup, setPopup } = useContext(AppContext);

  return (
    <Popup
      open={popup.open} // controlled popup
      modal
      nested
      onClose={() => setPopup({ ...popup, open: false })} // close handler
    >
      {(close) => (
        <div className="modal bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold">{popup.heading}</h2>
          <p className="mt-2">{popup.message}</p>
          <button
            onClick={() => {
              setPopup({ ...popup, open: false });
              close();
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    </Popup>
  );
}
