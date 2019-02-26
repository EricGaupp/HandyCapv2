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

export const deleteScoreById = id => ({
	type: DELETE_SCORE,
	id: id
});

export const clearScores = () => ({ type: CLEAR_SCORES });

//Scores Thunks
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

export function deleteScore(token, scoreId) {
	return function(dispatch) {
		return axios
			.post(
				"/scores/delete",
				{ scoreId: id },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(response => {
				if (response.deleted) {
					dispatch(deleteScoreById(scoreId));
				}
			})
			.catch(error => console.log(error));
	};
}
