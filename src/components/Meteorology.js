import { connect } from "react-redux";
import { TimeComponent } from "./TimeComponent";
import { changeTime } from "../store/actions/time";
import { MeteorologyMenu } from "./MeteorologyMenu";
import { RealTime } from "./RealTime";
import { DailyParam } from "./DailyParam";

import "./Meteorology.scss";

// 气象走势
const MeteorologyUI = ({
  time,
  changeTime
}) => {
  return (
    <div className="meteorology">
      <div className="content-title">气象走势</div>
      <div className="detail">
        <div className="left">
          <TimeComponent
            activeKey={time}
            onChange={e => {
              changeTime(e);
            }}
          />
        </div>
        <div className="right">
          {/* 气象走势“温湿光雨风” */}
          <div className="menu"><MeteorologyMenu /></div>
          {/* 气象走势echarts图 */}
          <div className="realtime"><RealTime /></div>
          {/* 每日气象统计 */}
          <div className="daily-param"><DailyParam /></div>
        </div>
      </div>
    </div>
  );
};
export const Meteorology = connect(
  state => ({time: state.time}),
  {changeTime}
)(MeteorologyUI);
