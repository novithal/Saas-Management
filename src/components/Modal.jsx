import React from "react";
import { X } from "lucide-react";

export default function Modal({ open, title, children, onClose, width = 520 }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        style={{ maxWidth: width }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>

          <button onClick={onClose} className="close-btn">
            <X size={19} />
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}