import React from "react";
import { Link } from "react-router-dom";

import { FiEdit2, FiFlag, FiHome, FiTrendingUp } from "react-icons/fi";

const DashboardNav = props => {
	return (
		<div className="sidebar">
			<Link to={`${props.match.url}`} className="nav-link text-light">
				<div className="sidebar-item">
					<FiHome />
					<span className="ml-1">Home</span>
				</div>
			</Link>
			<Link
				to={`${props.match.url}/scores`}
				className="nav-link text-light"
			>
				<div className="sidebar-item">
					<FiFlag />
					<span className="ml-1">Scores</span>
				</div>
			</Link>
			<Link
				to={`${props.match.url}/stats`}
				className="nav-link text-light"
			>
				<div className="sidebar-item">
					<FiTrendingUp />
					<span className="ml-1">Stats</span>
				</div>
			</Link>
			<Link
				to={`${props.match.url}/post`}
				className="nav-link text-light"
			>
				<div className="sidebar-item">
					<FiEdit2 />
					<span className="ml-1">Post Score</span>
				</div>
			</Link>
		</div>
	);
};

export default DashboardNav;
