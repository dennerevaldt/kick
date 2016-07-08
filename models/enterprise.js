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
                // associations can be defined here
                Enterprise.belongsTo(models.Person, {foreignKey: 'person_id'});
            }
        }
    });
    return Enterprise;
};