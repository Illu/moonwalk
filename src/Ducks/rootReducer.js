import { combineReducers } from "redux";
import launches from "./launches";
import search from "./search";

export default combineReducers({
  launches,
  search
});
