import { combineReducers  } from "redux";
import {userReducer} from './auth/reducer'
import {orgReducer} from './org/reducer'
import {empReducer} from './employee/reducer'

const rootReducer = combineReducers({
  auth: userReducer,
  org: orgReducer,
  emp: empReducer
});

export default rootReducer;
