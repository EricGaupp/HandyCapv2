const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const db = require("../models");

const saltRounds = 10;

//Registration of new user route
router.post("/", (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	//Search for existing user by unique email address and only continue with registration if no record found
	db.User.findOne({ where: { email: email } })
		.then(user => {
			if (user) {
				//If user exists send error message to client
				res.json({
					registerError: true,
					registerErrorMessage:
						"User with that email address already exists"
				});
			} else {
				//Hash plaintext password with bcrypt
				bcrypt.hash(password, saltRounds, (error, hash) => {
					if (error) {
						console.log(error);
					} else {
						//Create new record in User table with provided inputs and hashed password
						db.User.create({
							email: email,
							password: hash,
							firstName: firstName,
							lastName: lastName
						})
							//Send Authorization JWT to client
							.then(newUser => {
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
											//TODO send error response code
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
							})
							.catch(error => console.log(error));
					}
				});
			}
		})
		.catch(error => console.log(error));
});

module.exports = router;
