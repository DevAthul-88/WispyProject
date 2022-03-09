import { combineReducers } from "redux";

const user = localStorage.getItem("soft_user")
  ? JSON.parse(localStorage.getItem("soft_user"))
  : null;

const rootReducer = combineReducers({
  userInfo: user,
});

export default rootReducer;
