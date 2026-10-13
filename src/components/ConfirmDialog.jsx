import React from "react";
import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  title = "Delete item?",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm,
}) {
  return (
    <Modal open={open} title={title} onClose={onCancel} width={430}>
      <div className="confirm-content">
        <div className="danger-circle">!</div>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="btn secondary" onClick={onCancel}>
            Cancel
          </button>

          <button className="btn danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}