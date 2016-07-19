'use strict';
module.exports = function(sequelize, DataTypes) {
    var Court = sequelize.define('Court', {
        name: DataTypes.STRING,
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                // Schedules
                Court.hasMany(models.Schedule, {foreignKey: 'court_id'});
            }
        }
    });
    return Court;
};