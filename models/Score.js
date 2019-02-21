const Sequelize = require("sequelize");
const db = require("../config/database");

const Score = db.define("score", {
	date: {
		type: Sequelize.DATEONLY,
		allowNull: false
	},
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
		type: Sequelize.TINYINT.UNSIGNED,
		allowNull: false
	},
	differential: {
		type: Sequelize.DECIMAL(3, 1),
		allowNull: false
	}
});

module.exports = Score;
