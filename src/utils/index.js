import * as moment from "moment";
import { cloneDeep } from "lodash";
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
  const option = cloneDeep(TypeToOption[ChartType.RealTime]);

  option.series[0].name = name;
  data.times.map((item, index) => {
    option.xAxis.data.push(moment(item * 1000).format(FORMAT_STR));
    option.series[0].data.push(data.values[index]);
  });

  return option;
};

// 处理终端状态数据用于页面展示
export const parseTerminalData = (data) => {
  if (!data || data.length === 0) return {};

  let dailyrecvnumSum = 0;
  let dailyplatnumSum = 0;
  let dailyrptsecSum = 0;
  let minvoltSum = 0;

  data.map((item, _) => {
    dailyrecvnumSum += item.dailyrecvnum; // 当日收到上报数
    dailyplatnumSum += item.dailyplatnum; // 当日向省平台上报成功数
    dailyrptsecSum += item.dailyrptsec; // 当日的平均上报时间间隔
    minvoltSum += item.minvolt; // 最小电压
  });

  return {
    [EquipmentKey.reportVolumn]: Number(Number(dailyrecvnumSum / data.length).toFixed(2)),
    [EquipmentKey.reportDiff]: "???",
    [EquipmentKey.currentInterval]: "?????",
    [EquipmentKey.averageInterval]: Number(Number(dailyrptsecSum / data.length).toFixed(2)),
    [EquipmentKey.electricity]: Number(minvoltSum / data.length).toFixed(2),
    [EquipmentKey.reportSuccess]: Number(dailyplatnumSum / dailyrecvnumSum * 100).toFixed(2)+ "%"
  }
};