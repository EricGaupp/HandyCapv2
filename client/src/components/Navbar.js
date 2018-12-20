import React from "react";
import "Navbar.css";

const Navbar = ({ user }) => {
	return (
		<nav className="navbar navbar-expand-lg justify-content-center fixed-top navbar-dark bg-dark">
			<a className="navbar-brand" href="/">
				HandyCap
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div
				className="collapse navbar-collapse"
				id="navbarSupportedContent"
			>
				{user ? (
					<span className="navbar-text ml-auto">
						Welcome, {user}!
					</span>
				) : (
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<a className="nav-link" href="/">
								Login
								<span className="sr-only">(current)</span>
							</a>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
