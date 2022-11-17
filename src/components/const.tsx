import moment from "moment";
import ReactDOMServer from "react-dom/server";
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

// 下发的参数
export const AttrParam = {
  [Attr.warm]: "temp",
  [Attr.wet]: "humi",
  [Attr.light]: "illu",
  [Attr.rain]: "rain15Min",
  [Attr.wind]: "windspeed",
};

export enum TAttr {
  data,
  battery,
  rate,
}
export const TAttrItem = {
  [TAttr.data]: "数据量",
  [TAttr.battery]: "电量",
  [TAttr.rate]: "省台率",
};

export enum RAttr {
  sunset,
  dailyTotalRad,
  dailyAvgRad,
  peakHours,
  dli,
}
export const RAttrItem = {
  [RAttr.sunset]: "日出日落时间",
  [RAttr.dailyTotalRad]: "日总辐射",
  [RAttr.dailyAvgRad]: "时均辐射",
  [RAttr.peakHours]: "峰值日照时间",
  [RAttr.dli]: "光积分DLI",
};

export enum Time {
  // today,
  yesterday,
  oneWeek,
  oneMonth,
  threeMonth,
  halfYear,
}
export const TimeItem = {
  // [Time.today]: "当天",
  [Time.yesterday]: "昨天",
  [Time.oneWeek]: "近7天",
  [Time.oneMonth]: "近1月",
  [Time.threeMonth]: "近3月",
  [Time.halfYear]: "近半年",
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
  [EquipmentKey.reportSuccess]: "省台成功率",
  [EquipmentKey.electricity]: "电量",
};

export enum ChartType {
  RealTime = "realtime", // 实时
  History = "history", // 历史
  Equip = "equip", // 今日设备
  Statis = "statistics", //今日数据统计
  SunTime = "suntime", //日出日落
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
    data: [], // data
    axisLabel: {
      formatter: (value, index) => {
        // 横坐标折行显示
        const vAttr = value.split(" ");
        return vAttr[0].replaceAll("-", "") + "\n" + vAttr[1];
      },
    },
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
      data: [], // data
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
    data: [], // data
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
      data: [], // data
    },
  ],
};
interface SunTimeData {
  date: string;
  rise: string;
  rise_5min: number;
  set: string;
  set_5min: number;
  suntime: number;
}
export const SunTimeOption = (
  allData: Array<SunTimeData>
) => {
  return {
    tooltip: {
      trigger: "axis",
      formatter: (value) => {
        
        const { axisValue, color } = value[0];
        const { rise, set } = allData.find(ele => ele.date === axisValue) || {};
        const com = (
          <div>
            <p>{axisValue}</p>
            <div>
              <span
                style={{
                  display: "inline-block",
                  marginRight: "4px",
                  borderRadius: "10px",
                  width: "10px",
                  height: "10px",
                  background: `${color}`,
                }}
              />
              <span>日出: {`${axisValue} ${rise}`}</span>
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  marginRight: "4px",
                  borderRadius: "10px",
                  width: "10px",
                  height: "10px",
                  background: `${color}`,
                }}
              />
              <span>日落: {`${axisValue} ${set}`}</span>
            </div>
          </div>
        );
        return ReactDOMServer.renderToString(com);
      },
    },
    grid: {
      top: "2%",
      left: "3%",
      right: "4%",
      bottom: "6%",
      containLabel: true,
    },
    xAxis: {
      // type: "category",
      // ...axisCommonOptions,
      data: [], // data
    },
    yAxis: {
      type: "value",
      name: "时间",
      position: "left",
      ...axisCommonOptions,
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#6e7079",
        },
      },
      axisLabel: {
        formatter: (value) => {
          return `${moment().startOf('day').add(value*5, 'm').format("HH:mm:ss")}`;
        },
      },
    },
  };
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
  tooltip: {
    trigger: "itemStyle",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: [
    {
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
  ],
};
export const StatisticsOption_Old = {
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
  xAxis: {
    type: "category",
    data: data.categoryData, // 修改数据
    splitLine: { show: false },
    min: "dataMin",
    max: "dataMax",
    axisLabel: {
      formatter: (value, index) => {
        // 横坐标折行显示
        const vAttr = value.split(" ");
        return vAttr[0];
      },
    },
  },
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
      dimensions: ["", "最高", "平均", "最低"],
      encode: {
        x: 0,
        y: [1, 2, 3],
        tooltip: [1, 2, 3],
      },
      data: data.values, // 修改数据
    },
  ],
};
export const TypeToOption = {
  [ChartType.RealTime]: RealTimeOption,
  [ChartType.History]: HistoryOption,
  [ChartType.Equip]: EquipOption,
  [ChartType.Statis]: StatisticsOption,
  [ChartType.SunTime]: (data) => SunTimeOption(data),
};

export const cell_ids =
  "84,85,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124";
export const temids =
  "225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264";

export const cellToTem = {
  "84": "225",
  "85": "226",
  "87": "227",
  "88": "228",
  "89": "229",
  "90": "230",
  "91": "231",
  "92": "232",
  "93": "233",
  "94": "234",
  "95": "235",
  "96": "236",
  "97": "237",
  "98": "238",
  "99": "239",
  "100": "240",
  "101": "241",
  "102": "242",
  "103": "243",
  "104": "244",
  "105": "245",
  "106": "246",
  "107": "247",
  "108": "248",
  "109": "249",
  "110": "250",
  "111": "251",
  "112": "252",
  "113": "253",
  "114": "254",
  "115": "255",
  "116": "256",
  "117": "257",
  "118": "258",
  "119": "259",
  "120": "260",
  "121": "261",
  "122": "262",
  "123": "263",
  "124": "264",
};

export const termToCell = {
  "225": "84",
  "226": "85",
  "227": "87",
  "228": "88",
  "229": "89",
  "230": "90",
  "231": "91",
  "232": "92",
  "233": "93",
  "234": "94",
  "235": "95",
  "236": "96",
  "237": "97",
  "238": "98",
  "239": "99",
  "240": "100",
  "241": "101",
  "242": "102",
  "243": "103",
  "244": "104",
  "245": "105",
  "246": "106",
  "247": "107",
  "248": "108",
  "249": "109",
  "250": "110",
  "251": "111",
  "252": "112",
  "253": "113",
  "254": "114",
  "255": "115",
  "256": "116",
  "257": "117",
  "258": "118",
  "259": "119",
  "260": "120",
  "261": "121",
  "262": "122",
  "263": "123",
  "264": "124",
};
