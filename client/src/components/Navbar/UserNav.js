import React from "react";
import { connect } from "react-redux";

import { logout } from "../../actions/userActions";

import { NavItem, NavList, NavLink } from "./Navbar";

//Mapping Redux Dispatch to Props
const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout())
	};
};

//Component to show authenticated users
const UserNav = () => {
	return (
		<React.Fragment>
			<NavList>
				<NavItem>
					<NavLink to="/">Home</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/news">News</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/dashboard">Dashboard</NavLink>
				</NavItem>
				<NavItem>Log Out</NavItem>
			</NavList>
		</React.Fragment>
	);
};

// const UserNav = props => {
// 	return (
// 		<nav className="navbar navbar-expand-md fixed-top">
// 			<div className="navbarLogoContainer">
// 				<Logo width="24px" height="24px" />
// 				<span className="ml-2">SwingStats</span>
// 			</div>
// 			<button
// 				className="navbar-toggler"
// 				type="button"
// 				data-toggle="collapse"
// 				data-target="#mainNavbar"
// 				aria-controls="mainNavbar"
// 				aria-expanded="false"
// 				aria-label="Toggle navigation"
// 			>
// 				<IconContext.Provider
// 					value={{ color: "#406347", size: "1.25em" }}
// 				>
// 					<FiMenu />
// 				</IconContext.Provider>
// 			</button>
// 			<div
// 				className="collapse navbar-collapse justify-content-end"
// 				id="mainNavbar"
// 			>
// 				<div className="navbar-nav">
// 					<Link className="nav-item nav-link" to="/">
// 						Home
// 					</Link>
// 					<Link className="nav-item nav-link" to="/news">
// 						News
// 					</Link>
// 					<Link className="nav-item nav-link" to="/dashboard">
// 						Dashboard
// 					</Link>
// 					<Link
// 						className="nav-item nav-link"
// 						onClick={props.logout}
// 						to="/"
// 					>
// 						Log Out
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

export default connect(
	null,
	mapDispatchToProps
)(UserNav);
