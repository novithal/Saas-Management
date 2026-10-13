import React, { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2800);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      <CheckCircle size={19} />
      <span>{message}</span>

      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}