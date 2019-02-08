const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const Sequelize = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
