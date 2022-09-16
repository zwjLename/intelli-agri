import React from "react";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption, Time } from "./const.ts";
import "./style.scss";
import { TimeComponent } from "./TimeComponent";
import "./TerminalManage.scss";
import { MeteorologyMenu } from "./MeteorologyMenu"

// 终端管理
export const TerminalManage = () => {
  const defaultOptions = TypeToOption[ChartType.Equip];
  const [options, setOptions] = React.useState(defaultOptions);
  const [period, setPeriod] = React.useState(Time.oneWeek); // 时间

  return (
    <div className="terminal-manage">
      <div className="content-title">
          终端在线：100个，离线3个
      </div>
      <div className="content">
        <div className="chart-part ">
          <MeteorologyMenu />
          <div className="condition-realtime-echart">
            <ChartComponent
              type={ChartType.RealTime}
              style={{ marginTop: "10px" }}
              options={options}
            />
          </div>
        </div>
        <div className="time-part ml20">
          <TimeComponent activeKey={period} />
        </div>
      </div>
    </div>
  );
};
