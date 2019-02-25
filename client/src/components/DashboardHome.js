import React from "react";

import HandicapGraphic from "./HandicapGraphic";
import ScoresBarChart from "./ScoresBarChart";

const DashboardHome = props => {
	return (
		<div className="col mx-auto">
			<h1>Dashboard Home</h1>
			<HandicapGraphic />
			<ScoresBarChart width={800} height={300} />
		</div>
	);
};

export default DashboardHome;
