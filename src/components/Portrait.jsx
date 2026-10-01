import React from "react";
import { asset } from "../lib/assets";
export default function Portrait({
  file,
  size = 36,
  w = size,
  h = size,
  x = 0,
  y = 0,
  mask,
}) {
  return (
    <span
      className="portrait"
      style={{
        width: size,
        height: size,
        ...(mask
          ? {
              maskImage: `url(${asset(mask)})`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
            }
          : {}),
      }}
    >
      <img
        src={asset(file)}
        alt=""
        style={{ width: w, height: h, left: x, top: y }}
      />
    </span>
  );
}
