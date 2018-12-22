import React from "react";
import "Footer.css";

const Footer = () => {
	return (
		<footer className="footer bg-dark fixed-bottom">
			<div className="container text-right">
				<p className="text-muted">{"\u00A9"} Eric Gaupp 2018</p>
			</div>
		</footer>
	);
};

export default Footer;
