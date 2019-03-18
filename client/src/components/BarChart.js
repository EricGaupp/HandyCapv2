import React from "react";
import { connect } from "react-redux";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { extent, max } from "d3-array";
import { select } from "d3-selection";
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
			width: this.props.width,
			height: this.props.height
		};
		this.margins = { top: 20, right: 5, bottom: 60, left: 35 };
		//Scales
		this.xScale = scaleBand()
			.padding(0.5)
			.rangeRound([
				this.margins.left,
				this.svgDimensions.width - this.margins.right
			]);
		this.yScale = scaleLinear().range([
			this.svgDimensions.height - this.margins.bottom,
			this.margins.top
		]);

		//Axes
		this.xAxis = axisBottom(this.xScale).tickSizeOuter(
			-(
				this.svgDimensions.height -
				this.margins.top -
				this.margins.bottom
			)
		);
		this.yAxis = axisLeft(this.yScale).tickSize(
			-(this.svgDimensions.width - this.margins.right - this.margins.left)
		);
	}

	componentDidMount() {
		//Score data sorted in chronological order
		const { scores, displayStat } = this.props;
		let reversedScores;
		//Store up to the latest 20 scores in chronological order for handicap calculation
		if (scores.length > 20) {
			reversedScores = scores.slice(0, 20).reverse();
		} else {
			reversedScores = scores.slice().reverse();
		}

		//Determine Min and Max values for various stat data for chart y-axis scaling
		let min = 0,
			max;
		switch (displayStat) {
			case "differential": {
				[min, max] = extent(
					reversedScores.map(score => score[displayStat])
				);
				if (min > 0) {
					min = 0;
				}
				break;
			}
			default: {
				max = max(reversedScores.map(score => score[displayStat]));
			}
		}

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
			const dateString = dayjs(filtered[0].date).format("MMM D[,] YYYY");
			return dateString;
		});

		//Draw Axes
		select(this.refs.xAxis).call(this.xAxis);
		select(this.refs.yAxis).call(this.yAxis);

		this.setState({ reversedScores });
	}

	componentDidUpdate(prevProps) {
		//If a user has added a score or changed the stat to display update the chart axes and data
		if (
			prevProps.scores.length !== this.props.scores.length ||
			prevProps.displayStat !== this.props.displayStat
		) {
			//Score data sorted in chronological order
			const { scores, displayStat } = this.props;
			let reversedScores;
			//Store up to the latest 20 scores in chronological order for handicap calculation
			if (scores.length > 20) {
				reversedScores = scores.slice(0, 20).reverse();
			} else {
				reversedScores = scores.slice().reverse();
			}

			//Determine Min and Max values for various stat data for chart y-axis scaling
			let min = 0,
				max;
			switch (displayStat) {
				case "differential": {
					[min, max] = extent(
						reversedScores.map(score => score[displayStat])
					);
					if (min > 0) {
						min = 0;
					}
					break;
				}
				default: {
					max = max(reversedScores.map(score => score[displayStat]));
				}
			}

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
			select(this.refs.xAxis).call(this.xAxis);
			select(this.refs.yAxis).call(this.yAxis);

			this.setState({ reversedScores });
		}
		//Handle Window Resize
		if (
			prevProps.width !== this.props.width ||
			prevProps.height !== this.props.height
		) {
			//Scales
			this.xScale = scaleBand()
				.padding(0.5)
				.rangeRound([
					this.margins.left,
					this.props.width - this.margins.right
				]);
			this.yScale = scaleLinear().range([
				this.props.height - this.margins.bottom,
				this.margins.top
			]);

			//Axes
			this.xAxis = axisBottom(this.xScale).tickSizeOuter(
				-(this.props.height - this.margins.top - this.margins.bottom)
			);
			this.yAxis = axisLeft(this.yScale).tickSize(
				-(this.props.width - this.margins.right - this.margins.left)
			);
			//Score data sorted in chronological order
			const { scores, displayStat } = this.props;
			let reversedScores;
			//Store up to the latest 20 scores in chronological order for handicap calculation
			if (scores.length > 20) {
				reversedScores = scores.slice(0, 20).reverse();
			} else {
				reversedScores = scores.slice().reverse();
			}

			//Determine Min and Max values for various stat data for chart y-axis scaling
			let min = 0,
				max;
			switch (displayStat) {
				case "differential": {
					[min, max] = extent(
						reversedScores.map(score => score[displayStat])
					);
					if (min > 0) {
						min = 0;
					}
					break;
				}
				default: {
					max = max(reversedScores.map(score => score[displayStat]));
				}
			}
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
			select(this.refs.xAxis).call(this.xAxis);
			select(this.refs.yAxis).call(this.yAxis);
		}
	}

	render() {
		const { displayStat } = this.props;
		let bars = null;
		if (this.state.reversedScores.length > 0) {
			const { reversedScores } = this.state;
			bars = reversedScores.map(score => {
				let color = "positive";
				if (score.differential < 0 && displayStat === "differential") {
					color = "negative";
				}
				return (
					<rect
						className={color}
						key={score.id}
						x={this.xScale(score.id)}
						y={Math.min(
							this.yScale(score[displayStat]),
							this.yScale(0)
						)}
						height={Math.abs(
							this.yScale(score[displayStat]) - this.yScale(0)
						)}
						width={this.xScale.bandwidth()}
					/>
				);
			});
		}

		return (
			<svg width={this.props.width} height={this.props.height}>
				<g>
					<g
						className="axis axis-bottom"
						ref="xAxis"
						transform={`translate(0, ${this.props.height -
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
