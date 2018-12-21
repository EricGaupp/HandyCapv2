import axios from "axios";

export const FETCH_TEES_REQUEST = "FETCH_TEES_REQUEST";
export const FETCH_TEES_SUCCESS = "FETCH_TEES_SUCCESS";
export const FETCH_TEES_FAILURE = "FETCH_TEES_FAILURE";

export const requestTees = () => ({
	type: FETCH_TEES_REQUEST
});

export const receivedTees = data => ({
	type: FETCH_TEES_SUCCESS,
	tees: data
});

export const requestTeesError = error => ({
	type: FETCH_TEES_FAILURE,
	error: error
});

export function fetchTees() {
	return function(dispatch) {
		dispatch(requestTees());
		return axios
			.get(`http://5c1c2f1b85f9df0013fb8a11.mockapi.io/api/courses`)
			.then(
				res => dispatch(receivedTees(res.data)),
				error => dispatch(requestTeesError(error))
			);
	};
}
