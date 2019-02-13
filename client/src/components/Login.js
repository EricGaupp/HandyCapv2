import React from "react";
import { connect } from "react-redux";
import { login } from "../actions/userActions";
import { Link, Redirect } from "react-router-dom";

import "Login.css";

const mapStateToProps = state => {
	return {
		loginError: state.user.loginError,
		errorMessage: state.user.errorMessage,
		isAuthenticated: state.user.isAuthenticated,
		token: state.user.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (email, password) => dispatch(login(email, password))
	};
};

class ConnectedLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loginError: false,
			errorMessage: "",
			toDashboard: false
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
		//Copy this into action logic
		/**axios
			.post("/user/login", { email, password })
			.then(response => {
				//Display error messages to user if any
				if (response.data.loginError) {
					this.setState({
						loginError: true,
						errorMessage: response.data.errorMessage
					});
				}
				//On success store JWT in localStorage
				//TODO: Update Redux state with user information
				else {
					localStorage.setItem("token", response.data.token);
					this.setState({
						loginError: false,
						toDashboard: true
					});
				}
			})
			.catch(err => console.log(err));**/
	};

	render() {
		//Redirect to dashboard after successful login via an updated Redux User State
		if (this.props.isAuthenticated) {
			localStorage.setItem("token", this.props.token);
			return <Redirect to="/dashboard" />;
		}
		return (
			<div className="d-flex align-items-center splashBackground">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col loginContainer">
							<div className="card shadow text-center">
								<div className="card-header">
									<h3 className="my-0">Sign In</h3>
								</div>
								<div className="card-body">
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
												onChange={
													this.handleEmailChange
												}
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
												onChange={
													this.handlePasswordChange
												}
											/>
										</div>
										{/**Display Errors based on Redux User State**/}
										{this.props.loginError && (
											<p className="loginError">
												{this.props.errorMessage}
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
									<p className="my-0">
										New User? Register{" "}
										<Link to="/register">here</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConnectedLogin);

export default Login;
