const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const Tee = require("../models/Tee");

router.get("/courses", (req, res) => {
	Course.findAll({
		include: [{ all: true, nested: true }]
	})
		.then(results => {
			console.log(results);
			res.json(results);
		})
		.catch(err => console.log(err.response));
});

module.exports = router;
