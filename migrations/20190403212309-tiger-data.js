"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tees = await queryInterface.sequelize.query("SELECT id from Tees");
    const teeRows = tees[0];

    await bcrypt.hash(process.env.TIGERS_PASSWORD, 10).then(hash => {
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

    const users = await queryInterface.sequelize.query("SELECT id from Users");
    const userRows = users[0];

    return await queryInterface.bulkInsert(
      "Scores",
      [
        //Tour Championship Vicotry
        {
          date: "2018-09-20",
          gross: 65,
          adjustedGross: 65,
          courseHandicap: 0,
          net: 65,
          differential: -7.7,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2018-09-21",
          gross: 68,
          adjustedGross: 68,
          courseHandicap: 0,
          net: 68,
          differential: -4.9,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2018-09-22",
          gross: 65,
          adjustedGross: 65,
          courseHandicap: 0,
          net: 65,
          differential: -7.7,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2018-09-23",
          gross: 71,
          adjustedGross: 71,
          courseHandicap: 0,
          net: 71,
          differential: -2.4,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2013-09-19",
          gross: 73,
          adjustedGross: 73,
          courseHandicap: 0,
          net: 73,
          differential: -0.7,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2013-09-20",
          gross: 71,
          adjustedGross: 71,
          courseHandicap: 0,
          net: 71,
          differential: -2.4,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2013-09-21",
          gross: 69,
          adjustedGross: 69,
          courseHandicap: 0,
          net: 69,
          differential: -4.1,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2013-09-22",
          gross: 67,
          adjustedGross: 67,
          courseHandicap: 0,
          net: 67,
          differential: -5.7,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2012-09-20",
          gross: 66,
          adjustedGross: 66,
          courseHandicap: 0,
          net: 66,
          differential: -6.6,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2012-09-21",
          gross: 73,
          adjustedGross: 73,
          courseHandicap: 0,
          net: 73,
          differential: -0.7,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2012-09-22",
          gross: 67,
          adjustedGross: 67,
          courseHandicap: 0,
          net: 67,
          differential: -5.7,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2012-09-23",
          gross: 72,
          adjustedGross: 72,
          courseHandicap: 0,
          net: 72,
          differential: -1.6,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2009-09-24",
          gross: 67,
          adjustedGross: 67,
          courseHandicap: 0,
          net: 67,
          differential: -5.7,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2009-09-25",
          gross: 68,
          adjustedGross: 68,
          courseHandicap: 0,
          net: 68,
          differential: -4.9,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2009-09-26",
          gross: 69,
          adjustedGross: 69,
          courseHandicap: 0,
          net: 69,
          differential: -4.1,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2009-09-27",
          gross: 70,
          adjustedGross: 70,
          courseHandicap: 0,
          net: 70,
          differential: -3.2,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2007-09-13",
          gross: 64,
          adjustedGross: 64,
          courseHandicap: 0,
          net: 64,
          differential: -8.2,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2007-09-14",
          gross: 63,
          adjustedGross: 63,
          courseHandicap: 0,
          net: 63,
          differential: -9.1,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2007-09-15",
          gross: 64,
          adjustedGross: 64,
          courseHandicap: 0,
          net: 64,
          differential: -8.2,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          date: "2007-09-16",
          gross: 66,
          adjustedGross: 66,
          courseHandicap: 0,
          net: 66,
          differential: -6.6,
          UserId: userRows[0].id,
          TeeId: teeRows[23].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      "SELECT id from Users WHERE email='tiger.woods@thegoat.com'"
    );
    const tiger = users[0];

    //Delete Tiger's Scores
    await queryInterface.bulkDelete("Scores", { UserId: tiger[0].id }, {});

    //Delete Tiger's User
    return await queryInterface.bulkDelete("Users", { id: tiger[0].id }, {});
  }
};
