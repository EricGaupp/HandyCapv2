"use strict";

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
          name: "Bobby Jones Golf Course",
          city: "Atlanta",
          state: "Georgia",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        },
        {
          name: "Crystal Lake Golf Course",
          city: "Hampton",
          state: "Georgia",
          createdAt: Sequelize.literal("NOW()"),
          updatedAt: Sequelize.literal("NOW()")
        }
      ],
      {}
    );

    const courses = await queryInterface.sequelize.query(
      "SELECT id from COURSES"
    );
    const courseRows = courses[0];
    console.log(courseRows);

    return await queryInterface.bulkInsert(
      "Tees",
      [
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
        }
      ],
      {}
    );
    // return bcrypt.hash("BigCat1", 10).then(hash => {
    //   return queryInterface.bulkInsert(
    //     "Users",
    //     [
    //       {
    //         firstName: "Tiger",
    //         lastName: "Woods",
    //         email: "tiger.woods@thegoat.com",
    //         password: hash,
    //         createdAt: Sequelize.literal("NOW()"),
    //         updatedAt: Sequelize.literal("NOW()")
    //       }
    //     ],
    //     {}
    //   );
    // });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Courses", null, {});
  }
};
