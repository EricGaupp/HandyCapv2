import { combineReducers } from "redux";
import userReducer from "./userReducer";
import courseReducer from "./coursesReducer";
import scoresReducer from "./scoresReducer";

const rootReducer = combineReducers({
	user: userReducer,
	courses: courseReducer,
	scores: scoresReducer
});

export default rootReducer;
