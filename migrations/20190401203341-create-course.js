"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
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
    return queryInterface.dropTable("Courses");
  }
};
