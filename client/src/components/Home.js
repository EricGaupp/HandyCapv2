import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { fetchUser } from "../actions/userActions";

import "./Home.css";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
	fetchUser: subreddit => dispatch(fetchUser(subreddit))
});

const Home = props => {
	return (
		<div className="background">
			<div className="jumbotron paral paralsec justify-content-center">
				<h3>{props.state.user.isFetching ? "TRUE" : "FALSE"}</h3>
				<button onClick={() => props.fetchUser("golf")}>
					Request Golf Stuff
				</button>
			</div>
			<div>
				<h1 className="display-3">Here is a heading 1</h1>
				<p className="lead">Here is a short description 1</p>
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
