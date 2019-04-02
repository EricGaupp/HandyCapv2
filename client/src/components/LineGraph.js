import React from "react";
import dayjs from "dayjs";
import { scaleLinear, scalePoint } from "d3-scale";
import { extent } from "d3-array";
import * as d3Shape from "d3-shape";
import * as d3Select from "d3-selection";
import "d3-transition";
import { axisBottom, axisLeft } from "d3-axis";

import "./LineGraph.css";

class LineGraph extends React.Component {
	margins = { top: 20, right: 5, bottom: 70, left: 70 };

	componentDidMount() {
		this.drawChart();
	}

	componentDidUpdate(prevProps) {
		//Clear SVG when window size changes
		d3Select.select("#lineGraph").remove();
		//Redraw chart with new dimensions
		this.drawChart();
	}

	drawChart() {
		const { width, height, handicaps } = this.props;

		//Filter out null data and map to d3 linedata format
		const lineData = handicaps
			.filter(d => d.handicapIndex !== null)
			.map(d => {
				return Object.assign(
					{},
					{
						x: d.id,
						y: d.handicapIndex,
						date: d.date
					}
				);
			});

		//Create SVG
		const svg = d3Select
			.select("#lineGraphContainer")
			.append("svg")
			.attr("id", "lineGraph")
			.attr("width", width)
			.attr("height", height);

		//Create Tooltip Div
		const tooltip = d3Select
			.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

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
		xScale.domain(lineData.map(data => data.x));

		//Buffer y scale range by 5% of min and max values
		//TODO Logic for when both values are > 0 => min should be min*0.95 to lower yScale. Currently only works when min is negative and max is positive
		let [min, max] = extent(lineData.map(data => data.y));
		if (min > 0 && max > 0) {
			const totalY = (max - min) / 0.9;
			min = min - totalY * 0.05;
			max = max + totalY * 0.05;
		} else if (min < 0 && max < 0) {
			min = 1.05 * min;
			max = 0.95 * max;
		} else {
			min = min * 1.05;
			max = max * 1.05;
		}
		yScale.domain([min, max]).nice();

		//Create line generator
		const line = d3Shape
			.line(lineData)
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
				const filtered = handicaps.filter(score => {
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
			.attr("class", "xAxis")
			.call(xAxis);

		svg.append("g")
			.attr(
				"transform",
				`translate(${this.margins.left},${this.margins.top})`
			)
			.call(yAxis);

		//Draw Y Axis Label
		svg.append("text")
			.attr("class", "axisLabel")
			.attr(
				"transform",
				`translate(${5},${this.margins.top +
					(height - this.margins.top - this.margins.bottom) /
						2}) rotate(-90)`
			)
			.text("Handicap Index");

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
			.append("circle")
			.attr(
				"transform",
				`translate(${this.margins.left},${this.margins.top})`
			)
			.attr("class", "dot")
			.attr("cx", d => {
				return xScale(d.x);
			})
			.attr("cy", d => {
				return yScale(d.y);
			})
			.attr("r", 6)
			.on("mouseover", d => {
				tooltip
					.transition()
					.duration(200)
					.style("opacity", 0.9);
				tooltip
					.html(d.y)
					.style("left", `${d3Select.event.pageX}px`)
					.style("top", `${d3Select.event.pageY - 28}px`);
			})
			.on("mouseout", d => {
				tooltip
					.transition()
					.duration(100)
					.style("opacity", 0);
			});
	}

	render() {
		return null;
	}
}

export default LineGraph;
