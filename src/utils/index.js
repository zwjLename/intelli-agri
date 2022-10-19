import * as moment from "moment";
import { Time,
  TypeToOption,
  ChartType,
  EquipmentKey,
  TAttr,
  TAttrItem,
  RAttr,
  RAttrItem,
} from "../components/const.ts";

const FORMAT_STR = "YYYY-MM-DD HH:mm:ss";

// 获取时间区间
export const getTimePeriod = (time) => {
  const m = moment();
  const now = m.format(FORMAT_STR);
  let ret = {
    startTime: "",
    endTime: now
  };
  switch (time) {
    case Time.today:
      ret.startTime = m.format("YYYY-MM-DD 00:00:00");
      break;
    case Time.yesterday:
      ret.startTime = m.subtract(1, 'days').format(FORMAT_STR);
      break;
    case Time.oneWeek:
      ret.startTime = m.subtract(7, 'days').format(FORMAT_STR);
      break;
    case Time.oneMonth:
      ret.startTime = m.subtract(1, 'months').format(FORMAT_STR);
      break;
    case Time.threeMonth:
      ret.startTime = m.subtract(3, 'months').format(FORMAT_STR);
      break;
    case Time.oneYear:
      ret.startTime = m.subtract(1, 'years').format(FORMAT_STR);
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

  return {...option};
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
          len > 1 ?
          data[len - 2].dailyrptsec :
          data[len - 1].dailyrptsec
      ) + unit,
    // 当前上报时间间隔: 当天的dailyrptsec；
    [EquipmentKey.currentInterval]: convertSecToMin(data[len - 1].dailyrptsec) + unit,
    // 平均上报时间间隔: 所有的dailyrptsec的平均值；
    [EquipmentKey.averageInterval]: convertSecToMin(dailyrptsecSum / len) + unit,
    [EquipmentKey.electricity]: Number(avgvoltSum).toFixed(2) + "v",
    [EquipmentKey.reportSuccess]: Number(dailyplatnumSum / dailyrecvnumSum * 100).toFixed(2)+ "%"
  }
};

export const convertSecToMin = (sec) => {
  return Math.floor((Number(sec) / 60));
};

// 获取终端管理-柱状图的option
export const getEquipOption = (data, type) => {
  if (!data.length) return;
  const option = TypeToOption[ChartType.Equip];

  let xData = [];
  let yData = [];
  let rate = 0;
  data.forEach((item, _) => {
    // xData.push(item.termid);
    xData.push(item.name)
    switch (Number(type)) {
      case TAttr.data:
        yData.push(item.recvsum); // 上报数据量
        break;
      case TAttr.battery:
        yData.push(item.voltavg); // 电量
        break;
      case TAttr.rate:
        rate = Number(item.platsum / item.recvsum * 100).toFixed(2);
        yData.push(rate); // 省台率
        break;
      default:
        break;
    }
  });
  option.series[0].name = TAttrItem[type];
  option.xAxis.data = xData;
  option.series[0].data = yData;

  return {...option};
};

// 获取气象参数曲线图的option
export const getDailyParamOption = (data, name) => {
  if (!data.length) return;
  const option = TypeToOption[ChartType.Statis];

  let xData = [];
  let yData = [];
  data.forEach((item, index) => {
    xData.push(moment(item.time).format(FORMAT_STR));
    yData.push([index, item.max, item.mean, item.min]);
  });
  option.xAxis.data = xData;
  option.series[0].name = name;
  option.series[0].data = yData;

  return {...option};
};

const getDailySunTimeData = (sunTimeData, date) => {
  // let ret = {};
  // sunTimeData.filter(item => {
  //   if (item.date === date) {
  //     ret = item;
  //   }
  // });
  // return ret;
  return sunTimeData.find(item => item.date === date);
};

// 获取日出日落图的option
export const getSunTimeOption = (sunTimeData, illuIntgeData) => {
  if (!illuIntgeData.length) return;
  const option = TypeToOption[ChartType.SunTime];

  let xData = [];
  let ySunRise = [];
  let ySunSet = [];
  let yDailyTotalRad = [];
  let yDailyAvgRadDate = [];
  let yPeakHours = [];
  let yDli = [];
  // illuIntgeData比sunTimeData长度要长
  illuIntgeData.forEach((item, index) => {
    let date = item.time.split("T")[0];
    xData.push(date);

    const dailySunTime = getDailySunTimeData(sunTimeData, date);

    const ysunRiseData = moment(dailySunTime?.date + "T" + dailySunTime?.rise);
    const ysunSetData = moment(dailySunTime?.date + "T" + dailySunTime?.set);

    // 日出（小时）
    ySunRise.push(ysunRiseData.isValid() ? ysunRiseData.valueOf() : 0);
    // ySunRise.push(moment(dailySunTime.date + "T" + dailySunTime.rise).valueOf() / 1000 / 60 / 60);

    // 日落（小时）
    ySunSet.push(ysunSetData.isValid() ? ysunSetData.valueOf() : 0);
    // ySunSet.push(moment(dailySunTime.date + "T" + dailySunTime.set).valueOf() / 1000 / 60 / 60);
    // 日总辐射
    yDailyTotalRad.push(item.dailyTotalRad);
    // 日均辐射
    yDailyAvgRadDate.push(item.dailyAvgRad);
    // 峰值日照时间
    yPeakHours.push(item.peakHours);
    // 光积分DLI
    yDli.push(item.dli);

  });

  option.xAxis.data = xData;

  option.series[0] = {
    name: "日出",
    data: ySunRise,
    yAxisIndex: 0,
  };
  console.log('%c [ ySunRise ]-201', 'font-size:13px; background:pink; color:#bf2c9f;', ySunRise)
  option.series[1] = {
    name: "日落",
    data: ySunSet,
    yAxisIndex: 0,
  };
  console.log('%c [ ySunSet ]-207', 'font-size:13px; background:pink; color:#bf2c9f;', ySunSet)
  option.series[2] = {
    name: "日总辐射",
    data: yDailyTotalRad,
    yAxisIndex: 1,
  };
  option.series[3] = {
    name: "日均辐射",
    data: yDailyAvgRadDate,
    yAxisIndex:2
  };
  option.series[4] = {
    name: "峰值日照时间",
    data: yPeakHours,
    yAxisIndex: 0,
  };
  option.series[5] = {
    name: "光积分DLI",
    data: yDli,
    yAxisIndex: 3
  };
  console.log('%c [ yDli ]-201', 'font-size:13px; background:pink; color:#bf2c9f;', yDli)
  option.series.forEach((item, _) => {

    item.type = "bar";
  });

  return {...option};
};

// 获取日总辐射等的柱状图option
export const getRadiationOption = (data, type) => {
  if (!data.length) return;
  const option = TypeToOption[ChartType.Equip];

  let xData = [];
  let yData = [];
  data.forEach((item, _) => {
    xData.push(item.time.split("T")[0])
    switch (Number(type)) {
      case RAttr.dailyTotalRad:
        yData.push(item.dailyTotalRad); // 日总辐射
        break;
      case RAttr.dailyAvgRad:
        yData.push(item.dailyAvgRad); // 日均辐射
        break;
      case RAttr.peakHours:
        yData.push(item.peakHours); // 峰值日照时间
        break;
      case RAttr.dli:
        yData.push(item.dli); // 光积分DLI
        break;
      default:
        break;
    }
  });
  option.series[0].name = RAttrItem[type];
  option.xAxis.data = xData;
  option.series[0].data = yData;

  return {...option};
};