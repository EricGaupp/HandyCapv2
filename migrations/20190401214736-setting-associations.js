"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    //Score.belongsTo(User) Association
    return (
      queryInterface
        .addColumn(
          "Scores", // name of Source model
          "UserId", // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Users", // name of Target model
              key: "id" // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        )
        //Score.belongsTo(Tee) Association
        .then(() => {
          return queryInterface.addColumn("Scores", "TeeId", {
            type: Sequelize.INTEGER,
            references: { model: "Tees", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          });
        })
        //Tee.belongsTo(Course) Association
        .then(() => {
          return queryInterface.addColumn("Tees", "CourseId", {
            type: Sequelize.INTEGER,
            references: { model: "Courses", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          });
        })
    );
  },

  down: (queryInterface, Sequelize) => {
    //Score.belongsTo(User) Association
    return (
      queryInterface
        .removeColumn(
          "Scores", // name of Source model
          "UserId" // key we want to remove
        )
        //Score.belongsTo(Tee) Association
        .then(() => {
          return queryInterface.removeColumn("Scores", "TeeId");
        })
        //Tee.belongsTo(Course) Association
        .then(() => {
          return queryInterface.removeColumn("Tees", "CourseId");
        })
    );
  }
};
