import { handleActions as createReducer } from "redux-actions";
import { Attr } from "../../components/const.tsx";
import { changeMenu } from "../actions/menu";

// 初始化state
const initState = Attr.warm;
export default createReducer({
  [changeMenu]: (state, action) => action.payload
}, initState);