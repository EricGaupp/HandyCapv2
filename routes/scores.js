const express = require("express");
const router = express.Router();

const { Score, Tee, Course } = require("../models");

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
						tee: score.TeeId,
						teeName: score.Tee.name,
						yardage: score.Tee.yardage,
						par: score.Tee.par,
						rating: score.Tee.rating,
						slope: score.Tee.slope,
						courseId: score.Tee.CourseId,
						courseName: score.Tee.Course.name,
						courseCity: score.Tee.Course.city,
						courseState: score.Tee.Course.state
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
		UserId: id,
		TeeId: selectedTeeId
	})
		.then(result => {
			res.json({ message: "Score Added", redirect: true });
		})
		.catch(error => res.json(error));
});

router.post("/delete", (req, res) => {
	const { scoreId } = req.body;
	//Find score by scoreId and also that userId matches id provided from authorization token
	Score.findOne({ where: { id: scoreId, userId: res.locals.id } })
		.then(score => {
			//If score exists delete it
			if (score) {
				return score.destroy();
			} else {
				//Otherwise send error message
				res.json({
					message: "Unauthorized or scoreId does not exist",
					deleted: false
				});
			}
		})
		.then(response => {
			res.json({ message: "Score deleted", deleted: true });
		})
		.catch(error => res.json(error));
});

module.exports = router;
