import React from "react";
import dayjs from "dayjs";
import { scaleLinear, scalePoint } from "d3-scale";
import { extent } from "d3-array";
import * as d3Shape from "d3-shape";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";

import "./LineGraph.css";

class LineGraph extends React.Component {
	margins = { top: 20, right: 5, bottom: 60, left: 35 };

	componentDidMount() {
		this.drawChart();
	}

	componentDidUpdate(prevProps) {
		//Clear SVG when window size changes
		select("#lineGraph").remove();
		//Redraw chart with new dimensions
		this.drawChart();
	}

	drawChart() {
		const { width, height } = this.props;

		//Consolidate Index and ScoreId data to a single array
		const scores = this.props.scores
			.slice(0, this.props.scores.length)
			.reverse();
		const handicaps = this.props.handicaps.reverse();

		const lineData = scores.map((score, i) => {
			return Object.assign(
				{},
				{
					x: score.id,
					y: handicaps[i],
					date: score.date
				}
			);
		});

		//Create SVG
		const svg = select("#lineGraphContainer")
			.append("svg")
			.attr("id", "lineGraph")
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
		xScale.domain(
			lineData.filter(data => data.y !== null).map(data => data.x)
		);
		let [min, max] = extent(handicaps);
		yScale.domain([min, max]).nice();

		//Create line generator
		const line = d3Shape
			.line(lineData)
			.defined(d => d.y !== null)
			.x(d => {
				return xScale(d.x);
			})
			.y(d => {
				return yScale(d.y);
			})
			.curve(d3Shape.curveMonotoneX);

		//Define Axes
		const xAxis = axisBottom(xScale);
		const yAxis = axisLeft(yScale);

		//Format ticks and labels
		xAxis
			.tickFormat(tick => {
				//Find score where id matches the tick value
				const filtered = scores.filter(score => {
					return score.id === tick;
				});
				//Return the date for the tick format
				const dateString = dayjs(filtered[0].date).format(
					"MMM D[,] YYYY"
				);
				return dateString;
			})
			.tickSizeOuter(0);

		//Draw Axes
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

		//Draw Line
		svg.append("path")
			.datum(lineData)
			.attr(
				"transform",
				`translate(${this.margins.left},${this.margins.top})`
			)
			.attr("class", "line")
			.attr("d", line);

		//Draw Circles on each datapoint
		svg.selectAll(".dot")
			.data(lineData)
			.enter()
			.append("circle") // Uses the enter().append() method
			.attr(
				"transform",
				`translate(${this.margins.left},${this.margins.top})`
			)
			.attr("class", "dot") // Assign a class for styling
			.attr("cx", d => {
				return xScale(d.x);
			})
			.attr("cy", d => {
				return yScale(d.y);
			})
			.attr("r", 5);
	}

	render() {
		return null;
	}
}

export default LineGraph;
