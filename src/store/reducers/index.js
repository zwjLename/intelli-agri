import {combineReducers} from "redux";
import time from "./time";
import mapData from "./map"

// 整合reducers
export default combineReducers({time, mapData});