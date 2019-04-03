"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Courses",
      [
        {
          name: "Cobblestone Golf Course",
          city: "Acworth",
          state: "Georgia",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Wolf Creek Golf Course",
          city: "Atlanta",
          state: "Georgia",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Cherokee Run Golf Course",
          city: "Conyers",
          state: "Georgia",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Echelon Golf Club",
          city: "Alpharetta",
          state: "Georgia",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "East Lake Golf Course",
          city: "Atlanta",
          state: "Georgia",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        }
      ],
      {}
    );

    const courses = await queryInterface.sequelize.query(
      "SELECT id from Courses"
    );
    const courseRows = courses[0];

    await queryInterface.bulkInsert(
      "Tees",
      [
        //Cobblestone Tees
        {
          name: "Black",
          yardage: 6759,
          par: 71,
          rating: 73.5,
          slope: 139,
          courseId: courseRows[0].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Blue",
          yardage: 6272,
          par: 71,
          rating: 71.2,
          slope: 134,
          courseId: courseRows[0].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "White (M)",
          yardage: 5843,
          par: 71,
          rating: 69.4,
          slope: 128,
          courseId: courseRows[0].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "White (W)",
          yardage: 5843,
          par: 71,
          rating: 75.0,
          slope: 134,
          courseId: courseRows[0].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Green",
          yardage: 5400,
          par: 71,
          rating: 72.5,
          slope: 134,
          courseId: courseRows[0].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        //Wolf Creek Tees
        {
          name: "Black",
          yardage: 7069,
          par: 72,
          rating: 73.2,
          slope: 143,
          courseId: courseRows[1].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Gold",
          yardage: 6656,
          par: 72,
          rating: 71.2,
          slope: 138,
          courseId: courseRows[1].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Blue",
          yardage: 6189,
          par: 72,
          rating: 69.0,
          slope: 130,
          courseId: courseRows[1].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Silver",
          yardage: 5420,
          par: 72,
          rating: 67.7,
          slope: 127,
          courseId: courseRows[1].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Red",
          yardage: 5262,
          par: 72,
          rating: 70.1,
          slope: 125,
          courseId: courseRows[1].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        //Cherokee Run Tees
        {
          name: "Black",
          yardage: 7016,
          par: 72,
          rating: 75.1,
          slope: 143,
          courseId: courseRows[2].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Blue",
          yardage: 6564,
          par: 72,
          rating: 72.8,
          slope: 139,
          courseId: courseRows[2].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "August (M)",
          yardage: 6083,
          par: 72,
          rating: 70.4,
          slope: 133,
          courseId: courseRows[2].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "August (W)",
          yardage: 6083,
          par: 72,
          rating: 76.8,
          slope: 146,
          courseId: courseRows[2].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Gold",
          yardage: 5286,
          par: 72,
          rating: 66.4,
          slope: 122,
          courseId: courseRows[2].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Burgundy",
          yardage: 4948,
          par: 72,
          rating: 70.6,
          slope: 124,
          courseId: courseRows[2].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        //Echelon Tees
        {
          name: "Tournament",
          yardage: 7558,
          par: 72,
          rating: 77.8,
          slope: 154,
          courseId: courseRows[3].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Gold",
          yardage: 7076,
          par: 72,
          rating: 74.9,
          slope: 150,
          courseId: courseRows[3].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Blue",
          yardage: 6552,
          par: 72,
          rating: 71.9,
          slope: 139,
          courseId: courseRows[3].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Blue/White",
          yardage: 6268,
          par: 72,
          rating: 70.8,
          slope: 133,
          courseId: courseRows[3].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "White (M)",
          yardage: 6025,
          par: 72,
          rating: 70.0,
          slope: 129,
          courseId: courseRows[3].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "White (W)",
          yardage: 6025,
          par: 72,
          rating: 76.2,
          slope: 144,
          courseId: courseRows[3].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Red",
          yardage: 4984,
          par: 72,
          rating: 69.8,
          slope: 125,
          courseId: courseRows[3].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        //East Lake Tees
        {
          name: "Black",
          yardage: 6883,
          par: 72,
          rating: 73.9,
          slope: 136,
          courseId: courseRows[4].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Blue",
          yardage: 6433,
          par: 72,
          rating: 71.7,
          slope: 130,
          courseId: courseRows[4].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Gold (M)",
          yardage: 5445,
          par: 72,
          rating: 66.9,
          slope: 122,
          courseId: courseRows[4].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Gold (W)",
          yardage: 6883,
          par: 72,
          rating: 72.5,
          slope: 131,
          courseId: courseRows[4].id,
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        }
      ],
      {}
    );

    const tees = await queryInterface.sequelize.query("SELECT id from Tees");
    const teeRows = tees[0];

    await bcrypt.hash("BigCat1", 10).then(hash => {
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
  //Down function will not work unless seed data is stored (http://docs.sequelizejs.com/manual/migrations.html#seed-storage),
  down: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      "SELECT id from Users WHERE email='tiger.woods@thegoat.com'"
    );
    const tiger = users[0];

    //Delete Tiger's Scores
    await queryInterface.bulkDelete("Scores", { UserId: tiger.id }, {});

    //Delete Tiger's User
    return await queryInterface.bulkDelete("Users", { id: tiger.id }, {});
  }
};
