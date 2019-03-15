import React from "react";

import Select from "react-select";
import BarChart from "./BarChart";

class DashboardStats extends React.Component {
	constructor(props) {
		super(props);

		this.container = null;

		this.setRef = element => {
			this.container = element;
		};

		this.state = {
			containerWidth: null,
			containerHeight: null,
			selectOptions: [
				{ value: "differential", label: "Differentials" },
				{ value: "gross", label: "Gross" },
				{ value: "adjustedGross", label: "Adjusted Gross" },
				{ value: "net", label: "Net" }
			],
			statToDisplay: "differential"
		};
	}

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
		const {
			containerWidth,
			containerHeight,
			selectOptions,
			statToDisplay
		} = this.state;
		//Account for container padding
		const width = containerWidth - 30;
		const height = containerHeight - 56 - 38;
		return (
			<div className="container-fluid" ref={this.setRef}>
				{containerWidth && (
					<React.Fragment>
						<h1>{`Width: ${containerWidth}, Height: ${containerHeight}`}</h1>
						<Select
							id="statSelect"
							autoFocus={true}
							isClearable={false}
							isSearchable={false}
							defaultValue={this.state.selectOptions[0]}
							options={selectOptions}
							onChange={this.onSelectChange}
						/>
						<BarChart
							displayStat={statToDisplay}
							width={width}
							height={height}
						/>
					</React.Fragment>
				)}
			</div>
		);
	}
}

export default DashboardStats;
