import * as echarts from "echarts";
import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { ChartComponent } from "./ChartComponent";
import { Attr, AttrItem, TypeToOption, ChartType, AttrParam } from "./const.ts";
import { connect } from "react-redux";
import { hisAggrQuery } from "../api/api";
import { getTimePeriod, getRealTimeOption } from "../utils";

const RealTimeUI = ({
  time,
  mapData
}) => {
  const [attri, setAttri] = React.useState(Attr.warm);
  const defaultOptions = TypeToOption[ChartType.RealTime];
  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(
    () => {
      // 监听time、menu以及map的变化
      const {startTime, endTime} = getTimePeriod(time);
      hisAggrQuery({
        cell_ids: mapData.cellid + '',
        snp_types: AttrParam[attri],
        start_time: startTime,
        end_time: endTime
      }).then(res => {
        if (res) {
          const chartData = res[0] ? res[0].sntvs[0] : {};
          // 重绘chart
          setOptions(getRealTimeOption(chartData, AttrItem[attri]));
        }
      });
    },
    [attri, time, mapData.cellid]
  );

  return (
    <div className="content-component realTime">
      <ButtonComponent
        activeKey={attri}
        className="ml20"
        onChange={e => {
          setAttri(e);
        }}
      />
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
    mapData: state.mapData
  }),
  {}
)(RealTimeUI);