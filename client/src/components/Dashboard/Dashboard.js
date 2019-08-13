import React from "react";
import styled from "styled-components";

import DashboardNav from "./DashboardNav";
import DashboardContent from "./DashboardContent";

const DashboardContainer = styled.div`
	position: relative;
	width: 100%;
	display: grid;
	overflow: hidden;
	grid-template-columns: 1fr;
	grid-template-rows: auto auto;
	grid-template-areas:
		"dashboardSidebar"
		"dashboardContent";

	@media (min-width: 600px) {
		height: calc(100vh - 97px);
		grid-template-columns: 20% 1fr;
		grid-template-rows: 100%;
		grid-template-areas: "dashboardSidebar dashboardContent";
	}
`;

const Dashboard = props => {
	return (
		<DashboardContainer>
			<DashboardNav {...props} />
			<DashboardContent {...props} />
		</DashboardContainer>
	);
};

export default Dashboard;
