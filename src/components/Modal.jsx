import React from "react";

export default function Modal({ title, children, onCancel, onSave }) {
  return (
    <div className="modal-bg">

      <div className="modal-box">

        {/* Modal Title */}
        <div className="modal-title">{title}</div>

        {/* Inputs / Fields */}
        {children}

        {/* Buttons */}
        <div className="modal-btns">
          <button className="modal-btn modal-cancel" onClick={onCancel}>
            रद्द
          </button>

          <button className="modal-btn modal-save" onClick={onSave}>
            सेव करें
          </button>
        </div>

      </div>

    </div>
  );
}
