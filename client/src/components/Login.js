import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { clearLoginError, login } from "actions/userActions";

import "./Login.css";

const mapStateToProps = state => {
	return {
		loginError: state.user.loginError,
		errorMessage: state.user.loginErrorMessage,
		isFetching: state.user.isFetching,
		isAuthenticated: state.user.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (email, password) => dispatch(login(email, password)),
		clearLoginError: () => dispatch(clearLoginError())
	};
};

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loginError: false,
			errorMessage: ""
		};
	}

	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};

	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		//Dispatch login action to redux
		this.props.login(email, password);
	};

	componentWillUnmount() {
		this.props.clearLoginError();
	}

	render() {
		//Redirect to dashboard if user is authenticated in redux user state
		if (this.props.isAuthenticated) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<React.Fragment>
				<div className="splashBackground" />
				<div className="loginContainer">
					<div className="loginCard card shadow text-center">
						<div className="card-header loginHeader">
							<h3 className="my-0">Sign In</h3>
						</div>
						<div className="card-body loginBody">
							{/*TODO Show Spinner Component if redux user state isFetching=true */}
							{this.props.isFetching ? (
								<h4>Fetching User...</h4>
							) : (
								<form>
									<div className="form-group my-0">
										<label
											htmlFor="loginEmail"
											className="sr-only"
										>
											Email address
										</label>
										<input
											type="email"
											className="form-control"
											id="loginEmail"
											placeholder="Email"
											value={this.state.email}
											onChange={this.handleEmailChange}
										/>
									</div>
									<div className="form-group">
										<label
											htmlFor="loginPassword"
											className="sr-only"
										>
											Password
										</label>
										<input
											type="password"
											className="form-control"
											id="loginPassword"
											placeholder="Password"
											value={this.state.password}
											onChange={this.handlePasswordChange}
										/>
									</div>
									{/**Display Errors based on Redux User State**/}
									{this.props.loginError && (
										<p className="loginError">
											{this.props.errorMessage}
										</p>
									)}
									<button
										className="btn btn-lg btn-block submitButton"
										onClick={this.handleSubmit}
									>
										<span className="text-white">
											Submit
										</span>
									</button>
								</form>
							)}
							<hr />
							<p className="my-0">
								New User? Register{" "}
								<Link to="/register">here</Link>
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
)(Login);
