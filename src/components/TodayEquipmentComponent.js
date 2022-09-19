import React from "react";
import {connect} from "react-redux";
import { EquipmentItem } from "./const.ts";
import "./TodayEquipmentComponent.scss";
import { getTerminalData } from "../api/api";
import { getTimePeriod } from "../utils";

const TodayEquipmentComponentUI = ({
  termid,
  time,
  activeKey,
  onChange = () => {}
}) => {
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

  React.useEffect(
    () => {
      const {start_time, end_time} = getTimePeriod(time);
      // 查询地图选中的生产单元的详细终端状态数据
      getTerminalData({
        termid,
        start_time,
        end_time
      }).then(res => {
        console.log('@@@@@@', res);
      });
    },
    [termid, time]
  );

  return (
    <div className="content-component weather">
      <div className="content ml20">{ListComponent}</div>
    </div>
  );
};

export const TodayEquipmentComponent = connect(
  state => ({termid: state.mapData.termid}),
  {}
)(TodayEquipmentComponentUI);