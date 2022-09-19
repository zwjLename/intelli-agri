import * as moment from "moment";
import { cloneDeep } from "lodash";
import { Time, TypeToOption, ChartType } from "../components/const.ts";

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