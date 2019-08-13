import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

//Redux Actions
import { login } from "../../actions/userActions";

//Imported Components
import { NavItem, NavList } from "./Navbar";

//Styled-Components to show unauthenticated users
const ErrorMessage = styled.p`
	text-align: center;
	color: red;
`;

const LoginCard = styled.div`
	width: 100%;
	background-color: #fff;
	padding: 10px 10px;
	padding-top: 25px;
	border-radius: 2px;
	box-shadow: 0px 10px 20px black;

	@media (min-width: 600px) {
		position: absolute;
		z-index: 999;
		right: 0;
		width: 350px;
	}
`;

const LoginInput = styled.input`
	display: block;
	box-sizing: border-box;
	width: 100%;
	margin-bottom: 1em;
	font-size: 18px;
	padding: 0.5em;
	border: 2px solid #999;
	border-radius: 4px;

	&:focus {
		outline: 0;
		background-color: rgba(250, 222, 71, 0.5);
	}

	&:invalid {
		border: 2px solid red;
	}
`;

const LoginSubmitButton = styled.button`
	display: block;
	width: 100%;
	margin: 0 auto;
	margin-bottom: 1em;
	padding: 0.5em 0;
	font-family: "Montserrat", sans-serif;
	font-size: 18px;
	color: #fff;
	background-color: #406347;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	box-shadow: 0 6px #2b4230;

	&:focus {
		outline: 0;
	}

	&:active {
		transform: translateY(4px);
		box-shadow: 0 2px #2b4230;
	}
`;

const RegisterDiv = styled.div`
	text-align: center;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: #364652;
`;

//Mapping Redux State and Dispatch to Props
const mapStateToProps = state => {
	return {
		loginError: state.user.loginError,
		errorMessage: state.user.loginErrorMessage
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (email, password) => dispatch(login(email, password))
	};
};

//Composite Component
const LoginNav = ({ login, clearLoginError, loginError, errorMessage }) => {
	const loginRef = useRef(null);
	const [showLogin, setShowLogin] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLoginSubmit = e => {
		e.preventDefault();
		login(email, password);
	};

	//Click Event Listeners for showing and closing log-in dropdown
	useEffect(() => {
		//Function declaration necessary for attaching and removing Event Listeners
		const handleClick = e => {
			if (showLogin && !loginRef.current.contains(e.target)) {
				//Hide Login Dropdown and reset input values
				setShowLogin(false);
				setEmail("");
				setPassword("");
			}
		};
		//Attach event listener
		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [showLogin]);

	return (
		<React.Fragment>
			<NavList>
				<NavItem onClick={() => setShowLogin(true)}>Login</NavItem>
			</NavList>
			{showLogin && (
				<LoginCard ref={loginRef}>
					<form>
						<LoginInput
							name="email"
							type="email"
							placeholder="Email"
							value={email}
							onChange={e => {
								setEmail(e.target.value);
							}}
						/>
						<LoginInput
							name="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={e => {
								setPassword(e.target.value);
							}}
						/>
						{loginError && (
							<ErrorMessage>{errorMessage}</ErrorMessage>
						)}
						<LoginSubmitButton onClick={handleLoginSubmit}>
							Submit
						</LoginSubmitButton>
						<RegisterDiv>
							<p>
								New User?{" "}
								<StyledLink to="/register">Register</StyledLink>
							</p>
						</RegisterDiv>
					</form>
				</LoginCard>
			)}
		</React.Fragment>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginNav);
