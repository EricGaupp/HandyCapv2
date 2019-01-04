import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import "Login.css";

const Login = () => {
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
											placeholder="Enter email"
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
										/>
									</div>
									<button
										type="submit"
										className="btn btn-lg btn-block btn-primary"
										onClick={e => {
											e.preventDefault();
											axios.get("/login").then(res => {
												console.log(res);
											});
										}}
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
};

export default Login;
