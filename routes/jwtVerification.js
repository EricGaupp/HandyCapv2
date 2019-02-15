const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

//JWT Verification Middleware
router.use((req, res, next) => {
	//Check for authorization header
	if (req.headers.authorization) {
		//Extract token from Bearer string
		let { authorization } = req.headers;
		authorization = authorization.split(" ");
		const token = authorization[1];
		//Verify JWT
		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				//Send error message if JWT can't be verified
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
		//Send error response if no authorization headers in request
		res.send("no headers");
	}
});

module.exports = router;
