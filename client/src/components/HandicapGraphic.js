import React from "react";
import { connect } from "react-redux";

import LineGraph from "./LineGraph";

import calculateHandicapIndex from "utilities/calculateHandicapIndex";

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

	console.log(indexArray);

	//Arrange up to the 20 latest scores in chronological order
	//let lineGraphScores = scores.slice(0, 20).reverse();

	//Determine and remove any null handicap index values
	//const lastNull = indexArray.lastIndexOf(null);
	//indexArray = indexArray.slice(lastNull,20)

	if (indexArray[0]) {
		return (
			<div id="lineGraphContainer">
				<h3>{`Current Index: ${indexArray[0]}`}</h3>
				<LineGraph
					width={600}
					height={300}
					scores={scores}
					handicaps={indexArray}
				/>
			</div>
		);
	} else {
		return <h3>Need at least 5 rounds to have a valid handicap</h3>;
	}
};

export default connect(
	mapStateToProps,
	null
)(HandicapGraphic);
