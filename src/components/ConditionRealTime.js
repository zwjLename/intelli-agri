import React from "react";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption, EquipmentKey } from "./const.ts";
import "./style.scss";
import { TodayEquipmentComponent } from "./TodayEquipmentComponent";

export const ConditionRealTime = () => {
  const defaultOptions = TypeToOption[ChartType.Equip];
  const [options, setOptions] = React.useState(defaultOptions);
  const [activeKey, setActiveKey] = React.useState(EquipmentKey.reportVolumn);

  const onChange = e => {
    setActiveKey(e);
  };
  return (
    <div className="flex" style={{ width: "100%", height: "100%" }}>
      <div className="main-part ">
        <div className="content-title ml20">病情实时数据</div>
        <div className="condition-realtime-echart">
          <ChartComponent
            type={ChartType.RealTime}
            style={{ marginTop: "10px" }}
            options={options}
          />
        </div>
      </div>
      <div className="main-part ml20">
        <TodayEquipmentComponent onChange={onChange} activeKey={activeKey} />
      </div>
    </div>
  );
};
