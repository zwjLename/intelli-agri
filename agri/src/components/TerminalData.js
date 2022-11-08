import React from "react";
import { TodayEquipmentComponent } from "./TodayEquipmentComponent";
import "./TerminalData.scss";
import { connect } from "react-redux";

// 终端数据
const TerminalDataUI = ({ terminal }) => {

  return (
    <div className="terminal-data ">
      <div className="content-title">终端状态数据</div>
      <div className="content-list">
        <div className="chart-part statistics-echart-com">
          <TodayEquipmentComponent
            time={terminal.time}
            termid={terminal.terminalId }
          />
        </div>
      </div>
    </div>
  );
};

export const TerminalData = connect((state) => ({ terminal: state.terminal }))(
  TerminalDataUI
);
