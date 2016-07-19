'use strict';
module.exports = function(sequelize, DataTypes) {
var Schedule = sequelize.define('Schedule', {
    horary: {
        type: DataTypes.TIME,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    }, {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
            // associations can be defined here
            }
        }
    });
    return Schedule;
};