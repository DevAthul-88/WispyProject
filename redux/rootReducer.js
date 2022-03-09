import { combineReducers  } from "redux";
import TestReducer from './test'


const rootReducer = combineReducers({
 test:TestReducer
});

export default rootReducer;
