import React, { useState, useEffect } from "react";
import { trackGoal } from "../../lib/analytics";
import { asset } from "../../lib/assets";
import { designMessages } from "../../data/messages";
import { readLocation } from "../../lib/routes";
import Portrait from "../Portrait";
import StudentInfo from "./StudentInfo";
import FreezeDrawer from "../FreezeDrawer/FreezeDrawer";
export default function StudentDrawer({ student, onClose, open }) {
  useEffect(() => {
    trackGoal("student_card_open");
  }, []);
  const [freezing, setFreezing] = useState(false);
  const [tab, setTab] = useState(() =>
    readLocation().searchParams.get("tab") === "info" ? "info" : "dialog",
  );
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState([]);
  const isIlya = student.name === "Илья Кузнецов";
  const profileFile = isIlya ? "4ae93.png" : student.portrait;
  const send = (e) => {
    e.preventDefault();
    if (draft.trim()) {
      setSent([...sent, draft.trim()]);
      setDraft("");
    }
  };
  if (freezing)
    return (
      <FreezeDrawer
        student={student}
        onClose={onClose}
        onCancel={() => setFreezing(false)}
      />
    );
  return (
    <div
      className="student-drawer-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className="student-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`Диалог: ${student.name}`}
      >
        <button
          className="drawer-close"
          aria-label="Закрыть диалог"
          onClick={onClose}
        >
          <img src={asset("2c0b1.svg")} alt="" />
        </button>
        <div className="drawer-profile">
          <Portrait
            file={profileFile}
            size={88}
            w={isIlya ? 96.462 : (student.portraitWidth * 88) / 36}
            h={isIlya ? 96.462 : (student.portraitHeight * 88) / 36}
            x={isIlya ? -4.235 : (student.portraitX * 88) / 36}
            y={isIlya ? 0 : (student.portraitY * 88) / 36}
            mask="a12df.svg"
          />
          <div className="drawer-profile-text">
            <h2>{student.name}</h2>
            <p>{student.direction}</p>
            <p>{student.semester} семестр · группа АФ17-31Б</p>
            <strong>
              <img src={asset("a2339.svg")} alt="" />
              Отсутствует 7 дней
            </strong>
          </div>
        </div>
        <div className="drawer-actions">
          <button onClick={() => setFreezing(true)}>
            <img src={asset("5abae.svg")} alt="" />
            Заморозка
          </button>
          <button
            onClick={() =>
              open("Встреча", `Назначить встречу с ${student.name}`)
            }
          >
            <img src={asset("ee965.svg")} alt="" />
            Встреча
          </button>
        </div>
        <div className="drawer-tabs">
          <button
            className={tab === "dialog" ? "selected" : ""}
            onClick={() => setTab("dialog")}
          >
            Диалог
          </button>
          <button
            className={tab === "info" ? "selected" : ""}
            onClick={() => {
              if (tab !== "info") trackGoal("student_info_open");
              setTab("info");
            }}
          >
            Информация
          </button>
        </div>
        {tab === "dialog" ? (
          <>
            <div className="chat-content">
              <p className="chat-date">Сегодня</p>
              {(isIlya ? designMessages : []).map((m, i) => (
                <div
                  className={"chat-message " + m.side}
                  style={{ height: m.height }}
                  key={i}
                >
                  {m.side === "in" && (
                    <Portrait
                      file="4ae93.png"
                      size={32}
                      w={41}
                      h={41}
                      x={-5}
                      y={0}
                      mask="b62f6.svg"
                    />
                  )}
                  <div className="chat-bubble">
                    <p>{m.text}</p>
                    <span>
                      {m.time}
                      {m.side === "out" && (
                        <img src={asset("67c9c.svg")} alt="Доставлено" />
                      )}
                    </span>
                  </div>
                </div>
              ))}
              {sent.map((msg, i) => (
                <div className="chat-message out new-message" key={"sent" + i}>
                  <div className="chat-bubble ym-hide-content">
                    <p>{msg}</p>
                    <span>
                      Сейчас
                      <img src={asset("67c9c.svg")} alt="Доставлено" />
                    </span>
                  </div>
                </div>
              ))}
              {!isIlya && sent.length === 0 && (
                <p className="chat-empty">Пока нет сообщений</p>
              )}
            </div>
            <form className="chat-compose" onSubmit={send}>
              <button
                type="button"
                aria-label="Прикрепить файл"
                onClick={() =>
                  open(
                    "Вложение",
                    "Прикрепление файла пока недоступно в прототипе.",
                  )
                }
              >
                <img src={asset("b741d.svg")} alt="" />
              </button>
              <input
                className="ym-disable-keys"
                aria-label="Написать сообщение"
                placeholder="Написать сообщение..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit" aria-label="Отправить сообщение">
                <img src={asset("44bb9.svg")} alt="" />
              </button>
            </form>
          </>
        ) : (
          <StudentInfo />
        )}
      </aside>
    </div>
  );
}
