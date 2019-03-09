import React from "react";

import Select from "react-select";
import HandicapGraphic from "./HandicapGraphic";
import BarChart from "./BarChart";

class DashboardHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectOptions: [
				{ value: "differential", label: "Differentials" },
				{ value: "gross", label: "Gross" },
				{ value: "adjustedGross", label: "Adjusted Gross" },
				{ value: "net", label: "Net" }
			],
			statToDisplay: "gross"
		};
	}

	onSelectChange = option => {
		console.log(option);
		this.setState({ statToDisplay: option.value });
	};

	render() {
		return (
			<React.Fragment>
				<h1>Dashboard Home</h1>
				<Select
					id="courseNameSearch"
					autoFocus={true}
					options={this.state.selectOptions}
					onChange={this.onSelectChange}
				/>
				<HandicapGraphic />
				{/*TODO Pass in stat from selected*/}
				<BarChart displayStat={this.state.statToDisplay} />
			</React.Fragment>
		);
	}
}

export default DashboardHome;
