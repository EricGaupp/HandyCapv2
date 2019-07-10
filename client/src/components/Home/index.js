import React from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Hero from "./Hero";
import Overview from "./Overview";

//import SplashImage from "../images/splash.jpeg";

// const SplashContainer = styled.div`
// 	position: relative;
// 	width: 100%;
// 	height: 100%;
// 	background-attachment: fixed;
// 	background-repeat: no-repeat;
// 	background-size: cover;
// 	background-position: 50% 50%;
// 	background-image: url(${SplashImage});
// 	z-index: -1;
// `;

const Home = () => {
	return (
		<React.Fragment>
			<Hero />
			<Container>
				<Row>
					<Col>
						<Overview />
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};

export default Home;
