import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";
import { Link, Redirect } from "react-router-dom";

import "Register.css";

const mapStateToProps = state => {
	return {
		registerError: state.user.registerError,
		registerErrorMessage: state.user.registerErrorMessage,
		isAuthenticated: state.user.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		register: (email, password, firstName, lastName) =>
			dispatch(registerUser(email, password, firstName, lastName))
	};
};

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			firstName: "",
			lastName: ""
		};
	}

	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};

	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};

	handleFirstNameChange = e => {
		this.setState({ firstName: e.target.value });
	};

	handleLastNameChange = e => {
		this.setState({ lastName: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password, firstName, lastName } = this.state;
		//Dispatch register action to redux
		this.props.register(email, password, firstName, lastName);
	};

	render() {
		//Redirect to dashboard on succesful registration
		if (this.props.isAuthenticated) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<React.Fragment>
				<div className="splashBackground" />
				<div className="registerContainer">
					<div className="registerCard card shadow">
						<div className="card-header">
							<h3 className="text-center my-0">Register</h3>
						</div>
						<div className="card-body">
							<form>
								<div className="form-group">
									<label htmlFor="registerEmail">Email</label>
									<input
										type="email"
										className="form-control"
										id="registerEmail"
										aria-describedby="emailHelp"
										value={this.state.email}
										onChange={this.handleEmailChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="registerPassword">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="registerPassword"
										value={this.state.password}
										onChange={this.handlePasswordChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="registerFirstName">
										First Name
									</label>
									<input
										type="text"
										className="form-control"
										id="registerFirstName"
										value={this.state.firstName}
										onChange={this.handleFirstNameChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="registerLastName">
										Last Name
									</label>
									<input
										type="text"
										className="form-control"
										id="registerLastName"
										value={this.state.lastName}
										onChange={this.handleLastNameChange}
									/>
								</div>
								{/*Display Registration Error Messages*/}
								{this.props.registerError && (
									<p className="text-center loginError">
										{this.props.registerErrorMessage}
									</p>
								)}

								<button
									className="btn btn-lg btn-block btn-primary"
									onClick={this.handleSubmit}
								>
									Submit
								</button>
							</form>
							<hr />
							<p className="text-center my-0">
								Already Registered? Login{" "}
								<Link to="/login">here</Link>
							</p>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
