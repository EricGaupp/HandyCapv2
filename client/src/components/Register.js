import React from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

import "Register.css";

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			registerError: false,
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

	handleFirstNameChange = e => {
		this.setState({ firstName: e.target.value });
	};

	handleLastNameChange = e => {
		this.setState({ lastName: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password, firstName, lastName } = this.state;
		axios
			.post("/user/register", { email, password, firstName, lastName })
			.then(response => {
				//Display error messages to user if any
				if (response.data.registerError) {
					this.setState({
						registerError: true,
						errorMessage: response.data.errorMessage
					});
				}
				//On success store JWT in localStorage
				//TODO: Update Redux state with user information
				else {
					localStorage.setItem("token", response.data.token);
					this.setState({
						registerError: false,
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
						<div className="col registerContainer">
							<div className="card shadow">
								<div className="card-header">
									<h3 className="text-center my-0">
										Register
									</h3>
								</div>
								<div className="card-body">
									<form>
										<div className="form-group">
											<label htmlFor="registerEmail">
												Email
											</label>
											<input
												type="email"
												className="form-control"
												id="registerEmail"
												aria-describedby="emailHelp"
												value={this.state.email}
												onChange={
													this.handleEmailChange
												}
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
												onChange={
													this.handlePasswordChange
												}
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
												onChange={
													this.handleFirstNameChange
												}
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
												onChange={
													this.handleLastNameChange
												}
											/>
										</div>
										{this.state.registerError && (
											<p className="text-center loginError">
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
									<p className="text-center my-0">
										Already Registered? Login{" "}
										<Link to="/login">here</Link>
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

export default Register;
