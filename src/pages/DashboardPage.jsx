import PageHeader from "../components/PageHeader";
import React from "react";
import { asset } from "../lib/assets";
import Icon from "../components/Icon";
import Portrait from "../components/Portrait";
import { students } from "../data/students";
export default function DashboardPage({ open, goPage }) {
  return (
    <>
      <PageHeader
        title="Главная"
        onSettings={() =>
          open("Настройки", "Уведомления о сообщениях и встречах включены.")
        }
        onNotifications={() =>
          open(
            "Уведомления",
            "6 студентов требуют внимания. Есть новые сообщения от Игоря, Ирины, Дмитрия и Никиты.",
          )
        }
      />
      <section className="day-cards" aria-label="План на сегодня">
        <article className="card plan">
          <div className="plan-image">
            <img src={asset("94770.png")} alt="" fetchPriority="high" loading="eager" />
          </div>
          <div className="plan-heading">
            <h2>Пятница, 8 сентября</h2>
            <p>Ваш план на сегодня</p>
          </div>
          <div className="plan-bottom">
            <div className="task-top">
              <div>
                <strong>8</strong>
                <span>задач</span>
              </div>
              <button onClick={() => goPage("calendar")}>
                Открыть все
                <span className="open-tasks-arrow" aria-hidden="true" />
              </button>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-valuenow={3}
              aria-valuemin={0}
              aria-valuemax={8}
            >
              <span />
            </div>
            <p>3 из 8 выполнено</p>
          </div>
        </article>
        {[
          [
            "Встреча",
            "2 часа",
            "10:00",
            "Созвон с Марией",
            "Обсудить прогресс и пропуски",
            "81a69.png",
          ],
          [
            "Лекция",
            "1 час",
            "13:00",
            "AI-дизайн",
            "Отметить присутствие студентов",
            "105c4.png",
          ],
        ].map((event, i) => (
          <article className="card event" key={event[0]}>
            <div className="event-top">
              <div>
                <h2>{event[0]}</h2>
                <p className="duration">
                  <Icon name="clock" />
                  {event[1]}
                </p>
              </div>
              <span className="offline">Офлайн</span>
            </div>
            <strong className="event-time">{event[2]}</strong>
            <button
              className="event-person"
              onClick={() =>
                open(
                  event[3],
                  `${event[2]} · ${event[1]} · Офлайн\n${event[4]}`,
                )
              }
            >
              <Portrait
                file={event[5]}
                size={41}
                w={i ? 48 : 85.012}
                h={i ? 48 : 151.052}
                x={i ? -3 : -19.363}
                y={i ? -4 : -42.136}
                mask="85e2f.svg"
              />
              <span>
                <h3>{event[3]}</h3>
                <p>{event[4]}</p>
              </span>
            </button>
          </article>
        ))}
      </section>
      <section id="students" className="students">
        <div className="students-top">
          <div>
            <h2>Требуют внимания</h2>
            <p>6 человек</p>
          </div>
          <button onClick={() => goPage("students")}>
            Все студенты
            <span className="all-students-arrow" aria-hidden="true" />
          </button>
        </div>
        <img className="table-line" src={asset("c2786.svg")} alt="" />
        <div className="table-head table-grid">
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
        <div className="student-list">
          {students.map((s) => (
            <div className="student table-grid" key={s.name}>
              <button
                className="student-name"
                onClick={() =>
                  open(
                    s.name,
                    `${s.group} · ${s.direction}\nСеместр: ${s.semester}\nСтатус: ${s.status}`,
                  )
                }
              >
                <Portrait
                  file={s.portrait}
                  w={s.portraitWidth}
                  h={s.portraitHeight}
                  x={s.portraitX}
                  y={s.portraitY}
                  mask="76388.svg"
                />
                <span>{s.name}</span>
              </button>
              <span className="group">{s.group}</span>
              <span className="semester">{s.semester}</span>
              <span className="course">{s.direction}</span>
              <span>
                <span className={"status " + s.statusClass}>{s.status}</span>
              </span>
              <span className="updated">{s.updated}</span>
              <button
                className="messages"
                aria-label={`Сообщения: ${s.name}`}
                onClick={() =>
                  open(
                    `Сообщения · ${s.name}`,
                    s.messages
                      ? `Новых сообщений: ${s.messages}`
                      : "Новых сообщений нет",
                  )
                }
              >
                <Icon name="message" />
                {s.messages > 0 && <span>{s.messages}</span>}
              </button>
              <button
                className="details"
                aria-label={`Открыть: ${s.name}`}
                onClick={() =>
                  open(s.name, `${s.direction} · ${s.group}\n${s.status}`)
                }
              >
                <Icon name="next" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
