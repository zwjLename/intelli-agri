import { handleActions as createReducer } from "redux-actions";
// import { termToCell } from "../../components/const.tsx";
import { current_point } from "../actions/map";

const initState = {
  termid: 237,
  cellid: 97,
};
const mapReducer = createReducer(
  {
    [current_point]: (state, action) => ({...action.payload}),
  },
  initState
);
export default mapReducer;
