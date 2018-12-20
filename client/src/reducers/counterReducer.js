import { ADD_COUNTER, DEC_COUNTER } from "../actions/counterActions.js";

const initialState = 0;

function counterReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COUNTER:
			return state + 1;
		case DEC_COUNTER:
			return state - 1;
		default:
			return state;
	}
}

export default counterReducer;
