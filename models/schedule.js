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
                Schedule.belongsTo(models.Court, {foreignKey: 'court_id'});
                Schedule.hasOne(models.Game, {foreignKey: 'schedule_id', onDelete: 'cascade', hooks: true});
            }
        }
    });
    return Schedule;
};