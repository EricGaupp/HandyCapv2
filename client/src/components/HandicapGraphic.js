import React from "react";
import { connect } from "react-redux";

import * as d3 from "d3";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

const HandicapGraphic = ({ scores }) => {
	//Default handicap value
	let handicap = 36.4;
	//Extract differentials from scores object
	const differentials = scores.map(score => parseFloat(score.differential));
	//Default to lowest 10 differentials
	let arrayIndex = null;
	//Sort differentials into ascending order
	const sortedDifferentials = differentials.sort((a, b) => a - b);

	//Determing number of differentials to average
	if (scores.length > 19) {
		arrayIndex = 10;
	} else if (scores.length === 19) {
		arrayIndex = 9;
	} else if (scores.length === 18) {
		arrayIndex = 8;
	} else if (scores.length === 17) {
		arrayIndex = 7;
	} else if (14 < scores.length < 17) {
		arrayIndex = 6;
	} else if (12 < scores.length < 15) {
		arrayIndex = 5;
	} else if (10 < scores.length < 13) {
		arrayIndex = 4;
	} else if (8 < scores.length < 11) {
		arrayIndex = 3;
	} else if (6 < scores.length < 9) {
		arrayIndex = 2;
	} else if (4 < scores.length < 7) {
		arrayIndex = 1;
	}

	//Average the appropriate number of differentials
	if (arrayIndex && sortedDifferentials.length > 0) {
		const minimums = sortedDifferentials.slice(0, arrayIndex);
		handicap =
			minimums.reduce((diff, next) => {
				return diff + next;
			}, 0) / minimums.length;
		//Handicap = average of differentials multiplied by 0.96
		handicap = (handicap * 0.96).toFixed(3).split(".");

		return <h3>{`Index: ${handicap[0]}.${handicap[1][0]}`}</h3>;
	} else {
		return <h3>Need at least 5 rounds to have a valid handicap</h3>;
	}
};

export default connect(
	mapStateToProps,
	null
)(HandicapGraphic);
