import { createAction } from "redux-actions";
import { CHANGE_TERMINAL_TIME, TERMINAL_ID, TERMINAL_NAME } from "../const";

// export const changeTime = (time) => ({type: CHANGE_TIME, data: time});
export const terminalChangeTime = createAction(CHANGE_TERMINAL_TIME);

export const terminalIdToName = createAction(TERMINAL_NAME);

export const selectTerminalId = createAction(TERMINAL_ID);