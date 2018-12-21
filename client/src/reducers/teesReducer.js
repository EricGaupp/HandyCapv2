import {
	FETCH_TEES_REQUEST,
	FETCH_TEES_SUCCESS,
	FETCH_TEES_FAILURE
} from "../actions/teeActions";

const initialState = { isFetching: false, data: [] };

function teesReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_TEES_REQUEST:
			return Object.assign({}, { ...state }, { isFetching: true });
		case FETCH_TEES_SUCCESS:
			return Object.assign(
				{},
				{ ...state },
				{
					isFetching: !state.isFetching,
					data: action.tees
				}
			);
		case FETCH_TEES_FAILURE:
			return Object.assign(
				{},
				{ ...state },
				{
					isFetching: !state.isFetching,
					error: action.error
				}
			);
		default:
			return state;
	}
}

export default teesReducer;
