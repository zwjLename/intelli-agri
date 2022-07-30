import React from "react";
import { WeatherItem } from "./const.ts";
import "./style.scss";

export const Weather = () => {
  const ListComponent = React.useMemo(
    () => {
      const keys = Object.keys(WeatherItem);
      return keys.map((ele, ind) => <li key={ind}>{WeatherItem[ele]}: xxx</li>);
    },
    [WeatherItem]
  );
  return (
    <div className="content-component weather">
      <div className="content-title ml20">农业气象数据</div>
      <div className="content ml20">
        <ul>{ListComponent}</ul>
      </div>
    </div>
  );
};
