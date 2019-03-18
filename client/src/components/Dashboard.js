import React from "react";

import "./Dashboard.css";

import DashboardNav from "./DashboardNav";
import DashboardContent from "./DashboardContent";

const Dashboard = props => {
	return (
		<div className="dashboardContainer">
			<DashboardNav {...props} />
			<DashboardContent {...props} />
		</div>
	);
};

export default Dashboard;
