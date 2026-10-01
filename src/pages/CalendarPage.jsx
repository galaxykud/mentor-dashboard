import PageHeader from "../components/PageHeader";
import React, { useState } from "react";
import { asset } from "../lib/assets";
import { initialEvents } from "../data/calendarEvents";
import TaskDrawer from "../components/TaskDrawer";
import useCalendarEvents from "../hooks/useCalendarEvents";
export default function CalendarPage({ open }) {
  const [events, setEvents] = useCalendarEvents(initialEvents);
  const [creating, setCreating] = useState(false),
    [mode, setMode] = useState("Неделя"),
    [offset, setOffset] = useState(0);
  const [newTaskDate, setNewTaskDate] = useState("2026-09-17");
  const start = new Date(2026, 8, 7 + offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
  const add = ({ type, topic, date, time, comment }) => {
    const d = new Date(date + "T12:00:00");
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    const newOffset = Math.round(
      (weekStart - new Date(2026, 8, 7)) / 604800000,
    );
    const next = [
      ...events,
      {
        id: Date.now(),
        day: (d.getDay() + 6) % 7,
        week: newOffset,
        hour: Number(time.slice(0, 2)) + Number(time.slice(3)) / 60,
        duration: 1,
        type,
        topic,
        comment,
        image: type === "Лекция" ? "105c4.png" : "",
      },
    ];
    setEvents(next);
    setOffset(newOffset);
    setMode("Неделя");
    setCreating(false);
  };
  const visibleDays = mode === "День" ? [days[4]] : days;
  return (
    <>
      <PageHeader
        title="Календарь"
        onSettings={() => open("Настройки", "Настройки календаря")}
        onNotifications={() => open("Уведомления", "Новых уведомлений нет")}
      />
      <section className="calendar-shell">
        <div className="calendar-toolbar">
          <div className="calendar-month">
            <button
              aria-label="Предыдущая неделя"
              onClick={() => setOffset(offset - 1)}
            >
              <img src={asset("bf0cc.svg")} alt="" />
            </button>
            <strong>
              {new Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              })
                .format(start)
                .replace(" г.", "")}
            </strong>
            <button
              aria-label="Следующая неделя"
              onClick={() => setOffset(offset + 1)}
            >
              <img src={asset("bf0cc.svg")} alt="" />
            </button>
          </div>
          <div className="calendar-modes">
            {["День", "Неделя", "Месяц"].map((m) => (
              <button
                key={m}
                className={mode === m ? "selected" : ""}
                onClick={() => setMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <button className="calendar-add" onClick={() => setCreating(true)}>
            <span>+</span>Добавить задачу
          </button>
        </div>
        <div className="calendar-board">
          {mode === "Месяц" ? (
            <div className="calendar-month-grid">
              {Array.from({ length: 30 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setNewTaskDate(`2026-09-${String(i + 1).padStart(2, "0")}`);
                    setCreating(true);
                  }}
                >
                  <strong>{i + 1}</strong>
                  {events
                    .filter(
                      (e) =>
                        Math.round((e.week || 0) * 7 + e.day + 7) === i + 1,
                    )
                    .map((e) => (
                      <span key={e.id} className={"month-event " + e.type}>
                        {e.type} · {e.topic}
                      </span>
                    ))}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div
                className="calendar-days"
                style={{
                  gridTemplateColumns: `64px repeat(${visibleDays.length},minmax(0,1fr))`,
                }}
              >
                <span />
                {visibleDays.map((d) => (
                  <div
                    key={d.toISOString()}
                    className={d.getDate() === 12 ? "today" : ""}
                  >
                    <strong>{String(d.getDate()).padStart(2, "0")}</strong>
                    <span>
                      {["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][d.getDay()]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="calendar-timeline">
                <div className="calendar-hours">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i}>{String(i + 9).padStart(2, "0")}:00</span>
                  ))}
                </div>
                <div
                  className="calendar-columns"
                  style={{
                    gridTemplateColumns: `repeat(${visibleDays.length},minmax(0,1fr))`,
                  }}
                >
                  {visibleDays.map((d) => {
                    const day = (d.getDay() + 6) % 7;
                    return (
                      <div className="calendar-column" key={day}>
                        {events
                          .filter(
                            (e) => e.day === day && (e.week || 0) === offset,
                          )
                          .map((e) => (
                            <button
                              key={e.id}
                              className={
                                "calendar-event " +
                                (e.type === "Лекция"
                                  ? "lecture"
                                  : e.type === "Встреча"
                                    ? "meeting"
                                    : "call")
                              }
                              style={{
                                top: (e.hour - 9) * 84 + 4,
                                height: e.duration * 84 - 8,
                              }}
                              onClick={() =>
                                open(
                                  e.type + (e.topic ? " · " + e.topic : ""),
                                  e.comment,
                                )
                              }
                            >
                              <strong>{e.type}</strong>
                              <p>{e.comment}</p>
                              {e.topic && (
                                <span className="calendar-person">
                                  {e.image && (
                                    <img src={asset(e.image)} alt="" />
                                  )}
                                  {e.topic}
                                </span>
                              )}
                            </button>
                          ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {creating && (
        <TaskDrawer
          initialDate={newTaskDate}
          onCreate={add}
          onClose={() => setCreating(false)}
        />
      )}
    </>
  );
}
