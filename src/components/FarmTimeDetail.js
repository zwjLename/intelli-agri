import React from "react";
import { connect } from "react-redux";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption } from "./const.ts";

// 农时-详情
const FarmTimeDetailUI = ({
  type,
  time,
  mapData
}) => {
  const defaultOptions = TypeToOption[ChartType.Statis];
  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(
    ()=> {
      // todo 发送请求，重绘chart

    },
    [type, time, mapData.cellid]
  );

  return (
    <div className="chart">
      <ChartComponent
        type={ChartType.Statis}
        style={{ marginTop: "10px" }}
        options={options}
      />
    </div>
  );
};

export const FarmTimeDetail = connect(
  (state) =>({
    time: state.time,
    mapData: state.mapData
  }),
  {}
)(FarmTimeDetailUI);
