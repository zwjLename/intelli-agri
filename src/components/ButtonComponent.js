import React from "react";
import "./ButtonComponent.scss";
import { Attr, AttrItem } from "./const.tsx";

export const ButtonComponent = ({
  activeKey = Attr.warm,
  className = "",
  style = {},
  onChange = () => {
  },
}) => {
  const keys = Object.keys(AttrItem);
  return (
    <div className={`flex ${className}`} style={style}>
      {keys.map((ele, ind) => (
        <div
          key={`realtime-${ind}`}
          className={`button-com pointer ${Number(ele) === Number(activeKey)
            ? "btn-highlight"
            : ""}`}
          onClick={() => {
            onChange(ele);
          }}
        >
          {AttrItem[ele]}
        </div>
      ))}
    </div>
  );
};
