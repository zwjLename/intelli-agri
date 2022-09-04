import React from "react";
import { TimeItem } from "./const.ts";
import "./TimeComponent.scss";

export const TimeComponent = ({
  className = "",
  style = {},
  activeKey = "",
}) => {
  const keys = Object.keys(TimeItem);
  return (
    <div className={`flex-column ${className} ml20`} style={style}>
      {keys.map((ele, ind) => (
        <div
          key={`realtime-${ind}`}
          className={`time-button-com pointer ${Number(ele) ===
          Number(activeKey)
            ? "time-btn-highlight"
            : ""}`}
        >
          {TimeItem[ele]}
        </div>
      ))}
    </div>
  );
};
