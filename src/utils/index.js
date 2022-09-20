import * as moment from "moment";
import { Time, TypeToOption, ChartType, EquipmentKey } from "../components/const.ts";

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

// 处理终端状态数据用于页面展示
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