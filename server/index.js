const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

//Serve static client files from build directory
app.use("/", express.static(path.resolve(__dirname, "./build")));

const routes = require("./routes.js");
app.use("/", routes);

//Serve static build for any other request
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log("Server listening on port %s", PORT);
});
