import React from "react";
import {connect} from "react-redux";
import { message } from "antd";
import {ChartComponent} from "./ChartComponent";
import {TypeToOption, ChartType} from "./const.ts";
import {getSunTime, getIlluIntgl} from "../api/api";
import {getTimePeriod, getSunTimeOption} from "../utils";
import {Radiation} from "./Radiation";
import "./SunTime.scss";

// 日出日落
const SunTimeUI = ({
  time,
  mapData
}) => {
  const defaultOptions = TypeToOption[ChartType.SunTime];
  const [options, setOptions] = React.useState(defaultOptions);

  const getData = async (params) => {
    try {
      const sunTimeData = await getSunTime(params);
      const illuIntgeData = await getIlluIntgl(params);
      return {
        sunTimeData,
        illuIntgeData
      }
    } catch (err) {
      message.error(err);
    }
  };

  // React.useEffect(() => {
  //   // 监听time、map的变化
  //   const {startTime, endTime} = getTimePeriod(time);
  //   getData({
  //     term_id: `${mapData.termid}`,
  //     start_time: startTime,
  //     end_time: endTime
  //   }).then(res => {
  //     setOptions(getSunTimeOption(res.sunTimeData, res.illuIntgeData));
  //   });
  // }, [time, mapData.termid]);


  return (
    // <ChartComponent
    //   type={ChartType.SunTime}
    //   style={{ marginTop: "10px" }}
    //   options={options}
    // />
    <div className="suntime">
      <div className="content-title">农时分析</div>
      <Radiation className="radiation"/>
    </div>
  )
};
export const SunTime = connect(
  state =>({
    time: state.time,
    mapData: state.mapData
  }),
  {}
)(SunTimeUI);