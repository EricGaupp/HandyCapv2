import React from "react";

const TeeInfo = props => {
	return (
		<div className="card shadow">
			<div className="card-header">Course Info</div>
			<div className="card-body">
				<table className="table">
					<tbody>
						<tr>
							<th scope="row">Course</th>
							<td>{props.courseName}</td>
						</tr>
						<tr>
							<th scope="row">Location</th>
							<td>
								{props.courseCity}, {props.courseState}
							</td>
						</tr>
						<tr>
							<th scope="row">Tees</th>
							<td>{props.teeName}</td>
						</tr>
						<tr>
							<th scope="row">Par</th>
							<td>{props.par}</td>
						</tr>
						<tr>
							<th scope="row">Yardage</th>
							<td>{props.yardage}</td>
						</tr>
						<tr>
							<th scope="row">Rating</th>
							<td>{props.rating}</td>
						</tr>
						<tr>
							<th scope="row">Slope</th>
							<td>{props.slope}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TeeInfo;
