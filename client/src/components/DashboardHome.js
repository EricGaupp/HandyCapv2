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
			statToDisplay: "differential"
		};
	}

	onSelectChange = option => {
		this.setState({ statToDisplay: option.value });
	};

	render() {
		return (
			<React.Fragment>
				<Select
					id="statSelect"
					autoFocus={true}
					isClearable={false}
					isSearchable={false}
					defaultValue={this.state.selectOptions[0]}
					options={this.state.selectOptions}
					onChange={this.onSelectChange}
				/>
				<HandicapGraphic />
				<BarChart displayStat={this.state.statToDisplay} />
			</React.Fragment>
		);
	}
}

export default DashboardHome;
