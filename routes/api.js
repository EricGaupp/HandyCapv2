const express = require("express");
const router = express.Router();

const db = require("../models");

//Route to get all courses and associated sets of tees
router.get("/courses", (req, res) => {
	db.Course.findAll({
		include: [db.Tee],
		//Order by alphabetical course name then by descending course rating
		order: ["name", [{ model: db.Tee }, "rating", "DESC"]]
	})
		.then(results => {
			res.json(results);
		})
		.catch(err => console.log(err.response));
});

module.exports = router;
