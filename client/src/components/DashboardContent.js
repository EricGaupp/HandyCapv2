import React from "react";
import { Route, Switch } from "react-router-dom";

const DashboardContent = props => {
	return (
		<div className="col-md-10 ml-auto">
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
					render={() => {
						return <h1>Scores</h1>;
					}}
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
