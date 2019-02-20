const express = require("express");
const router = express.Router();

const Score = require("../models/Score");
const Tee = require("../models/Tee");
const User = require("../models/User");

router.get("/", (req, res) => {
	//Query Scores table for all scores belonging to userId passed thru res.locals after being decoded in JWT verification middleware
	Score.findAll({ where: { userId: res.locals.id } })
		.then(scores => {
			res.json(scores);
		})
		.catch(error => console.log(error));
});

router.post("/add", (req, res) => {
	console.log(req.body);
	const {
		courseId,
		teeId,
		date,
		gross,
		adjustedGross,
		courseHandicap,
		differential
	} = req.body;
	const { id, email, firstName, lastName } = res.locals;
	console.log(date, gross, adjustedGross, courseHandicap, differential);
	Score.create({
		date: date,
		gross: gross,
		adjustedGross: adjustedGross,
		courseHandicap: courseHandicap,
		differential: differential
	});
	res.json({ message: "received" });
});

module.exports = router;
