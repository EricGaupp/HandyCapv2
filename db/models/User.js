const Sequelize = require("sequelize");
const db = require("../config.js");

const User = db.define("user", {
	email: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	}
});

module.exports = User;
