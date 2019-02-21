const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const Tee = require("../models/Tee");

//Route to get all courses and associated sets of tees
router.get("/courses", (req, res) => {
	Course.findAll({
		include: [Tee],
		//Order by alphabetical course name then by descending course rating
		order: ["name", [{ model: Tee }, "rating", "DESC"]]
	})
		.then(results => {
			res.json(results);
		})
		.catch(err => console.log(err.response));
});

module.exports = router;