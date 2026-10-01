import React from "react";
import Portrait from "./Portrait";
import Icon from "./Icon";
export default function StudentRow({ student, open, onDetails, selected }) {
  return (
    <div className={"student table-grid" + (selected ? " row-selected" : "")}>
      <button
        className="student-name"
        onClick={() =>
          open(
            student.name,
            `${student.group} · ${student.direction}\nСеместр: ${student.semester}\nСтатус: ${student.status}`,
          )
        }
      >
        <Portrait
          file={student.portrait}
          w={student.portraitWidth}
          h={student.portraitHeight}
          x={student.portraitX}
          y={student.portraitY}
          mask="76388.svg"
        />
        <span>{student.name}</span>
      </button>
      <span className="group">{student.group}</span>
      <span className="semester">{student.semester}</span>
      <span className="course">{student.direction}</span>
      <span>
        <span className={"status " + student.statusClass}>
          {student.status}
        </span>
      </span>
      <span className="updated">{student.updated}</span>
      <button
        className="messages"
        aria-label={`Сообщения: ${student.name}`}
        onClick={() =>
          open(
            `Сообщения · ${student.name}`,
            student.messages
              ? `Новых сообщений: ${student.messages}`
              : "Новых сообщений нет",
          )
        }
      >
        <Icon name="message" />
        {student.messages > 0 && <span>{student.messages}</span>}
      </button>
      <button
        className="details"
        aria-label={`Открыть: ${student.name}`}
        onClick={() => onDetails(student)}
      >
        <Icon name="next" />
      </button>
    </div>
  );
}
