import React from "react";
import { Link } from "react-router-dom";

const UserNav = ({ name }) => {
	return (
		<nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
			<Link to="/" className="navbar-brand">
				HandyCap
			</Link>
			<div
				className="collapse navbar-collapse justify-content-end"
				id="navbarNavDropdown"
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
