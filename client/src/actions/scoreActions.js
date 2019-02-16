import axios from "axios";

//Scores Action Types
export const FETCH_SCORES_REQUEST = "FETCH_SCORES_REQUEST";
export const FETCH_SCORES_SUCCESS = "FETCH_SCORES_SUCCESS";
export const FETCH_SCORES_FAILURE = "FETCH_SCORES_FAILURE";

//Scores Action Creators
export const requestScores = () => ({
	type: FETCH_SCORES_REQUEST
});

export const receivedScores = response => ({
	type: FETCH_SCORES_SUCCESS,
	data: response.data
});

export const requestScoresError = error => ({
	type: FETCH_SCORES_FAILURE,
	error: error
});

//Thunk for fetching all user associated scores
export function fetchScores(token) {
	return function(dispatch) {
		//Update isFetching scores state
		dispatch(requestScores());
		return (
			axios
				//See if there is a method for setting authorization headers globally if token is available
				.get("/scores", {
					headers: { Authorization: `Bearer ${token}` }
				})
				.then(response => dispatch(receivedScores(response)))
				.catch(error => dispatch(requestScoresError(error)))
		);
	};
}
