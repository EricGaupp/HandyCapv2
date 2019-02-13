import React from "react";
import { connect } from "react-redux";

import UserNav from "./UserNav";
import LoginNav from "./LoginNav";

import "Navbar.css";

const mapStateToProps = state => ({
	user: state.user
});

const Navbar = ({ user }) => {
	return user.isAuthenticated ? <UserNav /> : <LoginNav />;
};

export default connect(
	mapStateToProps,
	null
)(Navbar);
