import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption } from "./const.ts";

export const TodayStatistics = () => {
  const defaultOptions = TypeToOption[ChartType.Statis];
  const [options, setOptions] = React.useState(defaultOptions);
  return (
    <div className="content-component history ">
      <div className="flex">
        <div className="content-title ml20">今日数据统计</div>
        <div className="content">
          <ButtonComponent style={{ marginTop: 6 }} />
        </div>
      </div>
      <div className=" statistics-echart-com">
        <ChartComponent
          type={ChartType.Statis}
          style={{ marginTop: "10px" }}
          options={options}
        />
      </div>
    </div>
  );
};
