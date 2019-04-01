"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tee = sequelize.define(
    "Tee",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      yardage: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
      par: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
      rating: { type: DataTypes.DECIMAL(3, 1), allowNull: false },
      slope: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 55, max: 155 }
      }
    },
    {}
  );
  Tee.associate = function(models) {
    Tee.hasMany(models.Score);
    Tee.belongsTo(models.Course);
  };
  return Tee;
};
