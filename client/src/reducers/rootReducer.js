import { combineReducers } from "redux";
import userReducer from "./userReducer";
import courseReducer from "./coursesReducer";
import teeReducer from "./teesReducer";

const rootReducer = combineReducers({
	user: userReducer,
	courses: courseReducer,
	tees: teeReducer
});

export default rootReducer;
