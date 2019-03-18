import React from "react";
import { connect } from "react-redux";

import LineGraph from "./LineGraph";

import calculateHandicapIndex from "../utilities/calculateHandicapIndex";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

const HandicapGraphic = ({ scores }) => {
	let indexArray = [];
	//Calculate the index for each of the 20 most recent scores
	for (let i = 0; i < Math.min(scores.length, 20); i++) {
		//Grab the interval of scores
		let indexScores = scores.slice(i, i + 20);
		const index = calculateHandicapIndex(indexScores);
		indexArray.push(index);
	}

	if (indexArray[0]) {
		return (
			<React.Fragment>
				<h3>{`Current Index: ${indexArray[0]}`}</h3>
				<LineGraph
					width={600}
					height={300}
					scores={scores}
					handicaps={indexArray}
				/>
			</React.Fragment>
		);
	} else {
		return <h3>Need at least 5 rounds to have a valid handicap</h3>;
	}
};

export default connect(
	mapStateToProps,
	null
)(HandicapGraphic);
