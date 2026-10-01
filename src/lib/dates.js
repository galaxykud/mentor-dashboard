export const russianDate = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(new Date(year, month - 1, day));
};
export const freezePeriod = (start, end) => {
  if (!start || !end) return "Выберите период";
  const a = russianDate(start),
    b = russianDate(end);
  return `${a} — ${b}`;
};
