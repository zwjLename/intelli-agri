import React from "react";
import { Weather } from "./Weather";
import { RealTime } from "./RealTime";

import "./Meteorology.scss";

// 气象走势
export const Meteorology = () => {

  return (
    <div className="meteorology">
      <div className="content-title">气象走势</div>
      <div className="detail">
        <div className="weather"><Weather /></div>
        <div className="realtime"><RealTime /></div>
      </div>
    </div>
  );
};
