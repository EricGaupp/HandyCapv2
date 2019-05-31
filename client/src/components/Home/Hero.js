import React from "react";
import styled from "styled-components";

const HeroDiv = styled.div`
	margin-top: 10rem;
	margin-bottom: 3rem;

	@media (max-width: 450px) {
		margin-top: 2rem;
		margin-bottom: 1rem;
	}
`;

const Title = styled.h1`
	text-align: center;
`;

const Hero = () => (
	<HeroDiv>
		<Title>The Best Score Tracking App on the Internet</Title>
	</HeroDiv>
);

export default Hero;
