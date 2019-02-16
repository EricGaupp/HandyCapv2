import React from "react";
import { connect } from "react-redux";

import { fetchScores } from "../actions/scoreActions";

const mapStateToProps = state => {
	return {
		token: state.user.token,
		scores: state.scores.data
	};
};

const mapDispatchToProps = dispatch => {
	return {
		//Probably Should dispatch this action during user login
		fetchScores: token => dispatch(fetchScores(token))
	};
};

const Scores = props => {
	//Currently loops endlessly since fetchScores gets called every render
	props.fetchScores(props.token);
	return (
		<h1>
			Scores Table goes here{" "}
			{props.scores.length > 0 && props.scores[0].gross}
		</h1>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Scores);
