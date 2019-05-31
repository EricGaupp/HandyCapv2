import React from "react";
import styled from "styled-components";

import { IconContext } from "react-icons";
import { FiGithub, FiLinkedin, FiLink } from "react-icons/fi";

const StyledFooter = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 46px;
	background-color: #d9d9d6;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
	@media (max-width: 400px) {
		position: relative;
		top: 0px;
	}
`;

const StyledRow = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
`;

const FooterText = styled.h6`
	display: inline-block;
	margin: 0;
	margin-right: 2px;
`;

const StyledLink = styled.a`
	display: inline-block;
	text-decoration: none;
`;

const SVGDiv = styled.div`
	background-color: #406347;
	height: 38px;
	width: 38px;
	margin: 0 2px;
	border-radius: 19px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<StyledRow className="container">
				<FooterText>{"\u00A9"} Eric Gaupp 2018</FooterText>
				<StyledLink
					rel="noopener noreferrer"
					target="_blank"
					href="https://ericgaupp.github.io"
				>
					<SVGDiv>
						<IconContext.Provider
							value={{ color: "#fade47", size: "16px" }}
						>
							<FiLink />
						</IconContext.Provider>
					</SVGDiv>
				</StyledLink>
				<StyledLink
					rel="noopener noreferrer"
					target="_blank"
					href="https://linkedin.com/in/ericgaupp"
				>
					<SVGDiv>
						<IconContext.Provider
							value={{ color: "#fade47", size: "16px" }}
						>
							<FiLinkedin />
						</IconContext.Provider>
					</SVGDiv>
				</StyledLink>
				<StyledLink
					rel="noopener noreferrer"
					target="_blank"
					href="https://github.com/ericgaupp"
				>
					<SVGDiv>
						<IconContext.Provider
							value={{ color: "#fade47", size: "16px" }}
						>
							<FiGithub />
						</IconContext.Provider>
					</SVGDiv>
				</StyledLink>
			</StyledRow>
		</StyledFooter>
	);
};

export default Footer;
