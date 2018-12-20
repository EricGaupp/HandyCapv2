import axios from "axios";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const requestUser = () => ({
	type: FETCH_USER_REQUEST
});

export const receiveCourses = res => ({
	type: FETCH_USER_SUCCESS,
	courses: res.data.data.children.map(child => child.data.title)
});

export function fetchUser(subreddit) {
	return function(dispatch) {
		dispatch(requestUser());
		return axios
			.get(`https://www.reddit.com/r/${subreddit}.json`)
			.then(
				res => dispatch(receiveCourses(res)),
				error => console.log("An error occurred: %s", error)
			);
	};
}
