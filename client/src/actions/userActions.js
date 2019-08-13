import axios from "axios";
import history from "../router/history";
import { setScores, clearScores } from "./scoresActions";
import { clearCourses } from "./coursesActions";

//Login Action Types
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

//JWT Verification Types
export const VERIFY_TOKEN_FAILURE = "VERIFY_TOKEN_FAILURE";

//Token Action Types
export const SET_TOKEN = "SET_TOKEN";

//Register Action Types
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";

//Logout Action Types
export const LOGOUT_USER = "LOGOUT_USER";

//Reset Error Types
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";
export const CLEAR_REGISTER_ERROR = "CLEAR_REGISTER_ERROR";

//Login Action Creators
export const requestUser = () => ({
	type: FETCH_USER_REQUEST
});

export const setUser = res => ({
	type: FETCH_USER_SUCCESS,
	id: res.data.id,
	firstName: res.data.firstName,
	lastName: res.data.lastName,
	email: res.data.email,
	token: res.data.token
});

export const loginError = error => ({
	type: FETCH_USER_FAILURE,
	loginError: error.data.loginError,
	errorMessage: error.data.errorMessage
});

export const verificationError = error => ({
	type: VERIFY_TOKEN_FAILURE,
	verifyTokenError: error
});

//JWT Set Token Action Creator
export const setToken = token => ({
	type: SET_TOKEN,
	token: token
});

//Register Action Creator
export const registerError = error => ({
	type: REGISTER_USER_FAILURE,
	registerError: error.data.registerError,
	registerErrorMessage: error.data.registerErrorMessage
});

export const registerSetUser = res => ({
	type: REGISTER_USER_SUCCESS,
	id: res.data.id,
	firstName: res.data.firstName,
	lastName: res.data.lastName,
	email: res.data.email,
	token: res.data.token
});

//Logout Action Creator
export const logoutUser = () => ({
	type: LOGOUT_USER
});

//Reset Login and Register Errors Action Creators
export const clearLoginError = () => ({
	type: CLEAR_LOGIN_ERROR
});

export const clearRegisterError = () => ({
	type: CLEAR_REGISTER_ERROR
});

//Login Thunk
export const login = (email, password) => {
	return dispatch => {
		//Updates redux user.isFetching state
		dispatch(requestUser());
		//Post request with credentials to authentication route
		return axios.post("/login", { email, password }).then(
			response => {
				//Update Redux User State with any login errors
				if (response.data.loginError) {
					dispatch(loginError(response));
				} else {
					//Update Redux User State on successful login
					dispatch(clearLoginError());
					dispatch(setUser(response));
					dispatch(setScores(response.data.scores));
					//Store JWT token in localStorage
					localStorage.setItem("token", response.data.token);
					//Redirect user to dashboard page
					history.push("/dashboard");
				}
			},
			error => console.log(error)
		);
	};
};

//Verify Thunk
export const verifyUserByToken = token => {
	return dispatch => {
		dispatch(requestUser());
		return axios
			.get("/verify", { headers: { Authorization: `Bearer ${token}` } })
			.then(
				response => {
					if (response.data.id) {
						dispatch(setUser(response));
						dispatch(setToken(token));
						dispatch(setScores(response.data.scores));
					}
				},
				error => {
					localStorage.removeItem("token");
					dispatch(verificationError(error));
				}
			);
	};
};

//Register Thunk
export const registerUser = (email, password, firstName, lastName) => {
	return dispatch => {
		return axios
			.post("/register", { email, password, firstName, lastName })
			.then(
				response => {
					//Update Redux User State with any registration errors
					if (response.data.registerError) {
						dispatch(registerError(response));
					} else {
						//Update Redux User State on successful registration
						dispatch(registerSetUser(response));
						//Store JWT token in localStorage
						localStorage.setItem("token", response.data.token);
					}
				},
				error => console.log(error)
			);
	};
};

//Logout Thunk
export const logout = () => {
	return dispatch => {
		//Update Redux User State to initial state (no user or scores)
		dispatch(logoutUser());
		dispatch(clearScores());
		dispatch(clearCourses());
		//Remove JWT from localStorage
		localStorage.removeItem("token");
	};
};
