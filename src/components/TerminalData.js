import React from "react";
import { TodayEquipmentComponent } from "./TodayEquipmentComponent";
import { TimeComponent } from "./TimeComponent";
import { EquipmentKey, Time } from "./const.ts";
import "./TerminalData.scss";

// 终端数据
export const TerminalData = () => {
  const [time, setTime] = React.useState(Time.today);
  const [activeKey, setActiveKey] = React.useState(EquipmentKey.reportVolumn);

  const onChange = e => {
    setActiveKey(e);
  };

  return (
    <div className="terminal-data">
      <div className="content-title">终端状态数据</div>
      <div className="content-list">
        <div className="chart-part statistics-echart-com">
          <TodayEquipmentComponent onChange={onChange} activeKey={activeKey} time={time}/>
        </div>
        <div className="time-part">
          <TimeComponent activeKey={time} onChange={e => {setTime(e); }}/>
        </div>
      </div>
    </div>
  );
};
