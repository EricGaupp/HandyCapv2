import React from "react";
import {
	axisBottom,
	axisLeft,
	extent,
	line,
	select,
	scalePoint,
	scaleLinear
} from "d3";

class LineGraph extends React.Component {
	margins = { top: 20, right: 5, bottom: 60, left: 35 };

	componentDidMount() {
		this.drawChart();
	}

	componentDidUpdate(prevProps) {}

	drawChart() {
		const { width, height } = this.props;
		//Create SVG
		const svg = select("#lineGraphContainer")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		//Create Scale Ranges based on container size
		const xScale = scalePoint()
			.rangeRound([
				0,
				this.props.width - this.margins.right - this.margins.left
			])
			.padding(0.5);
		const yScale = scaleLinear().range([
			this.props.height - this.margins.top - this.margins.bottom,
			0
		]);

		//Create Scale Domains based on score data
		xScale.domain(this.props.scores.map(score => score.id));
		yScale.domain(extent(this.props.handicaps));

		//Create line
		// //const line = line()
		// 	.x(d => {
		// 		return xScale(d.id);
		// 	})
		// 	.y(d => {
		// 		d;
		// 	});

		//Axes
		const xAxis = axisBottom(xScale);
		const yAxis = axisLeft(yScale);
		svg.append("g")
			.attr(
				"transform",
				`translate(${this.margins.left},${height -
					this.margins.bottom})`
			)
			.call(xAxis);
		svg.append("g")
			.attr(
				"transform",
				`translate(${this.margins.left},${this.margins.top})`
			)
			.call(yAxis);
	}

	render() {
		return <div id="lineGraphContainer" />;
	}
}

export default LineGraph;
