import {
	FETCH_COURSES_REQUEST,
	FETCH_COURSES_SUCCESS,
	FETCH_COURSES_FAILURE
} from "../actions/coursesActions";

const initialState = { isFetching: false, data: [] };

function coursesReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_COURSES_REQUEST:
			return Object.assign({}, { ...state }, { isFetching: true });
		case FETCH_COURSES_SUCCESS:
			return Object.assign(
				{},
				{ ...state },
				{
					isFetching: false,
					data: action.data
				}
			);
		case FETCH_COURSES_FAILURE:
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

export default coursesReducer;
