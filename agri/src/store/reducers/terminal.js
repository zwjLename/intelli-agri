import { handleActions as createReducer } from "redux-actions";
import { Time } from "../../components/const.tsx";
// import { CHANGE_TIME } from "../const";
import { selectTerminalId, terminalChangeTime, terminalIdToName } from "../actions/terminal";

// 初始化state
const initState = {
    time: Time.yesterday,
    idToName: {},
    terminalId: 0 
};
export default createReducer({
  [terminalChangeTime]: (state, action) => ({ ...state, time: action.payload }),
  [terminalIdToName]: (state, action) => ({ ...state, idToName: action.payload }),
  [selectTerminalId]: (state, action) => ({ ...state, terminalId: action.payload }),
}, initState);