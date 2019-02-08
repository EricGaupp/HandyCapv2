import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import "Login.css";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
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
			.then(response => console.log(response))
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className="d-flex align-items-center splashBackground">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col loginContainer">
							<div className="card shadow text-center">
								<div className="card-body">
									<h3>Sign In</h3>
									<form>
										<div className="form-group my-0">
											<label
												htmlFor="exampleInputEmail1"
												className="sr-only"
											>
												Email address
											</label>
											<input
												type="email"
												className="form-control"
												id="exampleInputEmail1"
												aria-describedby="emailHelp"
												placeholder="Email"
												value={this.state.email}
												onChange={
													this.handleEmailChange
												}
											/>
										</div>
										<div className="form-group">
											<label
												htmlFor="exampleInputPassword1"
												className="sr-only"
											>
												Password
											</label>
											<input
												type="password"
												className="form-control"
												id="exampleInputPassword1"
												placeholder="Password"
												value={this.state.password}
												onChange={
													this.handlePasswordChange
												}
											/>
										</div>
										<button
											className="btn btn-lg btn-block btn-primary"
											onClick={this.handleSubmit}
										>
											Submit
										</button>
									</form>
									<hr />
									<p>
										New User? Register{" "}
										<Link to="/register">here</Link>.
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
