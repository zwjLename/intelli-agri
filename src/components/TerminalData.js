import React from "react";
import { TodayEquipmentComponent } from "./TodayEquipmentComponent";
import { EquipmentKey } from "./const.ts";

// 终端数据
export const TerminalData = () => {
  const [activeKey, setActiveKey] = React.useState(EquipmentKey.reportVolumn);

  const onChange = e => {
    setActiveKey(e);
  };

  return (
    <div className="content-component history ">
      <div className="flex">
        <div className="content-title ml20">终端状态数据</div>
      </div>
      <div className="statistics-echart-com">
        <TodayEquipmentComponent onChange={onChange} activeKey={activeKey} />
      </div>
    </div>
  );
};
