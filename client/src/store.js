import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import userReducer from "./reducers/userReducer";

const loggerMiddleware = createLogger();

const store = createStore(
	userReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
