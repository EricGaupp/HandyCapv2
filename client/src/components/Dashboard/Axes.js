import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import dayjs from "dayjs";

const Axes = ({ scales, dimensions, values }) => {
	const { xScale, yScale } = scales;
	const { width, height, margins } = dimensions;

	const ref = useRef(null);

	useEffect(() => {
		const g = d3.select(ref.current);

		g.selectAll("*").remove();

		const xAxis = d3
			.axisBottom(xScale)
			.tickFormat(tick => {
				//Find score where id matches the tick value
				const filtered = values.filter(value => {
					return value.id === tick;
				});
				//Return the date for the tick format
				const dateString = dayjs(filtered[0].date).format(
					"MMM D[,] YYYY"
				);
				return dateString;
			})
			.tickSizeOuter(0);

		const yAxis = d3.axisLeft(yScale);

		g.append("g")
			.attr(
				"transform",
				`translate(${margins.left},${height - margins.bottom})`
			)
			.attr("class", "xAxis")
			.call(xAxis);

		g.append("g")
			.attr("transform", `translate(${margins.left},${margins.top})`)
			.call(yAxis);

		g.append("text")
			.style("dominant-baseline", "hanging")
			.attr(
				"transform",
				`translate(${5},${margins.top +
					(height - margins.top - margins.bottom) / 2}) rotate(-90)`
			)
			.text("Handicap Index");
	}, [
		width,
		height,
		xScale,
		yScale,
		margins.top,
		margins.left,
		margins.bottom,
		values
	]);

	return <g ref={ref} />;
};

export default Axes;
