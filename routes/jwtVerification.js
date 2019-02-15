const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

//JWT Verification Middleware
router.use((req, res, next) => {
	if (req.headers.authorization) {
		//Extract token from Bearer string
		let { authorization } = req.headers;
		authorization = authorization.split(" ");
		const token = authorization[1];
		//Verify JWT
		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				res.json({
					jwtError: true,
					jwtErrorMessage: err
				});
			} else {
				//Spread decoded user information onto res.locals object for use at route endpoint
				res.locals = { ...decoded };
				next();
			}
		});
	} else {
		res.send("no headers");
	}
});

router.use((req, res) => {
	res.json({ message: "Valid JWT", ...res.locals });
});

module.exports = router;
