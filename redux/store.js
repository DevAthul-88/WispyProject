import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import RootReducer from "./rootReducer";
import User from "../lib/user";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
