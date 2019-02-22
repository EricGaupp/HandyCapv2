import React from "react";
import { connect } from "react-redux";

import * as d3 from "d3";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

const ScoresBarChart = props => {
	const { scores, height, width } = props;
	const margin = { top: 20, right: 5, bottom: 20, left: 35 };

	//xDomain value calculations (integer values 1 thru 20 ie. display a max of 20 scores along x axis)
	let xDomain = [];
	for (let i = 0; i < 20; i++) {
		xDomain[i] = i;
	}
	if (scores.length < 20) {
		xDomain = [];
		for (let i = 0; i < scores.length; i++) {
			xDomain[i] = i;
		}
	}

	//yDomain value calculations (max score value in set of 20 most recent scores)
	//TODO Can map different aspects of score to show different stats. Use a select dropdown or something to control
	const yDomain = scores.map(score => score.gross);

	//Calculate chart scales from domain and ranges
	const xScale = d3
		.scaleLinear()
		.domain(xDomain)
		.range([0, width - margin.right - margin.left]);

	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(yDomain)])
		.range([0, height - margin.top - margin.bottom]);

	//Axes
	const axis = d3
		.axisBottom(xScale)
		.tickSizeInner(4)
		.tickSizeOuter(20)
		.tickPadding(3);

	return (
		<svg width={width} height={height}>
			{scores.map((score, i) => (
				<rect
					key={score.id}
					x={i}
					y={0}
					width={20}
					height={score.gross}
				/>
			))}
		</svg>
	);
};

export default connect(
	mapStateToProps,
	null
)(ScoresBarChart);
