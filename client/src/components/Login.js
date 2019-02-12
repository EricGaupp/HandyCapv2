import React from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

import "Login.css";

class Login extends React.Component {
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
		axios
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
			.catch(err => console.log(err));
	};

	render() {
		//Redirect to dashboard on succesful login
		if (this.state.toDashboard) {
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
										{this.state.loginError && (
											<p className="loginError">
												{this.state.errorMessage}
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

export default Login;
