import React from "react";
import { EquipmentItem } from "./const.ts";
import "./TodayEquipmentComponent.scss";

export const TodayEquipmentComponent = ({ activeKey, onChange = () => {} }) => {
  const ListComponent = React.useMemo(
    () => {
      const keys = Object.keys(EquipmentItem);
      return keys.map((ele, ind) => (
        <div
          key={`todayEquipment-${ind}`}
          className={`equipment-btn pointer ${Number(ele) === Number(activeKey)
            ? "btn-highlight"
            : ""}`}
          onClick={() => {
            onChange(ele);
          }}
        >
          {EquipmentItem[ele]}
        </div>
      ));
    },
    [activeKey, onChange]
  );
  return (
    <div className="content-component weather">
      <div className="content-title ml20">今日设备统计</div>
      <div className="content ml20">{ListComponent}</div>
    </div>
  );
};
