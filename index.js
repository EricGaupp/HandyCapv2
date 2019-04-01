require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

//Serve static client files from build directory
app.use("/", express.static(path.join(__dirname, "client", "build")));
//Serve static build for any other request
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

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

//Can test connection to db with authenticate method
// db.authenticate()
// 	.then(() => console.log("Connected to Database"))
// 	.catch(err => console.log(err));

//Database Configuration
const db = require("./config/database");
//Model Definitions
const User = require("./models/User");
const Tee = require("./models/Tee");
const Score = require("./models/Score");
const Course = require("./models/Course");
//Model Associations
//TODO look into onDelete and onUpdate to cascade changes to associated records i.e. deleting a user should delete all their scores
Tee.hasMany(Score, { foreignKey: { allowNull: false } });
User.hasMany(Score, { foreignKey: { allowNull: false } });
Score.belongsTo(User);
Score.belongsTo(Tee);
Tee.belongsTo(Course);
Course.hasMany(Tee);

//Create tables from model definitions if nonexistent when in the development database. {force: true, match: /_dev$/} will drop all tables then create new ones from model definitions
db.sync({ match: /_dev$/, logging: false })
	.then(() => {
		console.log("Connecting to dev DB, dropping and creating tables");
	})
	.catch(err => console.log(err));

app.listen(PORT, () => {
	console.log("Server listening on port %s", PORT);
});
