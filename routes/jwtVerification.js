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
		next();
	} else {
		res.send("no headers");
	}
});

router.use((req, res) => {
	res.send("headers");
});

module.exports = router;
