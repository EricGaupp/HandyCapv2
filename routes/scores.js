const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
	res.json({ ...req.body, ...res.locals });
});

module.exports = router;
