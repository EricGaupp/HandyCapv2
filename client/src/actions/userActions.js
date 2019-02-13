import axios from "axios";

//Login Action Types
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

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
	token: res.data.token
});

export const loginError = error => ({
	type: FETCH_USER_FAILURE,
	loginError: error.data.loginError,
	errorMessage: error.data.errorMessage
});

//Logout Action Creator
export const logout = () => ({
	type: LOGOUT_USER
});

export function login(email, password) {
	return function(dispatch) {
		//Updates redux user.isFetching state
		dispatch(requestUser());
		//Post request with credentials to authentication route
		return axios
			.post("/user/login", { email, password })
			.then(response => {
				//Update Redux User State with any login errors
				if (response.data.loginError) {
					dispatch(loginError(response));
				} else {
					//Store JWT here?
					//Update Redux User State on success
					dispatch(setUser(response));
					localStorage.setItem("token", response.data.token);
				}
			})
			.catch(error => console.log(error));
	};
}
