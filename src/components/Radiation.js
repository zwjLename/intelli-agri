import React from "react";
import {RadiationMenu} from "./RadiationMenu";
import {RAttr, ChartType, TypeToOption} from "./const.ts";
import {ChartComponent} from "./ChartComponent";
import {getIlluIntgl} from "../api/api";
import {getTimePeriod, getRadiationOption} from "../utils";
import { connect } from "react-redux";

// 日总辐射、日均辐射
const RadiationUI = ({
  time,
  mapData
}) => {
  const [attri, setAttri] = React.useState(RAttr.dailyTotalRad);
  const defaultOptions = TypeToOption[ChartType.Equip];
  const [options, setOptions] = React.useState(defaultOptions);

  // 监控时间、地图、菜单
  React.useEffect(() => {
    // 获取日总辐射等数值
    const {startTime, endTime} = getTimePeriod(time);
    getIlluIntgl({
      term_id: `${mapData.termid}`,
      start_time: startTime,
      end_time: endTime
    }).then((res) => {
      setOptions(getRadiationOption(res, attri));
    });
  }, [time, mapData.termid, attri]);

  return (
    <>
      <RadiationMenu className="menu" activeKey={attri} changeMenu={setAttri}/>
      <ChartComponent
        type={ChartType.RealTime}
        style={{ marginTop: "10px" }}
        options={options}
      />
    </>
  );
};

export const Radiation = connect(
  state =>({
    time: state.time,
    mapData: state.mapData
  }),
  {}
)(RadiationUI);