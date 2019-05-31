import React from "react";
import styled from "styled-components";

import { IconContext } from "react-icons";
import { FaListOl, FaCalculator, FaChartBar } from "react-icons/fa";

const StyledDiv = styled.div`
	margin-top: 2rem;
	margin-bottom: 1rem;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-evenly;

	@media (max-width: 450px) {
		flex-flow: column nowrap;
	}
`;

const StyledCard = styled.div`
	display: flex;
	flex-flow: column nowrap;
	flex: 0 0 30%;
	margin-bottom: 3rem;
`;

const StyledSVGContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
`;

const StyledCardTitle = styled.h2`
	color: #5e6572;
	text-align: center;
`;

const StyledCardText = styled.h6`
	color: #9c9990;
	text-align: center;
`;

const Overview = () => (
	<StyledDiv>
		<StyledCard>
			<StyledSVGContainer>
				<IconContext.Provider
					value={{ color: "#7D8CC4", size: "8rem" }}
				>
					<FaListOl />
				</IconContext.Provider>
			</StyledSVGContainer>
			<StyledCardTitle>Score Tracking</StyledCardTitle>
			<StyledCardText>Find your course and post a score</StyledCardText>
		</StyledCard>
		<StyledCard>
			<StyledSVGContainer>
				<IconContext.Provider
					value={{ color: "#5E6572", size: "8rem" }}
				>
					<FaCalculator />
				</IconContext.Provider>
			</StyledSVGContainer>
			<StyledCardTitle>Handicap Calculation</StyledCardTitle>
			<StyledCardText>Leave the math to us</StyledCardText>
		</StyledCard>
		<StyledCard>
			<StyledSVGContainer>
				<IconContext.Provider
					value={{ color: "#82C09A", size: "8rem" }}
				>
					<FaChartBar />
				</IconContext.Provider>
			</StyledSVGContainer>
			<StyledCardTitle>Stat Analysis</StyledCardTitle>
			<StyledCardText>Dig deeper into your game</StyledCardText>
		</StyledCard>
	</StyledDiv>
);

export default Overview;
