import React from "react";

import "Dashboard.css";

import DashboardNav from "DashboardNav";
import DashboardContent from "DashboardContent";

const Dashboard = props => {
	return (
		<div className="container-fluid">
			<div className="row">
				<DashboardNav {...props} />
				<DashboardContent {...props} />
			</div>
		</div>
	);
};

export default Dashboard;
