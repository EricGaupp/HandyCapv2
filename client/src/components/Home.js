import React from "react";

import { connect } from "react-redux";
import { fetchUser } from "../actions/userActions";
import { fetchTees } from "../actions/teeActions";

import "./Home.css";

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
	fetchUser: () => dispatch(fetchUser()),
	fetchTees: () => dispatch(fetchTees())
});

const Home = props => {
	return (
		<div className="background">
			<div className="jumbotron">
				{props.state.user.id && (
					<h1>
						{props.state.user.name} HC:
						{props.state.user.handicap}
					</h1>
				)}
				<button onClick={() => props.fetchUser()}>
					Request User Stuff
				</button>
				<button onClick={() => props.fetchTees()}>
					Request Golf Tees Stuff
				</button>
				{props.state.tees.data.length > 0 && (
					<ul>
						{props.state.tees.data.map(tee => {
							return <li key={tee.id}>{tee.color}</li>;
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
