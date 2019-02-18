import axios from "axios";

//Scores Action Types
export const FETCH_COURSES_REQUEST = "FETCH_COURSES_REQUEST";
export const FETCH_COURSES_SUCCESS = "FETCH_COURSES_SUCCESS";
export const FETCH_COURSES_FAILURE = "FETCH_COURSES_FAILURE";

//Scores Action Creators
export const requestCourses = () => ({
	type: FETCH_COURSES_REQUEST
});

export const receivedCourses = response => ({
	type: FETCH_COURSES_SUCCESS,
	data: response.data
});

export const requestCoursesError = error => ({
	type: FETCH_COURSES_FAILURE,
	error: error
});

//Thunk for fetching all user associated scores
export function fetchCourses() {
	return function(dispatch) {
		//Update isFetching scores state
		dispatch(requestCourses());
		return (
			axios
				//See if there is a method for setting authorization headers globally if token is available
				.get("/api/courses")
				.then(response => dispatch(receivedScores(response)))
				.catch(error => dispatch(requestScoresError(error)))
		);
	};
}
