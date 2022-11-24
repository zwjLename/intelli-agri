import React from "react";
import { TimeItem } from "./const.tsx";
import "./TimeComponent.scss";

export const TimeComponent = ({
  className = "",
  style = {},
  activeKey = "",
  onChange,
}) => {
  const keys = Object.keys(TimeItem);
  return (
    <div className={` ${className}`} style={style}>
      {keys.map((ele, ind) => (
        <div
          key={`realtime-${ind}`}
          className={`time-button-com pointer ${Number(ele) ===
          Number(activeKey)
            ? "time-btn-highlight"
            : ""}`}
          onClick={() => {
            onChange(ele * 1);
          }}
        >
          {TimeItem[ele]}
        </div>
      ))}
    </div>
  );
};

