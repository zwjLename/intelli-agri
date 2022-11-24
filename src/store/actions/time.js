import { createAction } from "redux-actions";
import { CHANGE_TIME } from "../const";

// export const changeTime = (time) => ({type: CHANGE_TIME, data: time});
export const changeTime = createAction(CHANGE_TIME);
