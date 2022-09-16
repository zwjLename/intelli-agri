import React from "react";
import { WeatherItem, Time } from "./const.ts";
import "./style.scss";
import { TimeComponent } from "./TimeComponent";

export const Weather = () => {
  const [period, setPeriod] = React.useState(Time.oneWeek); // 时间

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
        {/* <ul>{ListComponent}</ul> */}
        <TimeComponent  activeKey={period} />
      </div>
    </div>
  );
};
