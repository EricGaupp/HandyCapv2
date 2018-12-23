import React from "react";
import { Link } from "react-router-dom";

const DashboardNav = props => {
	return (
		<nav className="col-md-2 d-none d-md-block bg-light sidebar text-center">
			<div className="sidebar-sticky">
				<ul className="nav flex-column">
					<li className="nav-item">
						<Link to={`${props.match.url}`} className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link
							to={`${props.match.url}/scores`}
							className="nav-link"
						>
							Scores
						</Link>
					</li>
					<li className="nav-item">
						<Link
							to={`${props.match.url}/stats`}
							className="nav-link"
						>
							Stats
						</Link>
					</li>
					<li className="nav-item">
						<Link
							to={`${props.match.url}/post`}
							className="nav-link"
						>
							Post Score
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default DashboardNav;
