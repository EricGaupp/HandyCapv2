import {
	FETCH_SCORES_REQUEST,
	FETCH_SCORES_SUCCESS,
	FETCH_SCORES_FAILURE
} from "../actions/scoreActions";

const initialState = { isFetching: false, data: [] };

function scoresReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_SCORES_REQUEST:
			return Object.assign({}, { ...state }, { isFetching: true });
		case FETCH_SCORES_SUCCESS:
			return Object.assign(
				{},
				{ ...state },
				{
					isFetching: false,
					data: action.data
				}
			);
		case FETCH_SCORES_FAILURE:
			return Object.assign(
				{},
				{ ...state },
				{
					isFetching: false,
					error: action.error
				}
			);
		default:
			return state;
	}
}

export default scoresReducer;
