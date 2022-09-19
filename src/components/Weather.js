import React from "react";
import { WeatherItem } from "./const.ts";
import "./style.scss";

export const Weather = () => {

  const ListComponent = React.useMemo(
    () => {
      const keys = Object.keys(WeatherItem);
      return keys.map((ele, ind) => <li key={ind}>{WeatherItem[ele]}: xxx</li>);
    },
    []
  );

  return (
    <div className="content-component weather">
      <div className="content">
        <ul>{ListComponent}</ul>
      </div>
    </div>
  );
};
