import PageHeader from "../components/PageHeader";
import React, { useState } from "react";
import { asset } from "../lib/assets";
import StudentRow from "../components/StudentRow";
import { allStudents } from "../data/students";
export default function StudentsPage({ open, onDetails, selectedStudent }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [course, setCourse] = useState("Граф. дизайн");
  const [semester, setSemester] = useState("");
  const [group, setGroup] = useState("");
  let shown = allStudents.filter(
    (s) =>
      (!query ||
        [s.name, s.group, s.semester, s.direction, s.status, s.updated]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (!course || s.direction === "Графический дизайн") &&
      (!semester || s.semester === semester) &&
      (!group || s.group === group) &&
      (tab === "all" ||
        (tab === "attention"
          ? ["Пропуски", "Не сдал ДЗ", "Нужна встреча"].includes(s.status)
          : s.status === "Заморозка")),
  );
  return (
    <>
      <PageHeader
        title="Ученики"
        onSettings={() => open("Настройки", "Настройки кабинета")}
        onNotifications={() =>
          open("Уведомления", "Есть новые сообщения от учеников.")
        }
      />
      <section className="students-page" aria-label="Список учеников">
        <div className="directory-toolbar">
          <div className="directory-title">
            <h2>Список</h2>
            <p>74 ученика</p>
          </div>
          <label className="directory-search">
            <img src={asset("94a12.svg")} alt="" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по студентам..."
              aria-label="Поиск по студентам"
            />
          </label>
          <div className="directory-filters">
            <button
              className={"course-filter " + (course ? "selected" : "")}
              onClick={() => setCourse(course ? "" : "Граф. дизайн")}
            >
              {course || "Направление"}
              <img src={asset(course ? "31e17.svg" : "0cb45.svg")} alt="" />
            </button>
            <label className="select-filter">
              <span className="sr-only">Семестр</span>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Семестр</option>
                <option value="2">2 семестр</option>
                <option value="3">3 семестр</option>
              </select>
              <img src={asset("0cb45.svg")} alt="" />
            </label>
            <label className="select-filter">
              <span className="sr-only">Группа</span>
              <select value={group} onChange={(e) => setGroup(e.target.value)}>
                <option value="">Группа</option>
                {[...new Set(allStudents.map((s) => s.group))].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <img src={asset("0cb45.svg")} alt="" />
            </label>
          </div>
        </div>
        <img className="directory-line" src={asset("c2786.svg")} alt="" />
        <div className="directory-tabs">
          <button
            className={tab === "all" ? "selected" : ""}
            onClick={() => setTab("all")}
          >
            Все 74
          </button>
          <button
            className={tab === "attention" ? "selected" : ""}
            onClick={() => setTab("attention")}
          >
            Требуют внимания
          </button>
          <button
            className={tab === "frozen" ? "selected" : ""}
            onClick={() => setTab("frozen")}
          >
            Заморозка
          </button>
        </div>
        <div className="table-head table-grid directory-head">
          {[
            "Ученик",
            "Группа",
            "Семестр",
            "Направление",
            "Статус",
            "Обновлено",
            "Сообщения",
            "",
          ].map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
        <div className="directory-list">
          {shown.map((s) => (
            <StudentRow
              key={s.name}
              student={s}
              open={open}
              onDetails={onDetails}
              selected={selectedStudent?.name === s.name}
            />
          ))}
          {shown.length === 0 && (
            <p className="empty-results">Ученики не найдены</p>
          )}
        </div>
      </section>
    </>
  );
}
