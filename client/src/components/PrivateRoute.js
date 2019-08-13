import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

//Get Authentication State from Redux
const mapStateToProps = state => {
	return {
		isAuthenticated: state.user.isAuthenticated
	};
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
		}
	/>
);

export default connect(
	mapStateToProps,
	null
)(PrivateRoute);
