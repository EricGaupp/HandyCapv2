const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		isEmail: true,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		//Allow only letters per Sequelize validation docs
		is: /^[a-z]+$/i
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		//Allow only letters per Sequelize validation docs
		is: /^[a-z]+$/i
	}
});

module.exports = User;
