import React from "react";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption, Time, TAttr, temids } from "./const.tsx";
import "./style.scss";
import { TimeComponent } from "./TimeComponent";
import "./TerminalManage.scss";
import { TerminalMenu } from "./TerminalMenu";
import { getTerminalStatus, getTerminalHis } from "../api/api";
import { getTimePeriod, getEquipOption } from "../utils";
import { connect } from "react-redux";
import {
  selectTerminalId,
  terminalChangeTime,
  terminalIdToName,
} from "../store/actions/terminal";

// 终端管理
const TerminalManageCom = ({
  terminal,
  changeTime,
  terminalIdToName,
  selectTerminalId,
}) => {
  const [onlineNum, setOnlineNum] = React.useState(0); // 终端在线个数
  const [offlineNum, setOfflineNum] = React.useState(0); // 终端离线个数
  // const [period, setPeriod] = React.useState(Time.today); // 时间
  const [attri, setAttri] = React.useState(TAttr.data + ""); // 菜单
  const defaultOptions = TypeToOption[ChartType.Equip];
  const [options, setOptions] = React.useState(defaultOptions);
  const termStsList = React.useRef([]); // 暂存所有的终端数据

  const onMenuChange = (menu) => {
    setAttri(menu.key);
  };

  // 组件刚挂载时
  React.useEffect(() => {
    // 获取终端在线、离线个数
    getTerminalStatus({
      term_lst: temids,
    }).then((res) => {
      setOnlineNum(res.onnum);
      setOfflineNum(res.offnum);
    });
  }, []);

  // 时间组件改变时
  React.useEffect(() => {
    const { startTime, endTime } = getTimePeriod(terminal.time); // period
    // 下发请求
    getTerminalHis({
      term_lst: temids,
      start_time: startTime,
      end_time: endTime,
    }).then((res) => {
      const obj = {};
      res.forEach((ele) => {
        obj[ele.name] = ele.termid;
      });
      terminalIdToName(obj);
      // 重绘chart
      termStsList.current = res;
      setOptions(getEquipOption(termStsList.current, attri));
    });
  }, [attri, terminal.time, terminalIdToName]);

  // 菜单组件改变时
  React.useEffect(() => {
    // 重绘chart
    setOptions(getEquipOption(termStsList.current, attri));
  }, [attri]);

  const renderChart = React.useMemo(() => {
    return (
      <ChartComponent
        type={ChartType.RealTime}
        style={{ marginTop: "10px" }}
        options={options}
        mouseover={(item) => {
          const { name } = item;
          const terminalId = terminal.idToName[name];
          selectTerminalId(terminalId);
        }}
        mouseout={() => selectTerminalId(0)}
      />
    );
  }, [options, selectTerminalId, terminal.idToName]);
  return (
    <div className="terminal-manage">
      <div className="content-title">
        终端在线：<span>{onlineNum}个</span>，离线：<span>{offlineNum}个</span>
      </div>
      <div className="content">
        <div className="chart-part">
          <TerminalMenu activeKey={attri} onChange={onMenuChange} />
          <div className="condition-realtime-echart">{renderChart}</div>
        </div>
        <div className="time-part">
          <TimeComponent
            activeKey={terminal.time}
            onChange={(e) => {
              changeTime(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const TerminalManage = connect(
  (state) => ({ terminal: state.terminal }),
  {
    changeTime: terminalChangeTime,
    terminalIdToName: terminalIdToName,
    selectTerminalId: selectTerminalId,
  }
)(TerminalManageCom);
