import React from "react";
import { connect } from "react-redux";
import * as d3 from "d3";

import "./Axis.css";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

//SVG dimensions
const svgDimensions = { width: 900, height: 300 };
const margins = { top: 20, right: 5, bottom: 70, left: 35 };

class BarChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reversedScores: []
		};
		//Scales
		this.xScale = d3
			.scaleBand()
			.padding(0.5)
			.range([margins.left, svgDimensions.width - margins.right]);
		this.yScale = d3
			.scaleLinear()
			.range([svgDimensions.height - margins.bottom, margins.top]);

		//Axes
		this.xAxis = d3.axisBottom(this.xScale);
		this.yAxis = d3.axisLeft(this.yScale);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.scores.length !== this.props.scores.length) {
			//Score data sorted in chronological order
			const { scores } = this.props;
			const reversedScores = scores.slice().reverse();

			//Min and Max values of gross scores
			const max = d3.max(reversedScores.map(score => score.gross));

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
				return filtered[0].date;
			});

			//Draw Axes
			d3.select(this.refs.xAxis).call(this.xAxis);
			d3.select(this.refs.yAxis).call(this.yAxis);

			this.setState({ reversedScores });
		}
	}

	render() {
		let bars = null;
		if (this.state.reversedScores.length > 0) {
			const { reversedScores } = this.state;
			bars = reversedScores.map(score => {
				return (
					<rect
						key={score.id}
						x={this.xScale(`${score.id}`)}
						y={this.yScale(score.gross)}
						height={
							svgDimensions.height -
							margins.bottom -
							this.yScale(score.gross)
						}
						width={this.xScale.bandwidth()}
					/>
				);
			});
		}

		return (
			<svg width={svgDimensions.width} height={svgDimensions.height}>
				<g>
					<g
						className="axis axis-bottom"
						ref="xAxis"
						transform={`translate(0, ${svgDimensions.height -
							margins.bottom})`}
					/>
					<g ref="yAxis" transform={`translate(${margins.left},0)`} />
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
