const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");

const saltRounds = 10;

//Login route
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	//Search for existing user by unique email address
	User.findOne({ where: { email: email } })
		.then(user => {
			if (user) {
				//If user exists compare password and stored hash with bcrypt compare method
				bcrypt.compare(
					password,
					user.dataValues.password,
					(error, result) => {
						//Log any bcrypt error
						if (error) {
							console.log(error);
						}
						//If password and hash don't match send error to client
						if (!result) {
							res.json({
								loginError: true,
								errorMessage: "Invalid Username and/or Password"
							});
						}
						//If password and hash do match -> send authorization JWT to client
						else {
							const {
								id,
								email,
								firstName,
								lastName
							} = user.dataValues;
							jwt.sign(
								{
									id: id,
									email: email,
									firstName: firstName,
									lastName: lastName
								},
								process.env.JWT_KEY,
								{
									expiresIn: "1h",
									issuer: "HandyCap",
									subject: "HandyCap Authorization"
								},
								(err, token) => {
									if (err) {
										console.log(err);
									}
									res.json({
										id: id,
										email: email,
										firstName: firstName,
										lastName: lastName,
										token: token
									});
								}
							);
						}
					}
				);
			} else {
				//If user doesn't exist send error message to client
				res.json({
					loginError: true,
					errorMessage: "User not found"
				});
			}
		})
		.catch(error => console.log(error));
});

//Registration of new user route
router.post("/register", (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	//Search for existing user by unique email address and only continue with registration if no record found
	User.findOne({ where: { email: email } })
		.then(user => {
			if (user) {
				//If user exists send error message to client
				res.json({
					registerError: true,
					errorMessage: "User with that email address already exists"
				});
			} else {
				//Hash plaintext password with bcrypt
				bcrypt.hash(password, saltRounds, (error, hash) => {
					if (error) {
						console.log(error);
					} else {
						//Create new record in User table with provided inputs and hashed password
						User.create({
							email: email,
							password: hash,
							firstName: firstName,
							lastName: lastName
						})
							//Send Authorization JWT to client
							.then(newUser => {
								console.log(newUser);
								const {
									id,
									email,
									firstName,
									lastName
								} = newUser.dataValues;
								jwt.sign(
									{
										id: id,
										email: email,
										firstName: firstName,
										lastName: lastName
									},
									process.env.JWT_KEY,
									{
										expiresIn: "1h",
										issuer: "HandyCap",
										subject: "HandyCap Authorization"
									},
									(err, token) => {
										if (err) {
											console.log(err);
										}
										res.json({
											message: "Registered User",
											token: token
										});
									}
								);
							})
							.catch(error => console.log(error));
					}
				});
			}
		})
		.catch(error => console.log(error));
});

module.exports = router;
