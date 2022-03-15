import { combineReducers } from "redux";
import { userReducer } from "./auth/reducer";
import { orgReducer } from "./org/reducer";
import { empReducer } from "./employee/reducer";
import { projectReducer } from "./Project/reducer";

const rootReducer = combineReducers({
  auth: userReducer,
  org: orgReducer,
  emp: empReducer,
  project: projectReducer,
});

export default rootReducer;
