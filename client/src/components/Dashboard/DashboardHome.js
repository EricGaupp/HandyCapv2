import React from "react";
import { connect } from "react-redux";

import LineGraph from "./LineGraph";

import calculateHandicapIndex from "utilities/calculateHandicapIndex";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

class DashboardHome extends React.Component {
	state = { containerWidth: 0, containerHeight: 0 };

	setRef = element => {
		this.container = element;
	};

	updateDimensions = () => {
		const dimensions = this.container.getBoundingClientRect();
		this.setState({
			containerWidth: dimensions.width,
			containerHeight: dimensions.height
		});
	};

	componentDidMount() {
		//Get Initial Container Size
		this.setState({
			containerWidth: this.container.offsetWidth,
			containerHeight: this.container.offsetHeight
		});
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	render() {
		const { scores } = this.props;

		//Create an array of objects containing date, scoreId and handicap index data to pass in as a prop to linegraph
		const handicapIndexArray = [];

		//Calculate the handicap index for each of the 20 most recent scores
		for (let i = 0; i < Math.min(scores.length, 20); i++) {
			//Grab the interval of scores relevant to handicap calculation (previous 20 rounds at most)
			const indexScores = scores.slice(i, i + 20);
			const handicapIndex = calculateHandicapIndex(indexScores);
			const dataPoint = Object.assign(
				{},
				{
					id: scores[i].id,
					date: scores[i].date,
					handicapIndex: handicapIndex
				}
			);
			handicapIndexArray.unshift(dataPoint);
		}

		return (
			<div className="container-fluid">
				<div id="lineGraphContainer" ref={this.setRef}>
					{scores.length > 4 ? (
						<LineGraph
							width={this.state.containerWidth}
							height={this.state.containerHeight}
							handicaps={handicapIndexArray}
						/>
					) : (
						<h3>Need at least 5 rounds to have a valid handicap</h3>
					)}
				</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(DashboardHome);
