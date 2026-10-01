import React from "react";
import { asset } from "../../lib/assets";
export default function StudentInfo() {
  return (
    <div className="drawer-info">
      <h3 className="info-heading contacts-heading">Контакты</h3>
      <a className="info-contact info-email" href="mailto:i.kuznetsov@mail.ru">
        <img src={asset("cb032.svg")} alt="" />
        i.kuznetsov@mail.ru
      </a>
      <a className="info-contact info-phone" href="tel:+79123456789">
        <img src={asset("281a4.svg")} alt="" />
        +7 912 345-67-89
      </a>
      <div className="info-divider info-divider-first" />
      <h3 className="info-heading extra-heading">Дополнительно</h3>
      <div className="info-detail detail-admission">
        <span>Дата поступления:</span>
        <strong>16 июня 2026</strong>
      </div>
      <div className="info-detail detail-graduation">
        <span>Окончание обучения:</span>
        <strong>30 августа 2027</strong>
      </div>
      <div className="info-detail detail-tutor">
        <span>Тьютор:</span>
        <strong>Мария Иванова</strong>
      </div>
      <div className="info-divider info-divider-second" />
      <h3 className="info-heading documents-heading">Документы</h3>
      {["Договор", "Согласие на обработку данных"].map((name, i) => (
        <div className={"info-document info-document-" + i} key={name}>
          <span>
            <img src={asset("84e3c.svg")} alt="" />
            {name}
          </span>
          <button
            type="button"
            aria-label={`Скачать: ${name}`}
            onClick={() => {}}
          >
            <img src={asset("4d4e3.svg")} alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}
