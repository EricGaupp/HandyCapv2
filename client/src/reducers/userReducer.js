import {
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGOUT_USER
} from "../actions/userActions";

const initialState = {
	isFetching: false,
	isAuthenticated: false,
	id: null,
	firstName: null,
	lastName: null,
	email: null,
	token: null
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USER_REQUEST: {
			return Object.assign({}, { ...state }, { isFetching: true });
		}
		case FETCH_USER_SUCCESS: {
			//Remove any error state objects from User state on success
			const {
				loginError,
				loginErrorMessage,
				registerError,
				registerErrorMessage,
				...rest
			} = state;
			return Object.assign(
				{},
				{ ...rest },
				{
					isAuthenticated: true,
					token: action.token,
					id: action.id,
					firstName: action.firstName,
					lastName: action.lastName,
					email: action.email,
					isFetching: false
				}
			);
		}
		case FETCH_USER_FAILURE: {
			return Object.assign(
				{},
				{ ...state },
				{
					isFetching: false,
					loginError: action.loginError,
					loginErrorMessage: action.errorMessage
				}
			);
		}
		case REGISTER_USER_SUCCESS: {
			//Remove any error state objects from User state on success
			const {
				loginError,
				loginErrorMessage,
				registerError,
				registerErrorMessage,
				...rest
			} = state;
			return Object.assign(
				{},
				{ ...rest },
				{
					isAuthenticated: true,
					token: action.token,
					id: action.id,
					firstName: action.firstName,
					lastName: action.lastName,
					email: action.email
				}
			);
		}
		case REGISTER_USER_FAILURE: {
			return Object.assign(
				{},
				{ ...state },
				{
					registerError: action.registerError,
					registerErrorMessage: action.registerErrorMessage
				}
			);
		}
		case LOGOUT_USER: {
			return Object.assign(
				{},
				{ ...state },
				{
					isFetching: false,
					isAuthenticated: false,
					id: null,
					firstName: null,
					lastName: null,
					email: null,
					token: null
				}
			);
		}
		default: {
			return state;
		}
	}
}

export default userReducer;
