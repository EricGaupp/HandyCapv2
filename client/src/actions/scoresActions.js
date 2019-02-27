import axios from "axios";

//Scores Actions
export const FETCH_SCORES_REQUEST = "FETCH_SCORES_REQUEST";
export const FETCH_SCORES_SUCCESS = "FETCH_SCORES_SUCCESS";
export const FETCH_SCORES_FAILURE = "FETCH_SCORES_FAILURE";

export const DELETE_SCORE = "DELETE_SCORE";

export const CLEAR_SCORES = "CLEAR_SCORES";

//Scores Action Creators
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

//Scores Thunks
export function fetchScores(token) {
	return dispatch => {
		dispatch(requestScores());
		return axios
			.get("/scores", { headers: { Authorization: `Bearer ${token}` } })
			.then(
				response => dispatch(setScores(response.data)),
				error => dispatch(requestScoresError(error))
			);
	};
}

export function deleteScore(token, scoreId) {
	return dispatch => {
		return axios
			.post(
				"/scores/delete",
				{ scoreId: scoreId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(
				response => {
					//If score was deleted, clear redux scores object and refetch scores from database
					if (response.data.deleted) {
						dispatch(clearScores());
						dispatch(fetchScores(token));
					}
				},
				error => console.log(error)
			);
	};
}
