import { useState, useEffect } from "react";
const STORAGE_KEY = "mentor-calendar-events";
const isEvent = (event) =>
  event &&
  typeof event.id === "number" &&
  Number.isInteger(event.day) &&
  event.day >= 0 &&
  event.day <= 6 &&
  Number.isFinite(event.hour) &&
  Number.isFinite(event.duration) &&
  event.duration > 0 &&
  ["Лекция", "Встреча", "Созвон"].includes(event.type) &&
  typeof event.comment === "string" &&
  typeof event.topic === "string";
export default function useCalendarEvents(initialEvents) {
  const [events, setEvents] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) && saved.every(isEvent)
        ? saved
        : initialEvents;
    } catch {
      return initialEvents;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      /* The calendar remains usable when browser storage is unavailable. */
    }
  }, [events]);
  return [events, setEvents];
}
