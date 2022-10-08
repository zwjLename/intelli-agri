import {combineReducers} from "redux";
import time from "./time";
import mapData from "./map";
import menu from "./menu";

// 整合reducers
export default combineReducers({time, mapData, menu});