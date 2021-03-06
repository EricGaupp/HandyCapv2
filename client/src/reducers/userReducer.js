import {
	CLEAR_LOGIN_ERROR,
	CLEAR_REGISTER_ERROR,
	LOGOUT_USER,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	SET_TOKEN,
	VERIFY_TOKEN_FAILURE
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
				verifyTokenError,
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
		case VERIFY_TOKEN_FAILURE: {
			return Object.assign(
				{},
				{ ...state },
				{ isFetching: false, verifyTokenError: action.verifyTokenError }
			);
		}
		case SET_TOKEN: {
			return Object.assign({}, { ...state }, { token: action.token });
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
			return Object.assign({}, initialState);
		}
		case CLEAR_LOGIN_ERROR: {
			const { loginError, loginErrorMessage, ...rest } = state;
			return Object.assign({}, { ...rest });
		}
		case CLEAR_REGISTER_ERROR: {
			const { registerError, registerErrorMessage, ...rest } = state;
			return Object.assign({}, { ...rest });
		}
		default: {
			return state;
		}
	}
}

export default userReducer;
