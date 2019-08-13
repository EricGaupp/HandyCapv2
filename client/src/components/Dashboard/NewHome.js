import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import calculateHandicapIndex from "../../utilities/calculateHandicapIndex";

import NewLineGraph from "./NewLineGraph";

//Connect to redux store for scores
const mapStateToProps = state => {
	return {
		scores: state.scores.data
	};
};

const Container = styled.div`
	grid-area: dashboardContent;
	overflow: auto;
`;

const NewHome = ({ scores }) => {
	const [width, setWidth] = useState(null);
	const [height, setHeight] = useState(null);

	const container = useRef(null);

	//Attach resize event listener when container ref is set
	useEffect(() => {
		const handleResize = () => {
			const dimensions = container.current.getBoundingClientRect();
			setWidth(dimensions.width);
			setHeight(dimensions.height);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [container.current]);

	const handicapIndexArray = [];

	//Calculate the handicap index for each of the 20 most recent scores
	for (let i = 0; i < Math.min(scores.length, 20); i++) {
		//Grab the interval of scores relevant to handicap calculation (previous 20 rounds at most)
		const indexScores = scores.slice(i, i + 20);
		const handicapIndex = calculateHandicapIndex(indexScores);
		const dataPoint = Object.assign(
			{},
			{
				id: scores[i].id,
				date: scores[i].date,
				handicapIndex: handicapIndex
			}
		);
		handicapIndexArray.unshift(dataPoint);
	}

	//Filter out null values for graphing purposes
	const graphValues = handicapIndexArray.filter(
		score => score.handicapIndex !== null
	);

	return (
		<Container id="lineGraphContainer" ref={container}>
			{scores.length > 4 ? (
				<NewLineGraph
					width={width}
					height={height}
					handicaps={graphValues}
				/>
			) : (
				<h3>Must have at least 5 scores to have a valid handicap</h3>
			)}
		</Container>
	);
};

export default connect(
	mapStateToProps,
	null
)(NewHome);
