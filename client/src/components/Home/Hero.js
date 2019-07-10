import React from "react";
import styled from "styled-components";
import splash from "../../images/splash.png";

const HeroDiv = styled.div`
	background-image: url(${splash});
	background-position: center bottom;
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;

	height: 700px;
`;

const Title = styled.h1`
	padding-top: 5em;

	@media (max-width: 450px) {
		margin-top: 2em;
		margin-bottom: 1em;
	}
`;

const Hero = () => (
	<HeroDiv>
		<Title>The Best Score Tracking App on the Internet</Title>
	</HeroDiv>
);

export default Hero;
