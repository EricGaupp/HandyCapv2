import React from "react";
import { Route, Switch } from "react-router-dom";

import DashboardAddScore from "./DashboardAddScore";
import DashboardHome from "./DashboardHome";
import DashboardStats from "./DashboardStats";
import DashboardScores from "./DashboardScores";

import "DashboardContent.css";

const DashboardContent = props => {
	return (
		<div className="dashboardContent col">
			<Switch>
				<Route exact path={props.match.url} component={DashboardHome} />
				<Route
					exact
					path={`${props.match.url}/scores`}
					component={DashboardScores}
				/>
				<Route
					exact
					path={`${props.match.url}/stats`}
					component={DashboardStats}
				/>
				<Route
					exact
					path={`${props.match.url}/post`}
					component={DashboardAddScore}
				/>
				<Route
					render={() => {
						return <h1>404: Page not Found</h1>;
					}}
				/>
			</Switch>
		</div>
	);
};

export default DashboardContent;
