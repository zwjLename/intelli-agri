import React from "react";
import { connect } from "react-redux";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption, AttrParam, AttrItem } from "./const.tsx";
import { getDailyParam } from "../api/api";
import { getTimePeriod, getDailyParamOption } from "../utils";

// 气象参数
const DailyParamUI = ({
  time,
  mapData,
  attri
}) => {
  const defaultOptions = TypeToOption[ChartType.Statis];
  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(
    ()=> {
      // 监听time、menu以及map的变化
      const {startTime, endTime} = getTimePeriod(time);
      getDailyParam({
        term_id: `${mapData.termid}`,
        type: AttrParam[attri],
        start_time: startTime,
        end_time: endTime
      }).then(res => {
        if (res) {
          // 重绘chart
          setOptions(getDailyParamOption(res, AttrItem[attri]));
        }
      });
    },
    [attri, time, mapData.termid]
  );

  return (
    <>
    <div>每日气象统计：最高/平均/最低</div>
      {
        options
        ?
        <ChartComponent
          type={ChartType.Statis}
          options={options}
          
        />
        :
        <div className="no-data">暂无数据</div>
      }
    </>
  );
};

export const DailyParam = connect(
  (state) =>({
    time: state.time,
    mapData: state.mapData,
    attri: state.menu
  }),
  {}
)(DailyParamUI);
