import React from "react";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption, Time, MAttr } from "./const.ts";
import "./style.scss";
import { TimeComponent } from "./TimeComponent";
import "./TerminalManage.scss";
import { MeteorologyMenu } from "./MeteorologyMenu"

// 终端管理
export const TerminalManage = () => {
  const defaultOptions = TypeToOption[ChartType.Equip];
  const [options, setOptions] = React.useState(defaultOptions);
  const [period, setPeriod] = React.useState(Time.today); // 时间
  const [attri, setAttri] = React.useState(MAttr.data + "");

  const onMenuChange = (menu) => {
    // console.log('@@@@@@ onMenuChange', typeof menu.key, menu.key);
    setAttri(menu.key)
  };

  React.useEffect(
    () => {
      // todo 下发请求，重绘chart

    },
    [attri, period]
  );

  return (
    <div className="terminal-manage">
      <div className="content-title">
        终端在线：100个，离线3个
      </div>
      <div className="content">
        <div className="chart-part">
          <MeteorologyMenu activeKey={attri} onChange={onMenuChange}/>
          <div className="condition-realtime-echart">
            <ChartComponent
              type={ChartType.RealTime}
              style={{ marginTop: "10px" }}
              options={options}
            />
          </div>
        </div>
        <div className="time-part">
          <TimeComponent activeKey={period} onChange={e => {setPeriod(e)}}/>
        </div>
      </div>
    </div>
  );
};
