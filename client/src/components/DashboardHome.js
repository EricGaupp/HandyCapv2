import React from "react";

import HandicapGraphic from "./HandicapGraphic";
import BarChart from "./BarChart";

const DashboardHome = props => {
	return (
		<React.Fragment>
			<h1>Dashboard Home</h1>
			<HandicapGraphic />
			<BarChart />
		</React.Fragment>
	);
};

export default DashboardHome;
