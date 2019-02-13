import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
	return (
		<div className="contentWrapper splashBackground">
			<div className="container">
				<div className="jumbotron transparent mt-4">
					<h1 className="display-4">Welcome to HandyCap!</h1>
					<p className="lead">
						HandyCap is a score tracking and handicap calculation
						application for the serious golfer. Choose a course from
						our database, or request to add a course, then simply
						enter your score. HandyCap will automatically calculate
						your handicap after enough rounds have been tracked.
						Learn more about handicap calculation{" "}
						<Link to="/calculate">here</Link>.
					</p>
					<hr className="my-4" />
					<p>More potential information about HandyCap.</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
