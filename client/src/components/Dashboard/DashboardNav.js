import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { FiEdit2, FiFlag, FiHome, FiTrendingUp } from "react-icons/fi";

const Header = styled.nav`
	grid-area: dashboardSidebar;
	background-color: #406347;
	z-index: 99;
`;

const NavList = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
	display: flex;

	@media (min-width: 600px) {
		flex-flow: column nowrap;
	}
`;

const NavItem = styled.li`
	margin: 0;
	padding: 1em 0;
	color: #fff;
	text-align: center;
	flex: 0 0 25%;
	display: block;
	line-height: 0;

	@media (min-width: 600px) {
		line-height: normal;
		padding: 0;
		text-align: left;
	}
`;

const StyledLink = styled(Link)`
	display: block;
	text-decoration: none;
	color: inherit;

	span {
		display: none;
	}

	@media (min-width: 600px) {
		padding: 1em 0;
		padding-left: 2em;

		span {
			display: inline;
			font-size: 28px;
			margin-left: 0.5em;
		}
	}
`;

const StyledHome = styled(FiHome)`
	font-size: 28px;

	@media (min-width: 600px) {
		position: relative;
		top: 0.1em;
	}
`;

const StyledScores = styled(FiFlag)`
	font-size: 28px;

	@media (min-width: 600px) {
		position: relative;
		top: 0.1em;
	}
`;

const StyledStats = styled(FiTrendingUp)`
	font-size: 28px;

	@media (min-width: 600px) {
		position: relative;
		top: 0.1em;
	}
`;

const StyledAdd = styled(FiEdit2)`
	font-size: 28px;

	@media (min-width: 600px) {
		position: relative;
		top: 0.1em;
	}
`;

const DashboardNav = props => {
	return (
		<Header>
			<NavList>
				<NavItem>
					<StyledLink to={`${props.match.url}`}>
						<StyledHome />
						<span>Home</span>
					</StyledLink>
				</NavItem>
				<NavItem>
					<StyledLink to={`${props.match.url}/scores`}>
						<StyledScores />
						<span>Scores</span>
					</StyledLink>
				</NavItem>
				<NavItem>
					<StyledLink to={`${props.match.url}/stats`}>
						<StyledStats />
						<span>Stats</span>
					</StyledLink>
				</NavItem>
				<NavItem>
					<StyledLink to={`${props.match.url}/post`}>
						<StyledAdd />
						<span>Post Score</span>
					</StyledLink>
				</NavItem>
			</NavList>
		</Header>
	);
};

export default DashboardNav;
