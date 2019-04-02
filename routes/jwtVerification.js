const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const db = require("../models");

//JWT Verification Middleware
router.use((req, res, next) => {
	//Check for authorization header
	if (req.headers.authorization) {
		//Extract token from Bearer string
		let { authorization } = req.headers;
		authorization = authorization.split(" ");
		const token = authorization[1];
		//Verify JWT
		jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
			if (error) {
				//Send error message if JWT can't be verified
				res.status(401).json({ error });
			} else {
				//Spread decoded user information onto res.locals object for use at route endpoint
				res.locals = { ...decoded };
				next();
			}
		});
	} else {
		//Send error response if no authorization headers in request
		res.status(401).json({
			message: "Unauthorized. Please Sign In to access this area"
		});
	}
});

//Route to verify and log user in via stored JWT upon app initialization
router.get("/verify", (req, res) => {
	//Find User by Id
	db.User.findOne({
		where: { id: res.locals.id },
		include: [{ all: true, nested: true }],
		//Order by most recent score date
		order: [[db.Score, "date", "DESC"]]
	})
		.then(user => {
			const { id, email, firstName, lastName } = user.dataValues;
			//Extract associated scores with Tee and Course data from sequelize query results
			const scores = user.Scores.map(score => {
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
						teeName: score.Tee.name,
						yardage: score.Tee.yardage,
						par: score.Tee.par,
						rating: score.Tee.rating,
						slope: score.Tee.slope,
						courseId: score.Tee.courseId,
						courseName: score.Tee.Course.name,
						courseCity: score.Tee.Course.city,
						courseState: score.Tee.Course.state
					}
				);
			});
			res.json({
				id: id,
				email: email,
				firstName: firstName,
				lastName: lastName,
				scores: scores
			});
		})
		.catch(error => {
			console.log(error);
			res.json(error);
		});
});

module.exports = router;
