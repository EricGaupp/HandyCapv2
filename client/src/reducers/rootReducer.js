import { combineReducers } from "redux";
import userReducer from "./userReducer";
import teesReducer from "./teesReducer";
import scoresReducer from "./scoresReducer";

const rootReducer = combineReducers({
	user: userReducer,
	scores: scoresReducer,
	tees: teesReducer
});

export default rootReducer;
