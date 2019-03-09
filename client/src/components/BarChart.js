import React from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import dayjs from "dayjs";

import "./BarChart.css";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

class BarChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reversedScores: []
		};
		//SVG dimensions
		this.svgDimensions = {
			width: 900,
			height: 300
		};
		this.margins = { top: 20, right: 5, bottom: 60, left: 35 };
		//Scales
		this.xScale = d3
			.scaleBand()
			.padding(0.5)
			.rangeRound([
				this.margins.left,
				this.svgDimensions.width - this.margins.right
			]);
		this.yScale = d3
			.scaleLinear()
			.range([
				this.svgDimensions.height - this.margins.bottom,
				this.margins.top
			]);

		//Axes
		this.xAxis = d3.axisBottom(this.xScale);
		this.yAxis = d3.axisLeft(this.yScale);
	}

	componentDidMount() {
		//Score data sorted in chronological order
		const { scores } = this.props;
		//Grab 20 latest scores or all of them if <20 total
		let reversedScores;
		if (scores.length > 20) {
			reversedScores = scores.slice(0, 20).reverse();
		} else {
			reversedScores = scores.slice().reverse();
		}

		const stat = "differential";

		//Min and Max values of gross scores
		const max = d3.max(
			reversedScores.map(score => {
				console.log(`score.${stat}`);
				return `score.${stat}`;
			})
		);

		//Update scales with score data
		this.xScale.domain(reversedScores.map(score => score.id));
		this.yScale.domain([0, max]);

		//Update x-axis labels with score data
		this.xAxis.tickFormat(tick => {
			//Find score where id matches the tick value
			const filtered = reversedScores.filter(score => {
				return score.id === tick;
			});
			//Return the date for the tick format
			const dateString = dayjs(filtered[0].date).format("MMM D[,] YYYY");
			return dateString;
		});

		//Draw Axes
		d3.select(this.refs.xAxis).call(this.xAxis);
		d3.select(this.refs.yAxis).call(this.yAxis);

		this.setState({ reversedScores });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.scores.length !== this.props.scores.length) {
			//Score data sorted in chronological order
			const { scores, displayStat } = this.props;
			let reversedScores;
			if (scores.length > 20) {
				reversedScores = scores.slice(0, 20).reverse();
			} else {
				reversedScores = scores.slice().reverse();
			}

			//Min and Max values of selected stat
			const [min, max] = d3.extent(
				reversedScores.map(score => score[displayStat])
			);

			//Update scales with score data
			this.xScale.domain(reversedScores.map(score => score.id));
			this.yScale.domain([min, max]);

			//Update x-axis labels with score data
			this.xAxis.tickFormat(tick => {
				//Find score where id matches the tick value
				const filtered = reversedScores.filter(score => {
					return score.id === tick;
				});
				//Return the date for the tick format
				const dateString = dayjs(filtered[0].date).format(
					"MMM D[,] YYYY"
				);
				return dateString;
			});

			//Draw Axes
			d3.select(this.refs.xAxis).call(this.xAxis);
			d3.select(this.refs.yAxis).call(this.yAxis);

			this.setState({ reversedScores });
		}
	}

	render() {
		const { displayStat } = this.props;
		let bars = null;
		if (this.state.reversedScores.length > 0) {
			const { reversedScores } = this.state;
			bars = reversedScores.map(score => {
				return (
					<rect
						className="bars"
						key={score.id}
						x={this.xScale(score.id)}
						y={this.yScale(score[displayStat])}
						height={
							this.svgDimensions.height -
							this.margins.bottom -
							this.yScale(score[displayStat])
						}
						width={this.xScale.bandwidth()}
					/>
				);
			});
		}

		return (
			<svg
				width={this.svgDimensions.width}
				height={this.svgDimensions.height}
			>
				<g>
					<g
						className="axis axis-bottom"
						ref="xAxis"
						transform={`translate(0, ${this.svgDimensions.height -
							this.margins.bottom})`}
					/>
					<g
						ref="yAxis"
						transform={`translate(${this.margins.left},0)`}
					/>
				</g>
				<g>{bars}</g>
			</svg>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(BarChart);
