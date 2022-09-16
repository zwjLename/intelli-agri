import * as echarts from "echarts";
import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { ChartComponent } from "./ChartComponent";
import { AttrItem, TypeToOption, ChartType, Time } from "./const.ts";
import { connect } from "react-redux";
import { hisAggrQuery } from "../api/api";

const RealTimeUI = ({
  time
}) => {
  const [attri, setAttri] = React.useState(Attr.warm);
  const defaultOptions = TypeToOption[ChartType.RealTime];
  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(
    () => {
      // todo 监听time的变化
      console.log('*** ', time);
      hisAggrQuery({
        cell_ids: '84,85',
        snp_types: "do,ph",
        start_time: "2022-09-03 00:00:00",
        end_time: '2022-09-03 02:00:00'
      }).then(res => {
        console.log("--- 返回值：", res);
      });

      if (attri !== Attr.warm) {
        const optionscp = defaultOptions;
        optionscp.series[0].name = AttrItem[attri];
        optionscp.series[0].data = [20, 32, 11, 34, 90, 30, 10];
        setOptions(optionscp);
      } else {
        setOptions(defaultOptions);
      }
    },
    [attri, defaultOptions, time]
  );

  return (
    <div className="content-component realTime">
      <div className="content">
        <span>{time}</span>
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
    </div>
  );
};

export const RealTime = connect(state => ({time: state.time}), {})(RealTimeUI);