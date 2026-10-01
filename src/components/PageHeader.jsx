import React from "react";
import Icon from "./Icon";
export default function PageHeader({ title, onSettings, onNotifications }) {
  return (
    <header>
      <h1>{title}</h1>
      <div className="header-actions">
        <button
          className="round-button"
          aria-label="Настройки"
          onClick={onSettings}
        >
          <Icon name="settings" />
        </button>
        <button
          className="round-button"
          aria-label="Уведомления"
          onClick={onNotifications}
        >
          <Icon name="bell" />
        </button>
      </div>
    </header>
  );
}
