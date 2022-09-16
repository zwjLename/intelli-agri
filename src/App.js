import React from "react";
import "./App.scss";
import 'antd/dist/antd.css';

import hightLight from "./imgs/light.png";
import target from "./imgs/target.png";
import moment from "moment";
import { Meteorology } from "./components/Meteorology";
import { FarmTime } from "./components/FarmTime";
import { MapComponent } from "./components/MapComponent";
import { TerminalManage } from "./components/TerminalManage";
import { TerminalData } from "./components/TerminalData";

const WEEK = ['星期日','星期一', '星期二', '星期三', '星期四','星期五','星期六']
function App() {
  return (
    <>
      <header>
        <div className="left">
          <div className="prefix-holder">
            <div className="header-pic-left"></div>
          </div>
          <div className="slash-holder"></div>
        </div>
        <div className="content flex-column">
          <div className="title">
            <div className="title-word"></div>
            <div className="title-word"></div>
            <div className="title-word"></div>
            <div className="title-word"></div>
            <div className="title-word"></div>
            <div className="title-word"></div>
            <div className="title-word"></div>
            <div className="title-word"></div>
          </div>
          <div className="subtitle">
            <img src={target} className="ml10" />
            <div className="ml10">INTELLTGENT</div>
            <div className="ml20">JIANGNING</div>
            <div className="ml20">PRODUCT</div>
          </div>
          {/*  */}
        </div>

        <div className="right">
          <div className="slash-holder"></div>
          <div className="prefix-holder">
            <div className="header-pic-right"></div>
          </div>
        </div>
      </header>
      <img src={hightLight} className="hight-light" />
      <div className="main-content">
        <div className="left">
          <div className="title">
            <div className="word">智慧水产</div>
            <div className="word">智慧乡村</div>
            <div className="word">农业电商</div>
            <div className="word">智慧农安</div>
          </div>
          <div className="flex-column main mt10">
            <div className="flex left-main-top">
              <Meteorology />
            </div>
            <div className="left-main-bottom">
              <FarmTime />
            </div>
          </div>
        </div>
        <div className="left-slash-holder"></div>
        <div className="map">
          <div className="map-content mt20">
            <MapComponent />
          </div>
        </div>
        <div className="right-slash-holder"></div>
        <div className="right">
          <div className="title">
            <div className="word">智慧水产</div>
            <div className="word">智慧乡村</div>
            <div className="word">农业电商</div>
            <div className="word">智慧农安</div>
          </div>
          <div className="flex-column main mt10">
            <div className="main-top ">
            {/* <ConditionRealTime /> */}
              <TerminalManage />
            </div>
            <div className="main-part-bottom">
              {/* <TodayStatistics /> */}
              <TerminalData />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex">
        <div className="left">
          <div className="line"></div>
        </div>
        <div className="left-slash-holder"></div>
        <div className="map flex flex-center">
          <div>{moment().format("YYYY-MM-DD")}</div>
          <div className="ml10">{WEEK[moment().weekday()]}</div>
          <div className="ml10">{moment().format("HH:mm")}</div>
        </div>
        <div className="right-slash-holder"></div>
        <div className="right"><div className="line"></div></div>
      </footer>
    </>
  );
}

export default App;
