import {
	FETCH_SCORES_REQUEST,
	FETCH_SCORES_SUCCESS,
	FETCH_SCORES_FAILURE,
	CLEAR_SCORES
} from "../actions/scoresActions";

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
					data: action.scores
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
		case CLEAR_SCORES:
			return Object.assign({}, initialState);
		default:
			return state;
	}
}

export default scoresReducer;
