import React from "react";
import { connect } from "react-redux";

import { deleteScore } from "../actions/scoresActions";

const mapStateToProps = state => {
	return {
		scores: state.scores.data,
		token: state.user.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deleteScore: (token, id) => dispatch(deleteScore(token, id))
	};
};

const DashboardScoreEdit = props => {
	const { scores, token, deleteScore } = props;
	const { id } = props.match.params;
	const scoreDetails = scores.filter(score => {
		return score.id === parseInt(id);
	})[0];
	return (
		<div className="card">
			<h4 className="card-header">Score Details</h4>
			<div className="card-body">
				<h6>Course: {scoreDetails.courseName}</h6>
			</div>
			<div className="card-footer">
				<button
					className="btn btn-danger"
					onClick={() => {
						const response = window.confirm("Delete Score?");
						if (response) {
							deleteScore(token, id);
							props.history.push("/dashboard/scores");
						}
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashboardScoreEdit);
