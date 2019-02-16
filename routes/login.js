const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");

const saltRounds = 10;

//Login route
router.post("/", (req, res) => {
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
										//TODO Send Error status code
									}
									//TODO Wrap in else statement
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

module.exports = router;
