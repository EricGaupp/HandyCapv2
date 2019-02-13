const Sequelize = require("sequelize");
const db = require("../config/database");

const Score = db.define("score", {
	gross: {
		type: Sequelize.TINYINT.UNSIGNED,
		allowNull: false
	},
	adjustedGross: {
		type: Sequelize.TINYINT.UNSIGNED,
		allowNull: true
	},
	courseHandicap: {
		type: Sequelize.TINYINT.UNSIGNED,
		allowNull: false,
		defaultValue: 0
	},
	net: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Score;
