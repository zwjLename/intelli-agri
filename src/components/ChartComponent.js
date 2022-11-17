import * as echarts from "echarts";
import { debounce } from "lodash";
import React from "react";
import { addListener, removeListener } from "resize-detector";

export const ChartComponent = ({
  style,
  options = {},
  mouseover,
  mouseout,
}) => {
  const chartRef = React.useRef(null);
  const chartInstance = React.useRef(null);
  // 窗口大小变化，调整画布大小
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resize = () => {
    if (chartInstance.current) {
      chartInstance.current.resize();
    }
  };
  React.useEffect(() => {
    chartInstance.current = echarts.init(chartRef.current);
  });

  React.useEffect(() => {
    if (chartInstance.current && options) {
      chartInstance.current.setOption(options);
    }
  }, [options, chartInstance]);

  React.useEffect(() => {
    if (!chartInstance.current) {
      return;
    }
    if (mouseover) {
      chartInstance.current?.on("mouseover", mouseover);
    }
    if (mouseout) {
      chartInstance.current?.on("mouseout", mouseout);
    }
  });

  React.useEffect(() => {
    // 重新监听窗口变化
    if (!chartRef.current) {
      return;
    }
    addListener(chartRef.current, debounce(resize, 300));
    // 每次重新渲染时，销毁上次实例，取消事件监听
    return function cleanup() {
      if (chartRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        removeListener(chartRef.current, resize);
      }
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [resize, chartInstance]);
  return (
    <div
      className="chart-default"
      ref={chartRef}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
};
