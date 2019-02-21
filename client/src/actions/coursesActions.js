import axios from "axios";

//Scores Action Types
export const FETCH_COURSES_REQUEST = "FETCH_COURSES_REQUEST";
export const FETCH_COURSES_SUCCESS = "FETCH_COURSES_SUCCESS";
export const FETCH_COURSES_FAILURE = "FETCH_COURSES_FAILURE";

export const CLEAR_COURSES = "CLEAR_COURSES";

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

export const clearCourses = () => ({
	type: CLEAR_COURSES
});

//Thunk for fetching all courses
export function fetchCourses() {
	return function(dispatch) {
		//Update isFetching scores state
		dispatch(requestCourses());
		return axios
			.get("/api/courses")
			.then(response => dispatch(receivedCourses(response)))
			.catch(error => dispatch(requestCoursesError(error)));
	};
}
