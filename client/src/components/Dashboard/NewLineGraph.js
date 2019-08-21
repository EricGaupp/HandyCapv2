import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { animated, useSpring, useTrail } from "react-spring";

import Axes from "./Axes";

const StyledSVG = styled.svg`
	display: block;
`;

const Group = styled.g`
	transform: ${props =>
		`translate(${props.margins.left}px,${props.margins.top}px)`};
`;

const Line = styled(animated.path)`
	fill: none;
	stroke: ${props => (props.length !== 0 ? "#fade47" : "none")};
	stroke-width: 3;
	stroke-dasharray: ${props => props.length};
`;

const Point = styled(animated.circle)`
	fill: #406347;
	stroke: #fff;
	stroke-width: 3;

	:hover {
		fill: #ff6b6b;
	}
`;

const NewLineGraph = ({ width, height, values }) => {
	const [pathLength, setPathLength] = useState(0);
	const pathRef = useRef();

	const animationTime = 3000;

	const trace = useSpring({
		config: { duration: animationTime },
		x: pathLength,
		from: { x: 0 },
		reverse: true,
		reset: true
	});

	const trail = useTrail(values.length, {
		config: { duration: animationTime },
		opacity: 1,
		from: { opacity: 0 }
	});

	useEffect(() => {
		setPathLength(pathRef.current.getTotalLength());
	}, [width, height]);

	//SVG Margins
	//TODO Change via mediaqueries
	const margins = { top: 20, right: 30, bottom: 70, left: 70 };

	//D3 Scales
	const xScale = d3
		.scalePoint()
		.domain(values.map(d => d.id))
		.range([0, width - margins.left - margins.right]);

	//Extract minimum and maximum value of handicaps for y-axis scaling
	const [min, max] = d3.extent(values.map(d => d.handicapIndex));
	const yScale = d3
		.scaleLinear()
		.domain([min, max])
		.range([height - margins.top - margins.bottom, 0])
		.nice();

	//D3 Line Generator
	const createLine = d3
		.line()
		.x(d => xScale(d.id))
		.y(d => yScale(d.handicapIndex))
		.curve(d3.curveNatural);

	const lineData = createLine(values);

	return (
		<StyledSVG width={width} height={height}>
			<Group margins={margins}>
				<Line
					d={lineData}
					ref={pathRef}
					strokeDashoffset={trace.x}
					length={pathLength}
				/>
				{trail.map((styles, index) => {
					return (
						<Point
							style={styles}
							cx={xScale(values[index].id)}
							cy={yScale(values[index].handicapIndex)}
							r="6"
							key={values[index].id}
						/>
					);
				})}
			</Group>
			<Axes
				scales={{ xScale, yScale }}
				dimensions={{ height, width, margins }}
				values={values}
			/>
		</StyledSVG>
	);
};

export default NewLineGraph;
