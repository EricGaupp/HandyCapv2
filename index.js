require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

//Serve static client files from build directory
app.use("/", express.static(path.resolve(__dirname, "./build")));

//Routing
app.use("/user", require("./routes/userRoutes.js"));

//Serve static build for any other request
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

//Can test connection to db with authenticate method
// db.authenticate()
// 	.then(() => console.log("Connected to Database"))
// 	.catch(err => console.log(err));

const db = require("./config/database");
//Requiring currently unrequired Models for sync until they are used in separate routing
const Tee = require("./models/Tee");
const Score = require("./models/Score");
const Course = require("./models/Course");
//Create tables from model definitions if nonexistent when in the development database. {force: true, match: /_dev$/} will drop all tables then create new ones from model definitions
db.sync({ logging: false })
	.then(() => {
		console.log("Connecting to dev DB, dropping and creating tables");
	})
	.catch(err => console.log(err));

app.listen(PORT, () => {
	console.log("Server listening on port %s", PORT);
});
