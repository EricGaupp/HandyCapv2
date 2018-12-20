import {
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE
} from "../actions/userActions";

const initialState = { user: { isFetching: false }, courses: [] };

function userReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USER_REQUEST:
			return Object.assign(
				{},
				{ ...state },
				{ user: { isFetching: true } }
			);
		case FETCH_USER_SUCCESS:
			return Object.assign(
				{},
				{ ...state },
				{ user: { isFetching: false }, courses: action.courses }
			);
	}
	return state;
}

export default userReducer;
