import React from "react";
import { EquipmentItem } from "./const.tsx";
import { getTerminalData } from "../api/api";
import { getTimePeriod, parseTerminalData } from "../utils";
import "./TodayEquipmentComponent.scss";

const ListComponent = ({
  activeKey,
  onChange,
  displayData
}) => {
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
      {EquipmentItem[ele]}：{displayData[ele]}
    </div>
  ));
};

export const TodayEquipmentComponent = ({
  termid,
  time,
  activeKey,
  onChange = () => {}
}) => {
  const [displayData, setDisplayData] = React.useState({});

  React.useEffect(
    () => {
      const {startTime, endTime} = getTimePeriod(time);
      // 查询地图选中的生产单元的详细终端状态数据
      getTerminalData({
        termid,
        start_time: startTime,
        end_time: endTime
      }).then(res => {
        setDisplayData(parseTerminalData(res));
      });
    },
    [termid, time]
  );

  return (
    <div className="content-component weather">
      <div className="content">
          <ListComponent
            activeKey={activeKey}
            onChange={onChange}
            displayData={displayData}
          />
        </div>
    </div>
  );
};

