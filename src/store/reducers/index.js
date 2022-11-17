import {combineReducers} from "redux";
// import time from "./time";
import mapData from "./map";
import menu from "./menu";
import terminal from "./terminal";

// 整合reducers
export default combineReducers({ mapData, menu, terminal}); // time