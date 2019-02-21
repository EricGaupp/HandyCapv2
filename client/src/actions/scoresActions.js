import axios from "axios";

export const FETCH_SCORES_REQUEST = "FETCH_SCORES_REQUEST";
export const FETCH_SCORES_SUCCESS = "FETCH_SCORES_SUCCESS";
export const FETCH_SCORES_FAILURE = "FETCH_SCORES_FAILURE";

export const CLEAR_SCORES = "CLEAR_SCORES";

export const requestScores = () => ({
	type: FETCH_SCORES_REQUEST
});

export const setScores = data => ({
	type: FETCH_SCORES_SUCCESS,
	scores: data
});

export const requestScoresError = error => ({
	type: FETCH_SCORES_FAILURE,
	error: error
});

export const clearScores = () => ({ type: CLEAR_SCORES });

export function fetchScores(token, cb) {
	return function(dispatch) {
		dispatch(requestScores());
		return axios
			.get("/scores", { headers: { Authorization: `Bearer ${token}` } })
			.then(
				response => {
					dispatch(setScores(response.data));
					cb();
				},
				error => dispatch(requestScoresError(error))
			);
	};
}
