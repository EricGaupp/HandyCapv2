const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const Score = require("../models/Score");
const Tee = require("../models/Tee");
const User = require("../models/User");

router.get("/", (req, res) => {
	//Query Scores table for all scores belonging to userId passed thru res.locals after being decoded in JWT verification middleware
	Score.findAll({
		where: { userId: res.locals.id },
		include: [{ model: Tee, include: [Course] }],
		//Sort by most recent score first
		order: [["date", "DESC"]]
	})
		.then(results => {
			const scores = results.map(score => {
				return Object.assign(
					{},
					{
						id: score.id,
						date: score.date,
						gross: score.gross,
						adjustedGross: score.adjustedGross,
						courseHandicap: score.courseHandicap,
						net: score.net,
						differential: score.differential,
						tee: score.teeId,
						teeName: score.tee.name,
						yardage: score.tee.yardage,
						par: score.tee.par,
						rating: score.tee.rating,
						slope: score.tee.slope,
						courseId: score.tee.courseId,
						courseName: score.tee.course.name,
						courseCity: score.tee.course.city,
						courseState: score.tee.course.state
					}
				);
			});
			res.json(scores);
		})
		.catch(error => console.log(error));
});

router.post("/add", (req, res) => {
	const {
		courseId,
		selectedTeeId,
		date,
		gross,
		adjustedGross,
		courseHandicap,
		net,
		differential
	} = req.body;
	const { id, email, firstName, lastName } = res.locals;
	Score.create({
		date: date,
		gross: gross,
		adjustedGross: adjustedGross,
		courseHandicap: courseHandicap,
		net: net,
		differential: differential,
		userId: id,
		teeId: selectedTeeId
	})
		.then(result => {
			res.json({ message: "Score Added", redirect: true });
		})
		.catch(error => res.json(error));
});

module.exports = router;
