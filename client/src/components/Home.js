import React from "react";

import "./Home.css";

const Home = () => {
	return (
		<React.Fragment>
			<div className="splashBackground" />
			<div className="container mt-4">
				<div className="jumbotron transparent">
					<h1 className="display-4">Welcome to HandyCap!</h1>
					<p className="lead">
						HandyCap is a score tracking and handicap calculation
						application for the serious golfer. Choose a course from
						our database, or request to add a course, then simply
						enter your score. HandyCap will automatically calculate
						your handicap after enough rounds have been tracked.
						Learn more about handicap calculation{" "}
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="http://www.usga.org/handicapping/handicap-manual.html#!rule-14367"
						>
							here
						</a>
						.
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Home;
