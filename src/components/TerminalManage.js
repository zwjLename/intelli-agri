import React from "react";
import { ChartComponent } from "./ChartComponent";
import { ChartType, TypeToOption, TAttr, temids } from "./const.tsx";
import "./style.scss";
import { TimeComponent } from "./TimeComponent";
import "./TerminalManage.scss";
import { TerminalMenu } from "./TerminalMenu";
import { getTerminalHis } from "../api/api";
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
  // const [period, setPeriod] = React.useState(Time.today); // 时间
  const [attri, setAttri] = React.useState(TAttr.data + ""); // 菜单
  const defaultOptions = TypeToOption[ChartType.Equip];
  const [options, setOptions] = React.useState(defaultOptions);
  const termStsList = React.useRef([]); // 暂存所有的终端数据

  const onMenuChange = (menu) => {
    setAttri(menu.key);
  };

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
      <div className="time-part">
        <TimeComponent
          className="time-com"
          activeKey={terminal.time}
          onChange={(e) => {
            changeTime(e);
          }}
        />
      </div>
      <div className="chart-part mt10">
        <TerminalMenu activeKey={attri} onChange={onMenuChange} />
        <div className="condition-realtime-echart">{renderChart}</div>
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
