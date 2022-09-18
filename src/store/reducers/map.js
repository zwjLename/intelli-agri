import { handleActions as createReducer } from "redux-actions";
import { termToCell } from "../../components/const.ts";
import { current_point } from "../actions/map";

const initState = {
  termid: 0,
  cellid: 0,
};
const mapReducer = createReducer(
  {
    [current_point]: (state, action) => ({...action.payload}),
  },
  initState
);
export default mapReducer;
