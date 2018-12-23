import React from "react";
import { Route, Switch } from "react-router-dom";

const DashboardContent = props => {
	console.log(props.match.url);
	return (
		<main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
						path={`${props.match.url}/stats`}
						render={() => {
							return <h1>Stats</h1>;
						}}
					/>
					<Route
						render={() => {
							return <h1>404: Page not Found</h1>;
						}}
					/>
				</Switch>
			</div>
		</main>
	);
};

export default DashboardContent;
