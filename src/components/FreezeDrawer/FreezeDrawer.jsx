import React, { useState, useEffect, useRef } from "react";
import { trackGoal } from "../../lib/analytics";
import { asset } from "../../lib/assets";
import { freezePeriod } from "../../lib/dates";
import Portrait from "../Portrait";
export default function FreezeDrawer({ student, cardOpenedAt, onClose, onCancel }) {
  const startedAt = useRef(performance.now());
  const attempts = useRef(0);
  useEffect(() => {
    trackGoal("freeze_form_open");
  }, []);
  const [step, setStep] = useState("form");
  const [start, setStart] = useState("2026-09-08");
  const [end, setEnd] = useState("2026-09-14");
  const [reason, setReason] = useState("Высокая нагрузка на работе");
  const [comment, setComment] = useState("");
  const [datesOpen, setDatesOpen] = useState(false);
  const period = freezePeriod(start, end);
  const reminder = end
    ? (() => {
        const d = new Date(`${end}T12:00:00`);
        d.setDate(d.getDate() - 2);
        return new Intl.DateTimeFormat("ru-RU", {
          day: "numeric",
          month: "long",
        }).format(d);
      })()
    : "";
  const submit = (e) => {
    e.preventDefault();
    attempts.current += 1;
    if (start && end && end >= start && reason) {
      setDatesOpen(false);
      setStep("success");
      trackGoal("freeze_created", {
        elapsed_seconds: Math.round(
          (performance.now() - startedAt.current) / 1000,
        ),
        duration_sec: Math.round(
          (performance.now() - cardOpenedAt) / 1000,
        ),
        attempts: attempts.current,
      });
    }
  };
  return (
    <div
      className="student-drawer-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className="student-drawer freeze-panel"
        role="dialog"
        aria-modal="true"
        aria-label={
          step === "form" ? "Оформление заморозки" : "Заморозка оформлена"
        }
      >
        <button className="drawer-close" aria-label="Закрыть" onClick={onClose}>
          <img src={asset("3b784.svg")} alt="" />
        </button>
        {step === "form" ? (
          <>
            <div className="freeze-profile">
              <Portrait
                file={
                  student.name === "Илья Кузнецов"
                    ? "4ae93.png"
                    : student.portrait
                }
                size={68}
                w={74.538}
                h={74.538}
                x={-3.271}
                y={0}
                mask="a66d2.svg"
              />
              <div>
                <h2>{student.name}</h2>
                <p>{student.direction}</p>
                <p>{student.semester} семестр · группа АФ17-31Б</p>
              </div>
            </div>
            <img
              className="freeze-header-line"
              src={asset("69cd4.svg")}
              alt=""
            />
            <div className="freeze-intro">
              <h2>Оформление заморозки</h2>
              <p>
                Студент будет временно переведён в статус заморозки.
                <br />
                На этот период обучение будет приостановлено.
              </p>
            </div>
            <form id="freeze-form" className="freeze-form" onSubmit={submit}>
              <label
                className="freeze-label period-label"
                htmlFor="freeze-period"
              >
                Период
              </label>
              <button
                className="freeze-control period-control"
                type="button"
                id="freeze-period"
                aria-expanded={datesOpen}
                onClick={() => setDatesOpen(!datesOpen)}
              >
                <span>{period}</span>
                <img src={asset("c3bd9.svg")} alt="" />
              </button>
              {datesOpen && (
                <div className="freeze-date-popover">
                  <label>
                    С
                    <input
                      type="date"
                      value={start}
                      onChange={(e) => {
                        const next = e.target.value;
                        setStart(next);
                        if (end && next && end < next) setEnd(next);
                      }}
                    />
                  </label>
                  <label>
                    По
                    <input
                      type="date"
                      min={start}
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                    />
                  </label>
                  <button type="button" onClick={() => setDatesOpen(false)}>
                    Готово
                  </button>
                </div>
              )}
              <label
                className="freeze-label reason-label"
                htmlFor="freeze-reason"
              >
                Причина
              </label>
              <div className="freeze-control reason-control">
                <select
                  id="freeze-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option>Высокая нагрузка на работе</option>
                  <option>Личные обстоятельства</option>
                  <option>Проблемы со здоровьем</option>
                  <option>Другая причина</option>
                </select>
                <img src={asset("8b400.svg")} alt="" />
              </div>
              <label
                className="freeze-label comment-label"
                htmlFor="freeze-comment"
              >
                Комментарий
              </label>
              <div className="freeze-comment">
                <textarea
                  className="ym-disable-keys"
                  id="freeze-comment"
                  placeholder="Необязательно"
                  maxLength={500}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <span>{comment.length}/500</span>
              </div>
            </form>
            <div className="freeze-footer">
              <button
                type="submit"
                form="freeze-form"
                disabled={!start || !end || end < start || !reason}
              >
                Оформить заморозку
              </button>
              <button type="button" onClick={onCancel}>
                Отмена
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="freeze-success-main">
              <div className="freeze-success-heading">
                <img
                  className="freeze-success-icon"
                  src={asset("0bace.svg")}
                  alt=""
                />
                <h2>Заморозка оформлена</h2>
                <p>
                  Задача автоматически добавится на {reminder},<br />
                  чтобы напомнить о завершении заморозки
                </p>
              </div>
              <div className="freeze-summary">
                <div className="freeze-summary-row student">
                  <Portrait
                    file={
                      student.name === "Илья Кузнецов"
                        ? "4ae93.png"
                        : student.portrait
                    }
                    size={24}
                    w={26.308}
                    h={26.308}
                    x={-1.153}
                    y={0}
                    mask="71fe7.svg"
                  />
                  <span>
                    <small>{student.semester} семестр · группа АФ17-31Б</small>
                    <strong>{student.name}</strong>
                  </span>
                </div>
                <img
                  className="freeze-summary-line"
                  src={asset("ace44.svg")}
                  alt=""
                />
                <div className="freeze-summary-row">
                  <img src={asset("b6de0.svg")} alt="" />
                  <span>
                    <small>Период заморозки</small>
                    <strong>{period}</strong>
                  </span>
                </div>
                <img
                  className="freeze-summary-line"
                  src={asset("ace44.svg")}
                  alt=""
                />
                <div className="freeze-summary-row">
                  <img src={asset("61636.svg")} alt="" />
                  <span>
                    <small>Причина</small>
                    <strong>{reason}</strong>
                  </span>
                </div>
                {comment && (
                  <div className="freeze-summary-comment ym-hide-content">
                    <small>Комментарий</small>
                    <p>{comment}</p>
                  </div>
                )}
              </div>
            </div>
            <button className="freeze-done" onClick={onClose}>
              Понятно
            </button>
          </>
        )}
      </aside>
    </div>
  );
}
