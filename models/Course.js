"use strict";
module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define(
		"Course",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { notEmpty: true }
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { notEmpty: true }
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: { notEmpty: true }
			}
		},
		{}
	);
	Course.associate = function(models) {
		Course.hasMany(models.Tee);
	};
	return Course;
};
