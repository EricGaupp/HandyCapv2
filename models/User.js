"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true, notEmpty: true, unique: true }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: /^[a-z]+$/i, notEmpty: true }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: /^[a-z]+$/i, notEmpty: true }
      }
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Score);
  };
  return User;
};
