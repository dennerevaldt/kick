'use strict';
module.exports = function(sequelize, DataTypes) {
    var Invitation = sequelize.define('Invitation', {
        situation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Invitation.belongsTo(models.Game, {foreignKey: 'game_id'});
            }
        }
    });
    return Invitation;
};