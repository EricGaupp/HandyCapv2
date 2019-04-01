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
        type: DataTypes.STRING,
        allowNull: false
      },
      yardage: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
      },
      par: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
      },
      rating: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false
      },
      slope: {
        type: DataTypes.INTEGER,
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
