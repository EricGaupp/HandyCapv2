"use strict";
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define(
    "Score",
    {
      date: { type: DataTypes.DATEONLY, allowNull: false },
      gross: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
      adjustedGross: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
      },
      courseHandicap: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      net: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
      differential: { type: DataTypes.DECIMAL(3, 1), allowNull: false }
    },
    {}
  );
  Score.associate = models => {
    Score.belongsTo(models.User);
    Score.belongsTo(models.Tee);
  };
  return Score;
};
