import React from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";

import { deleteScore } from "../../actions/scoresActions";

import "./DashboardScoreEdit.css";

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
	const formattedDate = dayjs(scoreDetails.date).format("MMM D[,] YYYY");
	return (
		<div className="container-fluid">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow mt-2">
						<h4 className="card-header">Round Details</h4>
						<div className="card-body px-0 py-0">
							<table className="table text-center my-0">
								<thead className="thead-dark">
									<tr>
										<th scope="col">Date</th>
										<td>{formattedDate}</td>
									</tr>
									<tr>
										<th scope="col">Course</th>
										<td>{scoreDetails.courseName}</td>
									</tr>
									<tr>
										<th scope="col">Tees</th>
										<td>{scoreDetails.teeName}</td>
									</tr>
									<tr>
										<th scope="col">Gross</th>
										<td>{scoreDetails.gross}</td>
									</tr>
									<tr>
										<th scope="col">Adjusted Gross</th>
										<td>{scoreDetails.adjustedGross}</td>
									</tr>
									<tr>
										<th scope="col">Course Handicap</th>
										<td>{scoreDetails.courseHandicap}</td>
									</tr>
									<tr>
										<th scope="col">Net</th>
										<td>{scoreDetails.net}</td>
									</tr>
									<tr>
										<th scope="col">Differential</th>
										<td>{scoreDetails.differential}</td>
									</tr>
								</thead>
							</table>
						</div>
						<div className="card-footer text-right">
							<button
								className="radiusButton"
								onClick={() => {
									const response = window.confirm(
										"Delete Score?"
									);
									if (response) {
										deleteScore(token, id);
										//TODO Only push history if no deletion error objects created by deleteScore() thunk
										props.history.push("/dashboard/scores");
									}
								}}
							>
								<span>Delete</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashboardScoreEdit);
