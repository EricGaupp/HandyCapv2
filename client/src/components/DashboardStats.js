import React from "react";
import { connect } from "react-redux";

import Select from "react-select";
import BarChart from "./BarChart";

const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

class DashboardStats extends React.Component {
	state = {
		containerWidth: 0,
		containerHeight: 0,
		selectOptions: [
			{ value: "differential", label: "Differentials" },
			{ value: "gross", label: "Gross" },
			{ value: "adjustedGross", label: "Adjusted Gross" },
			{ value: "net", label: "Net" }
		],
		statToDisplay: "differential"
	};

	container = null;

	setRef = element => {
		this.container = element;
	};

	onSelectChange = option => {
		this.setState({ statToDisplay: option.value });
	};

	updateDimensions = () => {
		const dimensions = this.container.getBoundingClientRect();
		this.setState({
			containerWidth: dimensions.width,
			containerHeight: dimensions.height
		});
	};

	componentDidMount() {
		if (this.container !== null) {
			this.setState({
				containerWidth: this.container.offsetWidth,
				containerHeight: this.container.offsetHeight
			});

			window.addEventListener("resize", this.updateDimensions);
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	render() {
		if (this.props.scores.length < 1) {
			return <h3>Need Scores to show stats!</h3>;
		}
		const {
			containerWidth,
			containerHeight,
			selectOptions,
			statToDisplay
		} = this.state;
		//Arrange 20 most recent scores in chronological order to pass to BarChart component
		const scores = this.props.scores.slice(0, 20).reverse();

		return (
			<div className="container-fluid">
				<div id="barChartContainer" ref={this.setRef}>
					<Select
						id="statSelect"
						autoFocus={true}
						isClearable={false}
						isSearchable={false}
						defaultValue={this.state.selectOptions[0]}
						options={selectOptions}
						onChange={this.onSelectChange}
					/>
					{containerHeight > 0 && (
						<BarChart
							displayStat={statToDisplay}
							width={containerWidth}
							height={containerHeight - 38}
							scores={scores}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	null
)(DashboardStats);
