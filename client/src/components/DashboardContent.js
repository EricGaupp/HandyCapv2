import React from "react";
import { Route, Switch } from "react-router-dom";

import Scores from "./Scores";

const DashboardContent = props => {
	return (
		<div className="col ml-auto">
			<Switch>
				<Route
					exact
					path={props.match.url}
					render={() => {
						return <h1>Dashboard Home</h1>;
					}}
				/>
				<Route
					exact
					path={`${props.match.url}/scores`}
					component={Scores}
				/>
				<Route
					exact
					path={`${props.match.url}/stats`}
					render={() => {
						return <h1>Stats</h1>;
					}}
				/>
				<Route
					exact
					path={`${props.match.url}/post`}
					render={() => {
						return <h1>Post A Score</h1>;
					}}
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
