import { combineReducers } from "redux";
import userReducer from "./userReducer";
import teesReducer from "./teesReducer";

const rootReducer = combineReducers({ user: userReducer, tees: teesReducer });

export default rootReducer;
