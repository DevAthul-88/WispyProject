import { combineReducers  } from "redux";
import {userReducer} from './auth/reducer'
import {orgReducer} from './org/reducer'


const rootReducer = combineReducers({
  auth: userReducer,
  org: orgReducer
});

export default rootReducer;
