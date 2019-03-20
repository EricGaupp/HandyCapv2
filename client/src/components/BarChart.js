import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import * as d3Array from "d3-array";
import * as d3Shape from "d3-shape";
import { select } from "d3-selection";
import dayjs from "dayjs";

import "./BarChart.css";

class BarChart extends React.Component {
	margins = { top: 20, right: 5, bottom: 60, left: 35 };

	drawChart() {
		//Get svg size, display and score data from props
		const { width, height, scores, displayStat } = this.props;

		//Create svg with dimensions
		const svg = select("#barChartContainer")
			.append("svg")
			.attr("id", "barChart")
			.attr("width", width)
			.attr("height", height);
		//Create svg group offset by margins to contain chart components
		const chartArea = svg
			.append("g")
			.attr(
				"transform",
				`translate(${this.margins.left},${this.margins.top})`
			);

		//Create scale ranges based on container size
		const xScale = scaleBand()
			.padding(0.5)
			.rangeRound([0, width - this.margins.left - this.margins.right]);
		const yScale = scaleLinear().range([
			height - this.margins.top - this.margins.bottom,
			0
		]);

		//Create scale domains based on score data
		let min = 0,
			max;
		switch (displayStat) {
			case "differential": {
				[min, max] = d3Array.extent(
					scores.map(score => score[displayStat])
				);
				if (min > 0) {
					min = 0;
				}
				break;
			}
			default: {
				max = d3Array.max(scores.map(score => score[displayStat]));
			}
		}
		xScale.domain(scores.map(score => score.id));
		yScale.domain([min, max]).nice();

		//Generate Axes
		const xAxis = axisBottom(xScale);
		const yAxis = axisLeft(yScale);

		//Format ticks
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
			.tickSizeOuter(-(height - this.margins.top - this.margins.bottom));
		yAxis.tickSize(-(width - this.margins.right - this.margins.left));

		//Draw Axes
		chartArea
			.append("g")
			.attr(
				"transform",
				`translate(0,${height -
					this.margins.bottom -
					this.margins.top})`
			)
			.attr("class", "xAxis")
			.call(xAxis);
		chartArea
			.append("g")
			.attr("class", "yAxis")
			.call(yAxis);

		//Draw Line at y=0 for differential
		// if (displayStat === "differential") {
		// 	const yLineData = { x: this.margins.left, y: yScale(0) };
		// 	const yLine = d3Shape.line(yLineData)
		// 	chartArea
		// 		.select(".yLine")
		// 		.data(yLine)
		// 		.enter()
		// 		.append();
		// }

		//Draw Bars
		chartArea
			.selectAll(".bar")
			.data(
				scores.map(score => {
					return Object.assign(
						{},
						{ x: score.id, y: score[displayStat] }
					);
				})
			)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.classed("positive", d => {
				return d.y > 0;
			})
			.classed("negative", d => {
				return d.y <= 0;
			})
			.attr("x", d => xScale(d.x))
			.attr("y", d => {
				return Math.min(yScale(d.y), yScale(0));
			})
			.attr("width", xScale.bandwidth())
			.attr("height", d => {
				return Math.abs(yScale(d.y) - yScale(0));
			});
	}

	componentDidMount() {
		this.drawChart();
	}

	componentDidUpdate(prevProps) {
		//Clear SVG when window size changes
		select("#barChart").remove();
		//Redraw chart with new dimensions
		this.drawChart();
	}

	render() {
		return null;
	}
}

export default BarChart;
