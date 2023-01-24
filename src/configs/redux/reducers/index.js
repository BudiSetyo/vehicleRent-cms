import { combineReducers } from "redux";
import userReducers from "./user";

const reducers = {
  user: userReducers,
};

export default combineReducers(reducers);
