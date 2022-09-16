import React from "react";
import { FarmTimeMenu } from "./FarmTimeMenu";
import { FarmTimeDetail } from "./FarmTimeDetail";

import "./FarmTime.scss";

// 农时分析
export const FarmTime = () => {

  return (
    <div className="content-component farm-time">
      <div className="content-title">农时分析</div>
      <div className="menu"><FarmTimeMenu /></div>
      <div className="detail"><FarmTimeDetail /></div>
    </div>
  );
};
