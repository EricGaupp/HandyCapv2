const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../../db/config");
const User = require("../../db/models/User");

//Login Route
router.post("/login", (req, res) => {
	const { email, password } = req.body;
	//Search for existing user by unique email address
	User.findOne({ where: { email: email } })
		.then(user => {
			console.log(user);
			res.sendStatus(200);
		})
		.catch(err => console.log(err));
});

//Registration of new user route
router.post("/register", (req, res) => {
	const { email, password } = req.body;
	//Search for existing user by unique email address and only continue with registration if no record found
	User.findOne({ where: { email: email } })
		.then()
		.catch();
});

module.exports = router;
