import React from "react";
import { Link } from "react-router-dom";

const LoginNav = () => {
	return (
		<nav className="navbar fixed-top">
			<Link to="/" className="navbar-brand">
				HandyCap
			</Link>
			<div className="navbar-nav">
				<Link className="nav-item nav-link" to="/login">
					Login
				</Link>
			</div>
		</nav>
	);
};

export default LoginNav;
