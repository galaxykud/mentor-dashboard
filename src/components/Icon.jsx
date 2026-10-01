import React from "react";
import { asset } from "../lib/assets";
const icons = {
  settings: "3f300.svg",
  bell: "6f5e2.svg",
  home: "6a562.svg",
  users: "24aec.svg",
  calendar: "5502d.svg",
  clock: "9f088.svg",
  arrow: "d2985.svg",
  next: "9d22f.svg",
  message: "58bf7.svg",
};
export default function Icon({ name }) {
  return (
    <img className={"icon icon-" + name} src={asset(icons[name])} alt="" />
  );
}
