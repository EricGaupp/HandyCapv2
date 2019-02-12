const Sequelize = require("sequelize");
const db = require("../config/database");

const Course = db.define("course", {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	city: {
		type: Sequelize.STRING,
		allowNull: false
	},
	state: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Course;
