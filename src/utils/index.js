import * as moment from "moment";
import {
  Time,
  TypeToOption,
  ChartType,
  EquipmentKey,
  TAttr,
  TAttrItem,
  RAttr,
  RAttrItem,
} from "../components/const.tsx";
import lodash from "lodash";

const FORMAT_STR = "YYYY-MM-DD HH:mm:ss";

// 获取时间区间
export const getTimePeriod = (time) => {
  const m = moment();
  const now = m.format(FORMAT_STR);
  let ret = {
    startTime: "",
    endTime: now,
  };
  switch (time) {
    case Time.today:
      ret.startTime = m.format("YYYY-MM-DD 00:00:00");
      break;
    case Time.yesterday:
      ret.startTime = m.subtract(1, "days").startOf('day').format(FORMAT_STR);
      break;
    case Time.oneWeek:
      ret.startTime = m.subtract(7, "days").format(FORMAT_STR);
      break;
    case Time.oneMonth:
      ret.startTime = m.subtract(1, "months").format(FORMAT_STR);
      break;
    case Time.threeMonth:
      ret.startTime = m.subtract(3, "months").format(FORMAT_STR);
      break;
    case Time.oneYear:
      ret.startTime = m.subtract(1, "years").format(FORMAT_STR);
      break;
    case Time.halfYear:
      ret.startTime = m.subtract(0.5, "years").format(FORMAT_STR);
      break;
    default:
      ret.startTime = m.format("YYYY-MM-DD 00:00:00");
      break;
  }
  return ret;
};

// 获取气象走势曲线图的option
export const getRealTimeOption = (data, name) => {
  if (!data.times) return;
  const option = TypeToOption[ChartType.RealTime];

  let xData = [];
  let yData = [];
  data.times.forEach((item, index) => {
    xData.push(moment(item * 1000).format(FORMAT_STR));
    yData.push(data.values[index]);
  });
  option.series[0].name = name;
  option.xAxis.data = xData;
  option.series[0].data = yData;

  return { ...option };
};

// 处理某一个终端状态数据用于页面展示
export const parseTerminalData = (data) => {
  const len = data.length;
  const unit = "min";
  if (!data || len === 0) return {};

  let dailyrecvnumSum = 0;
  let dailyplatnumSum = 0;
  let dailyrptsecSum = 0;
  let avgvoltSum = 0;

  data.forEach((item, _) => {
    dailyrecvnumSum += item.dailyrecvnum; // 当日收到上报数
    dailyplatnumSum += item.dailyplatnum; // 当日向省平台上报成功数
    dailyrptsecSum += item.dailyrptsec; // 当日的平均上报时间间隔
    avgvoltSum += item.avgvolt; // 平均电压
  });

  return {
    [EquipmentKey.reportVolumn]: dailyrecvnumSum + "条",
    // 最近上报时间差: 昨天的dailyrptsec；若入参是“当天”的话，就返回当天的dailyrptsec；
    [EquipmentKey.reportDiff]:
      convertSecToMin(
        len > 1 ? data[len - 2].dailyrptsec : data[len - 1].dailyrptsec
      ) + unit,
    // 当前上报时间间隔: 当天的dailyrptsec；
    [EquipmentKey.currentInterval]:
      convertSecToMin(data[len - 1].dailyrptsec) + unit,
    // 平均上报时间间隔: 所有的dailyrptsec的平均值；
    [EquipmentKey.averageInterval]:
      convertSecToMin(dailyrptsecSum / len) + unit,
    [EquipmentKey.electricity]: Number(avgvoltSum).toFixed(2) + "v",
    [EquipmentKey.reportSuccess]:
      Number((dailyplatnumSum / dailyrecvnumSum) * 100).toFixed(2) + "%",
  };
};

export const convertSecToMin = (sec) => {
  return Math.floor(Number(sec) / 60);
};

// 获取终端管理-柱状图的option
export const getEquipOption = (data, type) => {
  if (!data.length) return;
  const option = lodash.cloneDeep(TypeToOption[ChartType.Equip]);

  let xData = [];
  let yData = [];
  let rate = 0;
  data.forEach((item, _) => {
    // xData.push(item.termid);
    xData.push(item.name);
    switch (Number(type)) {
      case TAttr.data:
        yData.push(item.recvsum); // 上报数据量
        break;
      case TAttr.battery:
        yData.push(item.voltavg); // 电量
        break;
      case TAttr.rate:
        rate = Number((item.platsum / item.recvsum) * 100).toFixed(2);
        yData.push(rate); // 省台率
        break;
      default:
        break;
    }
  });
  option.series[0].name = TAttrItem[type];
  option.xAxis.data = xData;
  option.series[0].data = yData;

  return { ...option };
};

// 获取气象参数曲线图的option
export const getDailyParamOption = (data, name) => {
  if (!data.length) return;
  const option = TypeToOption[ChartType.Statis];

  const xData = [];
  const yData = [];
  data.forEach((item, index) => {
    xData.push(moment(item.time).format("YYYY-MM-DD"));
  });
  option.xAxis.data = xData;
  yData.push(
    {
      name: "最小值",
      type: "line",
      emphasis: {
        focus: "series",
      },
      label: {
        show: true,
        position: "bottom",
      },
      data: data.map((ele) => ele.min),
    },
    {
      name: "平均值",
      type: "line",
      emphasis: {
        focus: "series",
      },
      data: data.map((ele) => ele.mean),
    },
    {
      name: "最大值",
      type: "line",
      emphasis: {
        focus: "series",
      },
      label: {
        show: true,
        position: "top",
      },

      data: data.map((ele) => ele.max),
    }
  );
  option.series = yData;
  option.tooltip = {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  };
  const newOption = { ...option, grid: { ...option.grid, top: "10px" } };
  return newOption;
};

// 获取日出日落图的option
export const getSunTimeOption = (sunTimeData, time) => {
  const option = TypeToOption[ChartType.SunTime](sunTimeData);
  option.series = [
    {
      type: "candlestick",
      data: sunTimeData.map((ele) => [
        ele.rise_5min,
        ele.set_5min,
        ele.rise_5min,
        ele.set_5min,
      ]),
      itemStyle: {
        color: "#5470c6",
        borderColor: "5470c6",
      },
    },
  ];
  option.xAxis.data = sunTimeData.map((ele) => ele.date);
  // let ySunRise = sunTimeData.map((ele) =>
  //   new Date(`${ele.date} ${ele.rise}`).getTime()
  // );
  // let ySunSet = sunTimeData.map((ele) =>
  //   new Date(`${ele.date} ${ele.set}`).getTime()
  // );

  // option.xAxis.data = sunTimeData.map((ele) => ele.date) || [];

  // option.series[0] = {
  //   name: "日出",
  //   data: ySunRise,
  //   yAxisIndex: 0,
  // };
  // option.series[1] = {
  //   name: "日落",
  //   data: ySunSet,
  //   yAxisIndex: 0,
  // };

  // option.series.forEach((item, _) => {
  //   item.type = "bar";
  // });
  // const getMinTime = (time) => {
  //   switch (time) {
  //     case Time.yesterday:
  //       return moment().subtract("2", "days");
  //     case Time.oneWeek:
  //       return moment().subtract("7", "days");
  //     case Time.oneMonth:
  //       return moment().subtract("30", "days");
  //     case Time.threeMonth:
  //       return moment().subtract("3", "months");
  //     default:
  //       return moment();
  //   }
  // };
  // option.yAxis.min = new Date(getMinTime(time)).getTime();

  return { ...option };
};

// 获取日总辐射等的柱状图option
export const getRadiationOption = (data, type) => {
  if (!data.length) return;
  const option = lodash.cloneDeep(TypeToOption[ChartType.Equip]);

  let xData = [];
  let yData = [];
  data.forEach((item, _) => {
    xData.push(item.time.split("T")[0]);
    switch (Number(type)) {
      case RAttr.dailyTotalRad:
        yData.push(item.dailyTotalRad); // 日总辐射
        option.yAxis.name = "w/m2/d";
       
        break;
      case RAttr.dailyAvgRad:
        yData.push(item.dailyAvgRad); // 日均辐射
        option.yAxis.name = "w/m2/h";
        break;
      case RAttr.peakHours:
        yData.push(item.peakHours); // 峰值日照时间
        option.yAxis.name = "时长";
        break;
      case RAttr.dli:
        yData.push(item.dli); // 光积分DLI
        option.yAxis.name = "mol/m2/d";
        break;
      default:
        break;
    }
  });
  option.series[0].name = RAttrItem[type];
  option.xAxis.data = xData;
  option.series[0].data = yData;
  option.grid.top = '10%'
 
  return { ...option };
};
