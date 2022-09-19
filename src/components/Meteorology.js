import React from "react";
import { TimeComponent } from "./TimeComponent";
import { RealTime } from "./RealTime";
import { Time } from "./const.ts";

import "./Meteorology.scss";

// 气象走势
export const Meteorology = () => {
  const [period, setPeriod] = React.useState(Time.today); // 时间

  return (
    <div className="meteorology">
      <div className="content-title">气象走势</div>
      <div className="detail">
        <div className="weather"><TimeComponent activeKey={period} /></div>
        <div className="realtime"><RealTime /></div>
      </div>
    </div>
  );
};
