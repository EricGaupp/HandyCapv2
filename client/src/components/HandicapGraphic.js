import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
	return {
		scores: state.scores
	};
};

const HandicapGraphic = props => {
	return null;
};

export default connect(
	mapStateToProps,
	null
)(HandicapGraphic);
