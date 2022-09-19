import React from "react";
import { TimeItem } from "./const.ts";
import "./TimeComponent.scss";
import { changeTime } from "../store/actions/time";
import { connect } from "react-redux";

const TimeComponentUI = ({
  className = "",
  style = {},
  activeKey = "",
  changeTime = () => {}
}) => {
  const keys = Object.keys(TimeItem);
  const onChange = (time) => {
    changeTime(time);
  };
  return (
    <div className={`flex-column ${className} ml10`} style={style}>
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

export const TimeComponent = connect(
  state => ({time: state.time}),
  {changeTime}
)(TimeComponentUI);
