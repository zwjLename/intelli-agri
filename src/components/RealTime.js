import React from "react";
import { ChartComponent } from "./ChartComponent";
import { TypeToOption, ChartType, AttrParam, AttrItem } from "./const.ts";
import { connect } from "react-redux";
import { hisAggrQuery } from "../api/api";
import { getTimePeriod, getRealTimeOption } from "../utils";

const RealTimeUI = ({
  time,
  mapData,
  attri
}) => {
  const defaultOptions = TypeToOption[ChartType.RealTime];
  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(
    () => {
      // 监听time、menu以及map的变化
      const {startTime, endTime} = getTimePeriod(time);
      hisAggrQuery({
        term_id: `${mapData.termid}`,
        type: AttrParam[attri],
        start_time: startTime,
        end_time: endTime
      }).then(res => {
        if (res) {
          // const chartData = res[0] ? res[0].sntvs[0] : {};
          // 重绘chart
          // setOptions(getRealTimeOption(chartData, AttrItem[attri]));
          setOptions(getRealTimeOption(res, AttrItem[attri]));
        }
      });
    },
    [attri, time, mapData.termid]
  );

  return (
    <div className="content-component realTime">
      <ChartComponent
        type={ChartType.RealTime}
        style={{ marginTop: "10px" }}
        options={options}
      />
    </div>
  );
};

export const RealTime = connect(
  state => ({
    time: state.time,
    mapData: state.mapData,
    attri: state.menu
  }),
  {}
)(RealTimeUI);