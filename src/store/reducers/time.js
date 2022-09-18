import { Time } from "../../components/const.ts";
import { CHANGE_TIME } from "../const";

// 初始化state
const initState = Time.oneWeek;
export default function reducer(state = initState, action) {
  const {type, data} = action;
  switch (type) {
    case CHANGE_TIME:
      return data;
    default:
      return state;
  }
}