import { handleActions as createReducer } from "redux-actions";
import { Time } from "../../components/const.tsx";
// import { CHANGE_TIME } from "../const";
import { changeTime } from "../actions/time";

// 初始化state
// const initState = Time.today;
const initState = Time.yesterday;
// export default function reducer(state = initState, action) {
//   const {type, data} = action;
//   switch (type) {
//     case CHANGE_TIME:
//       return data;
//     default:
//       return state;
//   }
// }
export default createReducer({
  [changeTime]: (state, action) => action.payload
}, initState);