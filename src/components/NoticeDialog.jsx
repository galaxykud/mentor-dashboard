import React from "react";
export default function NoticeDialog({ dialog, onClose }) {
  return (
    <div className="modal-backdrop" onClick={() => onClose()}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close"
          aria-label="Закрыть"
          onClick={() => onClose()}
        >
          ×
        </button>
        <h2 id="dialog-title">{dialog.title}</h2>
        <p>{dialog.body}</p>
        <button className="primary" onClick={() => onClose()}>
          Понятно
        </button>
      </section>
    </div>
  );
}
