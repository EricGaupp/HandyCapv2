import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../images/svgLogo.svg";

const LoginNav = () => {
	return (
		<nav className="navbar fixed-top">
			<div className="navbarLogoContainer">
				<Logo width="24px" height="24px" />
				<span className="ml-2">HandyCap</span>
			</div>
			<div className="navbar-nav">
				<Link className="nav-item nav-link" to="/login">
					Login
				</Link>
			</div>
		</nav>
	);
};

export default LoginNav;
