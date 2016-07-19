'use strict';
module.exports = function(sequelize, DataTypes) {
    var Enterprise = sequelize.define('Enterprise', {
        telephone: DataTypes.STRING,
    }, 
    {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                // Person
                Enterprise.belongsTo(models.Person, {foreignKey: 'person_id'});
                // Court
                Enterprise.hasMany(models.Court, {foreignKey: 'enterprise_id'});
                // Schedules
                Enterprise.hasMany(models.Schedule, {foreignKey: 'enterprise_id'});
            }
        }
    });
    return Enterprise;
};