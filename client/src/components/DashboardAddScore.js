import React from "react";

const DashboardAddScore = props => {
	return (
		<div className="col mx-auto">
			<h1 className="text-center">Post A Score</h1>
			<form>
				<div className="form-group">
					<label for="formGroupExampleInput">Example label</label>
					<input
						type="text"
						className="form-control"
						id="formGroupExampleInput"
						placeholder="Example input"
					/>
				</div>
				<div className="form-group">
					<label for="formGroupExampleInput2">Another label</label>
					<input
						type="text"
						className="form-control"
						id="formGroupExampleInput2"
						placeholder="Another input"
					/>
				</div>
			</form>
		</div>
	);
};

export default DashboardAddScore;
