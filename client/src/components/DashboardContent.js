import React from "react";
import { Route, Switch } from "react-router-dom";

import DashboardAddScore from "./DashboardAddScore";
import DashboardHome from "./DashboardHome";
import DashboardStats from "./DashboardStats";
import DashboardScores from "./DashboardScores";
import DashboardScoreEdit from "./DashboardScoreEdit";

const DashboardContent = props => {
	return (
		<div className="dashboardContent">
			<Switch>
				<Route exact path={props.match.url} component={DashboardHome} />
				<Route
					exact
					path={`${props.match.url}/scores`}
					component={DashboardScores}
				/>
				<Route
					path={`${props.match.url}/scores/:id`}
					component={DashboardScoreEdit}
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
