"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Scores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
        allowNull: false
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
    return queryInterface.dropTable("Scores");
  }
};
