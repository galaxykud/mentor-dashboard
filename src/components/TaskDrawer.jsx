import React, { useState } from "react";
import { asset } from "../lib/assets";
export default function TaskDrawer({ initialDate, onCreate, onClose }) {
  const [type, setType] = useState("Лекция"),
    [topic, setTopic] = useState("Прототипирование"),
    [date, setDate] = useState(initialDate),
    [time, setTime] = useState("13:00"),
    [comment, setComment] = useState("Отметить присутствие учеников");

  const submit = (event) => {
    event.preventDefault();
    onCreate({ type, topic, date, time, comment });
  };
  return (
    <div
      className="student-drawer-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className="student-drawer task-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Новая задача"
      >
        <button
          className="drawer-close"
          aria-label="Закрыть"
          onClick={() => onClose()}
        >
          <img src={asset("3b784.svg")} alt="" />
        </button>
        <h2>Новая задача</h2>
        <form id="task-form" onSubmit={submit}>
          <label>
            Тип задачи
            <div className="task-select">
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {["Лекция", "Встреча", "Созвон"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <img src={asset("0cb45.svg")} alt="" />
            </div>
          </label>
          <label>
            Тема
            <div className="task-select">
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                {[
                  "Прототипирование",
                  "AI-дизайн",
                  "Работа с сеткой",
                  "Обучение",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <img src={asset("0cb45.svg")} alt="" />
            </div>
          </label>
          <label>
            Дата и время
            <div className="task-datetime">
              <input
                aria-label="Дата"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                aria-label="Время"
                type="time"
                min="09:00"
                max="16:59"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </label>
          <label>
            Комментарий
            <div className="task-comment">
              <textarea
                value={comment}
                maxLength={500}
                onChange={(e) => setComment(e.target.value)}
              />
              <span>{comment.length}/500</span>
            </div>
          </label>
        </form>
        <button className="task-create" type="submit" form="task-form">
          Создать задачу
        </button>
      </aside>
    </div>
  );
}
