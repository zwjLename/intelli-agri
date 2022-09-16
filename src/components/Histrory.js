import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption, Time } from "./const.ts";
import { TimeComponent } from "./TimeComponent";

export const History = () => {
  const [attri, setAttri] = React.useState(Attr.warm); // 属性
  const [period, setPeriod] = React.useState(Time.oneWeek); // 时间
  const defaultOptions = TypeToOption[ChartType.History];
  const [options, setOptions] = React.useState(defaultOptions);

  return (
    <div className="content-component history ">
      <div className="flex">
        <div className="content-title ml20">历史数据</div>
        <div className="content">
          <ButtonComponent style={{ marginTop: 6 }} activeKey={attri} />
        </div>
      </div>
      <div className="flex history-chart-component">
        <TimeComponent activeKey={period} />
        <ChartComponent
          type={ChartType.History}
          style={{ marginTop: "10px" }}
          options={options}
        />
      </div>
    </div>
  );
};
