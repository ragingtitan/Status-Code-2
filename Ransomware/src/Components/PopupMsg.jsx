import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function PopupMsg({heading, message}) {
  return (
    <div className="fixed top-1/4 left-1/4 z-10000">
      <Popup trigger={<button> Open Popup </button>} modal nested>
        {(close) => (
          <div className="modal">
            <h2>{heading}</h2>
            <p>{message}</p>
            <button onClick={close}>Close</button>
          </div>
        )}
      </Popup>
    </div>
  );
}
