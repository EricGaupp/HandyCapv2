import React from "react";
import { Link } from "react-router-dom";

const UserNav = ({ name }) => {
	return (
		<nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
			<Link to="/" className="navbar-brand">
				HandyCap
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#mainNavbar"
				aria-controls="mainNavbar"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div
				className="collapse navbar-collapse justify-content-end"
				id="mainNavbar"
			>
				<div className="navbar-nav">
					<Link className="nav-item nav-link active" to="/">
						Home <span className="sr-only">(current)</span>
					</Link>
					<Link className="nav-item nav-link" to="/news">
						News
					</Link>
					<Link className="nav-item nav-link" to="/dashboard">
						Dashboard
					</Link>
					<Link className="nav-item nav-link" to="/logout">
						Log Out
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default UserNav;
