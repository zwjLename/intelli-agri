import { connect } from "react-redux";
import { TimeComponent } from "./TimeComponent";
import { RealTime } from "./RealTime";
import { changeTime } from "../store/actions/time";

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
        <div className="weather">
          <TimeComponent
            activeKey={time}
            onChange={e => {
              changeTime(e);
            }}
          />
        </div>
        <div className="realtime"><RealTime /></div>
      </div>
    </div>
  );
};
export const Meteorology = connect(
  state => ({time: state.time}),
  {changeTime}
)(MeteorologyUI);
