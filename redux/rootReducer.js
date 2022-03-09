import { combineReducers  } from "redux";
import {userReducer} from './auth/reducer'


const rootReducer = combineReducers({
  auth: userReducer
});

export default rootReducer;
