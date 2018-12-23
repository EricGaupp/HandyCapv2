import React from "react";
import { Link } from "react-router-dom";

import { FiEdit2, FiFlag, FiHome, FiPlus, FiTrendingUp } from "react-icons/fi";

const DashboardNav = props => {
	return (
		<nav className="col-md-2 d-none d-md-block bg-light sidebar text-center">
			<div className="sidebar-sticky">
				<div className="flex-column">
					<Link
						to={`${props.match.url}`}
						className="nav-link text-dark"
					>
						<div className="d-flex justify-content-center align-items-center">
							<FiHome />
							<span className="ml-1">Home</span>
						</div>
					</Link>
					<Link
						to={`${props.match.url}/scores`}
						className="nav-link text-dark"
					>
						<div className="d-flex justify-content-center align-items-center">
							<FiFlag />
							<span className="ml-1">Scores</span>
						</div>
					</Link>
					<Link
						to={`${props.match.url}/stats`}
						className="nav-link text-dark"
					>
						<div className="d-flex justify-content-center align-items-center">
							<FiTrendingUp />
							<span className="ml-1">Stats</span>
						</div>
					</Link>
					<Link
						to={`${props.match.url}/post`}
						className="nav-link text-dark"
					>
						<div className="d-flex justify-content-center align-items-center">
							<FiEdit2 />
							<span className="ml-1">Post Score</span>
						</div>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default DashboardNav;
