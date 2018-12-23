import {
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE
} from "../actions/userActions";

const initialState = {
	isFetching: false,
	id: null,
	name: "Eric",
	email: null,
	handicap: null
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USER_REQUEST:
			return Object.assign({}, { ...state }, { isFetching: true });
		case FETCH_USER_SUCCESS:
			return Object.assign(
				{},
				{ ...state },
				{
					id: action.id,
					name: action.name,
					email: action.email,
					handicap: action.handicap,
					isFetching: !state.isFetching
				}
			);
		case FETCH_USER_FAILURE:
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

export default userReducer;
