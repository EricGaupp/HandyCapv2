const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../../db/config");
const User = require("../../db/models/User");

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
								message: "password does not match"
							});
						}
						//If password and has do match send success message to client
						//TODO: Replace res.json with a signed JWT
						else {
							res.json({
								message: "Logging in..."
							});
						}
					}
				);
			} else {
				//If user doesn't exist send error message to client
				res.json({
					message: "User with that email address not found"
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
					message: "User with that email address already exists"
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
							.then(newUser => {
								console.log(newUser);
								//Sign JWT and send to client
								res.sendStatus(200);
							})
							.catch(error => console.log(error));
					}
				});
			}
		})
		.catch(error => console.log(error));
});

module.exports = router;
