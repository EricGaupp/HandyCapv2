import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";

import DashboardAddScore from "./DashboardAddScore";
import NewHome from "./NewHome";
import DashboardStats from "./DashboardStats";
import DashboardScores from "./DashboardScores";
import DashboardScoreEdit from "./DashboardScoreEdit";

const AnimatedContainer = styled(animated.div)`
	grid-area: dashboardContent;
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

//get dimensions via useRef, pass as props to svg or other components as required

const DashboardContent = props => {
	const { location } = props;
	const transition = useTransition(location, location => location.pathname, {
		from: { opacity: 0, transform: `translate(0,-100%)` },
		enter: { opacity: 1, transform: `translate(0,0%)` },
		leave: { opacity: 0, transform: `translate(0,100%)` }
	});

	return transition.map(({ item, key, props }) => (
		<AnimatedContainer key={key} style={props}>
			<Switch location={item}>
				<Route exact path="/dashboard" component={NewHome} />
				<Route
					exact
					path="/dashboard/scores"
					component={DashboardScores}
				/>
				<Route
					path="/dashboard/scores/:id"
					component={DashboardScoreEdit}
				/>
				<Route
					exact
					path="/dashboard/stats"
					component={DashboardStats}
				/>
				<Route
					exact
					path="/dashboard/post"
					component={DashboardAddScore}
				/>
				<Route
					render={() => {
						return <h1>404: Page not Found</h1>;
					}}
				/>
			</Switch>
		</AnimatedContainer>
	));
};

export default DashboardContent;
