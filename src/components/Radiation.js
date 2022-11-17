import React from "react";
import { RadiationMenu } from "./RadiationMenu";
import { RAttr, ChartType, TypeToOption } from "./const.tsx";
import { ChartComponent } from "./ChartComponent";
import { getIlluIntgl, getSunTime } from "../api/api";
import { getTimePeriod, getRadiationOption, getSunTimeOption } from "../utils";
import { connect } from "react-redux";

// 日总辐射、日均辐射
const RadiationUI = ({ time, mapData }) => {
  const [attri, setAttri] = React.useState(RAttr.sunset);
  const defaultOptions = TypeToOption[ChartType.Equip];
  const [options, setOptions] = React.useState(defaultOptions);

  // 监控时间、地图、菜单
  React.useEffect(() => {
    const { startTime, endTime } = getTimePeriod(time);
    const params = {
      term_id: `${mapData.termid}`,
      start_time: startTime,
      end_time: endTime,
    };
    if (Number(attri) === Number(RAttr.sunset)) {
      getSunTime(params).then(res => {
        setOptions(getSunTimeOption(res, time));
      });
    } else {
      // 获取日总辐射等数值
      getIlluIntgl(params).then((res) => {
        setOptions(getRadiationOption(res, attri));
      });
    }
  }, [time, mapData.termid, attri]);

  return (
    <>
      <RadiationMenu className="menu" activeKey={attri} changeMenu={setAttri} />
      <ChartComponent
        type={ChartType.RealTime}
        style={{ marginTop: "10px" }}
        options={options}
      />
    </>
  );
};

export const Radiation = connect(
  (state) => ({
    time: state.terminal.time,
    mapData: state.mapData,
  }),
  {}
)(RadiationUI);
