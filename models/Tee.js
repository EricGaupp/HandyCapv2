const Sequelize = require("sequelize");
const db = require("../config/database");

const Tee = db.define("tee", {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	yardage: {
		//Value is in yards and typically never over 8000. SMALLINT datatype ranges from 0-65000
		type: Sequelize.SMALLINT.UNSIGNED,
		allowNull: false
	},
	par: {
		type: Sequelize.TINYINT.UNSIGNED,
		allowNull: false
	},
	rating: {
		//Decimal value representing average scoring for a scratch player used in handicap calculations. Generally never more than a couple strokes over par (which is typically 72 for a championship course). Therefore we can store course rating as a decimal value with precision 3 and scale 1 decimal place (creating a max value of 99.9)
		type: Sequelize.DECIMAL(3, 1),
		allowNull: false
	},
	slope: {
		//Integer value representing difficulty to amateur golfers used in handicap calculations. Minimum value of 55 and maximum value of 155
		type: Sequelize.TINYINT.UNSIGNED,
		allowNull: false,
		//Constraints (mininmum value of 55 and maximum value of 155)
		min: 55,
		max: 155
	}
});

module.exports = Tee;
