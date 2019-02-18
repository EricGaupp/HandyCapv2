import axios from "axios";

//Login Action Types
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

//Token Action Types
export const SET_TOKEN = "SET_TOKEN";

//Register Action Types
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";

//Logout Action Types
export const LOGOUT_USER = "LOGOUT_USER";

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
	token: res.data.token,
	scores: res.data.scores
});

export const loginError = error => ({
	type: FETCH_USER_FAILURE,
	loginError: error.data.loginError,
	errorMessage: error.data.errorMessage
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

//Login Thunk
export const login = (email, password) => {
	return dispatch => {
		//Updates redux user.isFetching state
		dispatch(requestUser());
		//Post request with credentials to authentication route
		return axios
			.post("/login", { email, password })
			.then(response => {
				//Update Redux User State with any login errors
				if (response.data.loginError) {
					dispatch(loginError(response));
				} else {
					//Update Redux User State on successful login
					dispatch(setUser(response));
					//Store JWT token in localStorage
					localStorage.setItem("token", response.data.token);
				}
			})
			.catch(error => console.log(error));
	};
};

//Register Thunk
export const registerUser = (email, password, firstName, lastName) => {
	return dispatch => {
		return axios
			.post("/register", { email, password, firstName, lastName })
			.then(response => {
				//Update Redux User State with any registration errors
				if (response.data.registerError) {
					dispatch(registerError(response));
				} else {
					//Update Redux User State on successful registration
					dispatch(registerSetUser(response));
					//Store JWT token in localStorage
					localStorage.setItem("token", response.data.token);
				}
			})
			.catch(error => console.log(error));
	};
};

//Logout Thunk
export const logout = () => {
	return dispatch => {
		//Update Redux User State to initial state (no user)
		dispatch(logoutUser());
		//Remove JWT from localStorage
		localStorage.removeItem("token");
	};
};
