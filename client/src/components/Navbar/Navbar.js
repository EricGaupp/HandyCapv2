import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../images/svgLogo.svg";
import { MdMenu } from "react-icons/md";
import LoginNav from "./LoginNav";
import UserNav from "./UserNav";

//Components common to both logged-in and logged-out states
const Header = styled.header`
	position: relative;
	z-index: 1;
	background-color: #d9d9d6;

	@media (min-width: 600px) {
		box-shadow: 0 3px 5px grey;
	}
`;

const HeaderContainer = styled.div`
	margin: 0 auto;
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-rows: minmax(51px, auto) auto;
	grid-template-areas:
		"logo brand menuButton"
		"navLinks navLinks navLinks";
	align-items: center;
`;

const StyledLogo = styled(Logo)`
	grid-area: logo;
	width: 30px;
	height: 30px;
	margin: 0 0.5em;
	fill: #406347;
`;

const Brand = styled.span`
	grid-area: brand;
	color: #333;
	letter-spacing: 2px;
`;

const StyledMdMenu = styled(MdMenu)`
	grid-area: menuButton;
	display: block;

	font-size: 48px;
	color: #333;

	@media (min-width: 600px) {
		display: none;
	}
`;

const NavContainer = styled.nav`
	position: relative;
	grid-area: navLinks;
	display: ${props => (props.isOpen ? "block" : "none")};

	@media (min-width: 600px) {
		grid-area: menuButton;
		display: block;
	}
`;

export const NavList = styled.ul`
	margin: 0;
	padding: 0;
	display: flex;
	flex-flow: column;

	@media (min-width: 600px) {
		height: 100%;
		list-style-type: none;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		margin: 0;
		padding: 0;
	}
`;

export const NavItem = styled.li`
	display: block;
	cursor: pointer;
	margin: 0;
	padding: 1em;
	padding-left: 0.5em;
	color: #333;

	&:first-child {
		border-top: 1px solid #333;
	}

	@media (min-width: 600px) {
		padding: 1em;

		&:hover {
			color: white;
			background-color: #406347;
		}
		&:first-child {
			border-top: none;
		}
		&:last-child {
			margin-right: 0;
		}
	}
`;

export const NavLink = styled(Link)`
	display: block;
	text-decoration: none;
	color: inherit;
`;

//Mapping Redux State to Props
const mapStateToProps = state => ({
	user: state.user
});

//Exported Composite Component
const Navbar = ({ user }) => {
	//Boolean to control if navigation menu is collapsed or visible
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Header>
			<HeaderContainer>
				<StyledLogo />
				<Brand>SwingStats</Brand>
				<NavContainer isOpen={isOpen}>
					{user.isAuthenticated ? <UserNav /> : <LoginNav />}
				</NavContainer>
				<StyledMdMenu
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				/>
			</HeaderContainer>
		</Header>
	);
};

export default connect(
	mapStateToProps,
	null
)(Navbar);
