const Sequelize = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	operatorsAliases: false,
	host: "localhost",
	dialect: "mysql",
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

module.exports = db;
