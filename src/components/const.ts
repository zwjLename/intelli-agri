export enum WeatherKey {
  rainfall,
  sunshineTime,
  sunshineHour,
  sunshinePeakTime,
  dayLightDLI,
}
export const WeatherItem = {
  [WeatherKey.rainfall]: "降雨量",
  [WeatherKey.sunshineTime]: "日照时间",
  [WeatherKey.sunshineHour]: "日照时数",
  [WeatherKey.sunshinePeakTime]: "峰值日照时间",
  [WeatherKey.dayLightDLI]: "日光积分DLI",
};

export enum Attr {
  warm,
  wet,
  light,
  rain,
  wind,
}
export const AttrItem = {
  [Attr.warm]: "温",
  [Attr.wet]: "湿",
  [Attr.light]: "光",
  [Attr.rain]: "雨",
  [Attr.wind]: "风",
};

export enum Time {
  threeDay,
  oneMonth,
  threeMonth,
}
export const TimeItem = {
  [Time.threeDay]: "近三天",
  [Time.oneMonth]: "近一月",
  [Time.threeMonth]: "近三月",
};

export enum EquipmentKey {
  reportVolumn,
  reportDiff,
  currentInterval,
  averageInterval,
  reportSuccess,
  electricity,
}
export const EquipmentItem = {
  [EquipmentKey.reportVolumn]: "上报数据量",
  [EquipmentKey.reportDiff]: "最近上报时间差",
  [EquipmentKey.currentInterval]: "当前上报时间间隔",
  [EquipmentKey.averageInterval]: "平均上报时间间隔",
  [EquipmentKey.reportSuccess]: "上报成功率",
  [EquipmentKey.electricity]: "电量",
};

export enum ChartType {
  RealTime = "realtime", // 实时
  History = "history", // 历史
  Equip = "equip", // 今日设备
  Statis = "statistics", //今日数据统计
}
const axisCommonOptions = {
  axisLine: {
    show: true,
    symbol: ["none", "arrow"],
  },
  axisTick: {
    show: true,
  },
};
export const RealTimeOption = {
  tooltip: {
    trigger: "axis",
  },
  grid: {
    top: "2%",
    left: "3%",
    right: "4%",
    bottom: "6%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    ...axisCommonOptions,
    data: ["2022-01", "2022-02", "2022-03", "2022-04", "2022-05", "2022-06"], // date
  },
  yAxis: {
    type: "value",
    ...axisCommonOptions,
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#6e7079",
      },
    },
  },
  series: [
    {
      name: AttrItem[Attr.warm], // name
      type: "line",
      stack: "Total",
      smooth: true,
      data: [120, 132, 101, 134, 90, 230, 210], // data
      itemStyle: {
        normal: {
          color: "#28b9d2",
          lineStyle: {
            color: "#28b9d2",
          },
        },
      },
    },
  ],
};
export const HistoryOption = {
  tooltip: {
    trigger: "axis",
  },
  grid: {
    top: "2%",
    left: "3%",
    right: "4%",
    bottom: "6%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    ...axisCommonOptions,
    data: ["2022-01", "2022-02", "2022-03", "2022-04", "2022-05", "2022-06"], // date
  },
  yAxis: {
    type: "value",
    ...axisCommonOptions,
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#6e7079",
      },
    },
  },
  series: [
    {
      name: "最高",
      type: "line",
      smooth: true,
      data: [120, 132, 101, 134, 90, 230, 210], // data
      itemStyle: {
        normal: {
          color: "#28b9d2",
          lineStyle: {
            color: "#28b9d2",
          },
        },
      },
    },
    {
      name: "最低",
      type: "line",
      smooth: true,
      data: [20, 32, 10, 14, 9, 30, 10], // data
      itemStyle: {
        normal: {
          color: "#7465f4",
          lineStyle: {
            color: "#7465f4",
          },
        },
      },
    },
  ],
};
export const EquipOption = {
  tooltip: {
    trigger: "axis",
  },
  grid: {
    top: "2%",
    left: "3%",
    right: "4%",
    bottom: "6%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    ...axisCommonOptions,
    data: ["2022-01", "2022-02", "2022-03", "2022-04", "2022-05", "2022-06"], // date
  },
  yAxis: {
    type: "value",
    ...axisCommonOptions,
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#6e7079",
      },
    },
  },
  series: [
    {
      type: "bar",
      data: [23, 24, 18, 25, 27, 28, 25],
    },
  ],
};

/**    今日数据统计图 */
function splitData(rawData) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i][0]);
    rawData[i][0] = i;
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values,
  };
}
function renderItem(params, api) {
  console.log(
    api.value(0),
    api.value(1),
    api.value(2),
    api.value(3),
    api.value(4)
  );
  var xValue = api.value(0);
  var highPoint = api.coord([xValue, api.value(1)]);
  var curPoint = api.coord([xValue, api.value(2)]);
  var lowPoint = api.coord([xValue, api.value(3)]);
  var halfWidth = api.size([1, 0])[0] * 0.35;
  var style = api.style({
    stroke: api.visual("color"),
  });
  return {
    type: "group",
    children: [
      {
        type: "line",
        shape: {
          x1: lowPoint[0],
          y1: lowPoint[1],
          x2: highPoint[0],
          y2: highPoint[1],
        },
        style: style,
      },
      {
        type: "line",
        shape: {
          x1: highPoint[0],
          y1: highPoint[1],
          x2: highPoint[0] - halfWidth,
          y2: highPoint[1],
        },
        style: style,
      },
      {
        type: "line",
        shape: {
          x1: curPoint[0],
          y1: curPoint[1],
          x2: curPoint[0] - halfWidth / 2,
          y2: curPoint[1],
        },
        style: style,
      },
      {
        type: "line",
        shape: {
          x1: curPoint[0],
          y1: curPoint[1],
          x2: curPoint[0] + halfWidth / 2,
          y2: curPoint[1],
        },
        style: style,
      },
      {
        type: "line",
        shape: {
          x1: lowPoint[0],
          y1: lowPoint[1],
          x2: lowPoint[0] + halfWidth,
          y2: lowPoint[1],
        },
        style: style,
      },
    ],
  };
}
const rawData = [
  ["设备1", 10452.74, 10409.85, 10367.41],
  ["设备2", 10611.85, 10544.07, 10411.85],
  ["设备3", 10543.85, 10538.66, 10454.37],
  ["设备4", 10535.46, 10529.03, 10432],
];
var data = splitData(rawData);
export const StatisticsOption = {
  animation: false,
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
  },
  grid: {
    top: "2%",
    left: "3%",
    right: "4%",
    bottom: "6%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: data.categoryData,
      splitLine: { show: false },
      min: "dataMin",
      max: "dataMax",
    },
  ],
  yAxis: {
    type: "value",
    scale: true,
    ...axisCommonOptions,
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#6e7079",
      },
    },
  },
  series: [
    {
      name: "数据",
      type: "custom",
      renderItem: renderItem,
      dimensions: ["", "lowest", "middle", "highest"],
      encode: {
        x: 0,
        y: [1, 2, 3],
        tooltip: [1, 2, 3],
      },
      data: data.values,
    },
  ],
};
export const TypeToOption = {
  [ChartType.RealTime]: RealTimeOption,
  [ChartType.History]: HistoryOption,
  [ChartType.Equip]: EquipOption,
  [ChartType.Statis]: StatisticsOption,
};
