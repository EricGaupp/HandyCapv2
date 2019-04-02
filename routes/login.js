const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const db = require("../models");

const saltRounds = 10;

//Login route
router.post("/", (req, res) => {
	const { email, password } = req.body;
	//Search for existing user by unique email address and include associated scores
	db.User.findOne({
		where: { email: email },
		include: [
			{
				model: db.Score,
				//Include Tee and Course Data for Scores
				include: [
					{
						model: db.Tee,
						include: [{ model: db.Course }]
					}
				]
			}
		],
		//Order by most recent score date
		order: [[db.Score, "date", "DESC"]]
	})
		.then(user => {
			//console.log(user);
			if (user) {
				//If user exists compare password and stored hash with bcrypt compare method
				bcrypt.compare(
					password,
					user.dataValues.password,
					(error, result) => {
						//Log any bcrypt error
						if (error) {
							console.log(error);
						}
						//If password and hash don't match send error to client
						if (!result) {
							res.json({
								loginError: true,
								errorMessage: "Invalid Username and/or Password"
							});
						}
						//If password and hash do match -> send authorization JWT to client
						else {
							const {
								id,
								email,
								firstName,
								lastName
							} = user.dataValues;
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
							jwt.sign(
								{
									id: id,
									email: email,
									firstName: firstName,
									lastName: lastName
								},
								process.env.JWT_KEY,
								{
									expiresIn: "1h",
									issuer: "HandyCap",
									subject: "HandyCap Authorization"
								},
								(err, token) => {
									if (err) {
										console.log(err);
										//TODO Send Error status code
									}
									//TODO Wrap in else statement
									res.json({
										id: id,
										email: email,
										firstName: firstName,
										lastName: lastName,
										token: token,
										scores: scores
									});
								}
							);
						}
					}
				);
			} else {
				//If user doesn't exist send error message to client
				res.json({
					loginError: true,
					errorMessage: "User not found"
				});
			}
		})
		.catch(error => console.log(error));
});

module.exports = router;
