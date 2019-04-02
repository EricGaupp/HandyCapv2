"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true, notEmpty: true }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { is: /^[a-z]+$/i, notEmpty: true }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { is: /^[a-z]+$/i, notEmpty: true }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
