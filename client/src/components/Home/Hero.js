import React from "react";
import styled from "styled-components";
import splash from "../../images/splash.png";

const HeroDiv = styled.div`
	background-image: url(${splash});
	background-position: center top;
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;

	height: 700px;
`;

const Title = styled.h1`
	margin-top: 0;
	padding-top: 5em;
`;

const Hero = () => (
	<HeroDiv>
		<Title>The Best Score Tracking App on the Internet</Title>
	</HeroDiv>
);

export default Hero;
