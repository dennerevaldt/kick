'use strict';
module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define('Game', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creator_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Game.hasMany(models.Invitation, {foreignKey: 'game_id'});
                Game.belongsTo(models.Schedule, {foreignKey: 'schedule_id'});
                Game.belongsToMany(models.Player, {through: 'Game_Players', foreignKey: 'game_id', otherKey: 'player_id'});
            }
        }
    });
    return Game;
};