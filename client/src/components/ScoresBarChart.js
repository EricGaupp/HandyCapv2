import React from "react";
import { connect } from "react-redux";

import * as d3 from "d3";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

const ScoresBarChart = ({ scores, height, width }) => {
	const margin = { top: 20, right: 5, bottom: 20, left: 35 };

	//xDomain value calculations (integer values 1 thru 20 ie. display a max of 20 scores along x axis)
	let xDomain = 20;
	if (scores.length < 20) {
		xDomain = scores.length;
	}

	//yDomain value calculations (max score value in set of 20 most recent scores)
	//TODO Can map different aspects of score to show different stats. Use a select dropdown or something to control
	const yDomain = scores.map(score => score.gross);

	//Calculate chart scales from domain and ranges
	const xScale = d3
		.scaleLinear()
		.domain([0, xDomain])
		.range([0, width - margin.right - margin.left]);

	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(yDomain)])
		.range([0, height - margin.top - margin.bottom]);

	//Axes
	const xAxis = d3
		.axisBottom()
		.scale(xScale)
		.tickFormat(tick => `${tick}`);
	const yAxis = d3.axisLeft().scale(yScale);

	//Bar Data
	const bars = scores.map((score, i) => {
		const y1 = yScale(score.gross);
		const y2 = 0;
		return {
			id: score.id,
			x: xScale(i),
			y: y1,
			height: y1 - y2
		};
	});

	return (
		<svg width={width} height={height}>
			{bars.map((bar, i) => (
				<rect
					key={bar.id}
					x={bar.x}
					y={bar.y}
					width={20}
					height={bar.height}
				/>
			))}
			{/*<g>
							<g ref="xAxis" />
							<g ref="yAxis" />
						</g>*/}
		</svg>
	);
};

export default connect(
	mapStateToProps,
	null
)(ScoresBarChart);
