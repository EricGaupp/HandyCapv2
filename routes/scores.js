const express = require("express");
const router = express.Router();
const Score = require("../models/Score");

router.get("/", (req, res) => {
	//Query Scores table for all scores belonging to userId passed thru res.locals after being decoded in JWT verification middleware
	Score.findAll({ where: { userId: res.locals.id } })
		.then(scores => {
			res.json(scores);
		})
		.catch(error => console.log(error));
});

router.post("/add", (req, res) => {
	console.log(req.body, res.locals);
	// Score.create({});
	res.json({ message: "received" });
});

module.exports = router;
