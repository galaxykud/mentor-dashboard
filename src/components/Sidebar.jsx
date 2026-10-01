import React from "react";
import { asset } from "../lib/assets";
import Icon from "./Icon";
import Portrait from "./Portrait";
export default function Sidebar({ page, selectedStudent, goPage, open }) {
  return (
    <aside className={"sidebar " + (selectedStudent ? "sidebar-above" : "")}>
      <button
        className="profile"
        aria-label="Профиль"
        onClick={() => open("Профиль куратора", "Ваш личный кабинет")}
      >
        <img className="profile-ring" src={asset("74658.svg")} alt="" />
        <Portrait
          file="51fb2.png"
          size={44}
          w={51.535}
          h={68.482}
          x={-3.667}
          y={-10.081}
          mask="ea6dc.svg"
        />
      </button>
      <img className="nav-line" src={asset("7214b.svg")} alt="" />
      <nav>
        <button
          className={"nav-button " + (page === "home" ? "active" : "")}
          aria-label="Главная"
          onClick={() => goPage("home")}
        >
          {page !== "home" ? (
            <img className="icon" src={asset("cefcf.svg")} alt="" />
          ) : (
            <Icon name="home" />
          )}
        </button>
        <button
          className={"nav-button " + (page === "students" ? "active" : "")}
          aria-label="Студенты"
          onClick={() => goPage("students")}
        >
          {page === "students" ? (
            <img className="icon" src={asset("468af.svg")} alt="" />
          ) : (
            <Icon name="users" />
          )}
        </button>
        <button
          className={"nav-button " + (page === "calendar" ? "active" : "")}
          aria-label="Календарь"
          onClick={() => goPage("calendar")}
        >
          <Icon name="calendar" />
        </button>
      </nav>
      <div className="brand">
        <img src={asset("8d345.svg")} alt="Д" />
        <img src={asset("6fea7.svg")} alt="" />
      </div>
    </aside>
  );
}
