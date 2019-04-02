"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return bcrypt.hash("BigCat1", 10).then(hash => {
      return queryInterface.bulkInsert(
        "Users",
        [
          {
            firstName: "Tiger",
            lastName: "Woods",
            email: "tiger.woods@thegoat.com",
            password: hash,
            createdAt: Sequelize.literal("NOW()"),
            updatedAt: Sequelize.literal("NOW()")
          }
        ],
        {}
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users", null, {});
  }
};
