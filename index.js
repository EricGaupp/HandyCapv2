require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");

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

//Test Connection
db.sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});

//Configure Umzug Migrations
const Umzug = require("umzug");
const umzug = new Umzug({
	storage: "sequelize",
	storageOptions: {
		sequelize: db.sequelize
	},
	logging: false,
	upName: "up",
	downName: "down",
	migrations: {
		params: [db.sequelize.getQueryInterface(), Sequelize],
		path: path.resolve(__dirname, "migrations"),
		pattern: /^\d+[\w-]+\.js$/
	},
	logging: false
});

umzug.down({ to: 0 });

//Run Migrations and Start server when done
umzug.up().then(migrations => {
	console.log(migrations);
	app.listen(PORT, () => {
		console.log("Server listening on port %s", PORT);
	});
});
