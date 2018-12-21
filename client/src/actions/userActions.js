import axios from "axios";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const requestUser = () => ({
	type: FETCH_USER_REQUEST
});

export const setUser = res => ({
	type: FETCH_USER_SUCCESS,
	id: res.data[0].id,
	name: res.data[0].name,
	email: res.data[0].email,
	handicap: res.data[0].handicap
});

export const requestUserError = error => ({
	type: FETCH_USER_FAILURE,
	error: error
});

export function fetchUser() {
	return function(dispatch) {
		dispatch(requestUser());
		return axios
			.get(`http://5c1c2f1b85f9df0013fb8a11.mockapi.io/api/login`)
			.then(
				res => dispatch(setUser(res)),
				error => dispatch(requestUserError(error))
			);
	};
}
