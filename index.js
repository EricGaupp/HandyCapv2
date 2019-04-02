require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

//Serve static client files from build directory
app.use("/", express.static(path.join(__dirname, "client", "build")));

//Public Routes for User Login Registration
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
//Routes to get Course and Tee data for adding scores (not protected)
app.use("/api", require("./routes/api"));
//BONUS add some /api routes to get data via a different client as long as personal user info isn't exposed. Use url query strings/params
//Middleware to authenticate users via JWT
app.use(require("./routes/jwtVerification"));
//Protected routes for adding, updating, or deleting scores
app.use("/scores", require("./routes/scores"));

//Serve static build for any other request
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Configure Database
const db = require("./models/index");

//Create tables from model definitions if nonexistent when in the development database. {force: true, match: /_dev$/} will drop all tables then create new ones from model definitions only when database ends in '_dev'
db.sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});

app.listen(PORT, () => {
	console.log("Server listening on port %s", PORT);
});
