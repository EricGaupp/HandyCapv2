import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { useSpring, animated } from "react-spring";

const StyledSVG = styled(animated.svg)`
	display: block;
	stroke-dashoffset: ${props => props.trace.x};
`;

const Group = styled.g`
	transform: ${props =>
		`translate(${props.margins.left}px,${props.margins.top}px)`};
`;

const Line = styled.path`
	fill: none;
	stroke: #fade47;
	stroke-width: 3;
`;

const Point = styled.circle`
	fill: #406347;
	stroke: #fff;
	stroke-width: 3;

	:hover {
		fill: #ff6b6b;
	}
`;

const NewLineGraph = ({ width, height, handicaps }) => {
	//Animation styling
	const trace = useSpring({ x: 100, from: { x: 0 } });

	//SVG Margins
	//TODO Change via mediaqueries
	const margins = { top: 20, right: 30, bottom: 70, left: 70 };

	//D3 Scales
	const xScale = d3
		.scalePoint()
		.domain(handicaps.map(d => d.id))
		.range([0, width - margins.left - margins.right]);

	//Extract minimum and maximum value of handicaps for y-axis scaling
	const [min, max] = d3.extent(handicaps.map(d => d.handicapIndex));
	const yScale = d3
		.scaleLinear()
		.domain([min, max])
		.range([height - margins.top - margins.bottom, 0]);

	//D3 Line Generator
	const createLine = d3
		.line()
		.x(d => xScale(d.id))
		.y(d => yScale(d.handicapIndex))
		.curve(d3.curveNatural);

	const lineData = createLine(handicaps);

	return (
		<StyledSVG width={width} height={height} trace={trace}>
			<Group margins={margins}>
				<Line d={lineData} />
				{handicaps.map(d => {
					return (
						<Point
							cx={xScale(d.id)}
							cy={yScale(d.handicapIndex)}
							r="6"
							key={d.id}
						/>
					);
				})}
			</Group>
		</StyledSVG>
	);
};

export default NewLineGraph;
