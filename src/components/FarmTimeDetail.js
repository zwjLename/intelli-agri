import React from "react";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption } from "./const.ts";

// 农时-详情
export const FarmTimeDetail = () => {
  const defaultOptions = TypeToOption[ChartType.Statis];
  const [options, setOptions] = React.useState(defaultOptions);

  React.useEffect(()=> {
    // todo 监测time的变化
  })

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
