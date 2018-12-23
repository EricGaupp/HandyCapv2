import React from "react";

import { FiGithub, FiLinkedin, FiLink } from "react-icons/fi";
import "Footer.css";

const Footer = () => {
	return (
		<footer className="d-flex align-items-center footer bg-dark fixed-bottom">
			<div className="container">
				<div className="row">
					<div className="d-flex col align-items-center justify-content-end">
						<span className="text-secondary mr-1">
							{"\u00A9"} Eric Gaupp 2018
						</span>
						<div className="d-flex align-items-center justify-content-center logoContainer rounded-circle mx-1">
							<a
								className="svgLink align-middle"
								href="https://www.linkedin.com/in/ericgaupp"
							>
								<FiLink />
							</a>
						</div>
						<div className="d-flex align-items-center justify-content-center logoContainer rounded-circle mx-1">
							<a
								className="svgLink align-middle"
								href="https://www.linkedin.com/in/ericgaupp"
							>
								<FiLinkedin />
							</a>
						</div>
						<div className="d-flex align-items-center justify-content-center logoContainer rounded-circle mx-1">
							<a
								className="svgLink"
								href="https://github.com/EricGaupp"
							>
								<FiGithub />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
