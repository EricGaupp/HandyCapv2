module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    operatorsAliases: false,
    logging: false
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.JAWSDB_USERNAME,
    password: process.env.JAWSDB_PASSWORD,
    database: process.env.JAWSDB_DB_NAME,
    host: process.env.JAWSDB_HOSTNAME,
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    operatorsAliases: false,
    logging: false
  }
};
