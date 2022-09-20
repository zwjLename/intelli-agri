import React from "react";
import { FarmTimeMenu } from "./FarmTimeMenu";
import { FarmTimeDetail } from "./FarmTimeDetail";

import "./FarmTime.scss";
import { Attr } from "./const.ts";

// 农时分析
export const FarmTime = () => {
  let [attri, setAttri] = React.useState("temperature");

  const onChange = (menu) => {
    // console.log('@@@@@@ ', typeof menu.key, menu.key);
    setAttri(menu.key)
  };

  return (
    <div className="content-component farm-time">
      <div className="content-title">农时分析</div>
      <div className="menu"><FarmTimeMenu activeKey={attri} onChange={onChange}/></div>
      <div className="detail"><FarmTimeDetail type={attri}/></div>
    </div>
  );
};
