const express = require("express");
const router = express.Router();

const db = require("../../db/config");
const User = require("../../db/models/User");

router.get("/login", (req, res) => {
	User.findAll()
		.then(users => {
			console.log(users);
			res.sendStatus(200);
		})
		.catch(err => console.log(err));
});

module.exports = router;
