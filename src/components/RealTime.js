import * as echarts from "echarts";
import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { ChartComponent } from "./ChartComponent";
import { AttrItem, TypeToOption, ChartType } from "./const.ts";

export const RealTime = () => {
  const [attri, setAttri] = React.useState(Attr.warm);
  const defaultOptions = TypeToOption[ChartType.RealTime];
  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(
    () => {
      if (attri !== Attr.warm) {
        const optionscp = defaultOptions;
        optionscp.series[0].name = AttrItem[attri];
        optionscp.series[0].data = [20, 32, 11, 34, 90, 30, 10];
        setOptions(optionscp);
      } else {
        setOptions(defaultOptions);
      }
    },
    [attri, defaultOptions]
  );
  return (
    <div className="content-component realTime">
      <div className="content-title ml20">实时数据</div>
      <div className="content">
        {/* <div> */}
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
