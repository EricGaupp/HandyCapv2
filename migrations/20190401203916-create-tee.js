"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      yardage: {
        type: Sequelize.SMALLINT.UNSIGNED,
        allowNull: false
      },
      par: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false
      },
      slope: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { min: 55, max: 155 }
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
    return queryInterface.dropTable("Tees");
  }
};
