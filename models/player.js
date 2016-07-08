'use strict';
module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define('Player', {
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Campo posição não pode estar em branco.'
                }
            }
        }
    
    }, 
    {
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        classMethods: {
            associate: function(models) {
            // associations can be defined here
                Player.belongsTo(models.Person, {foreignKey: 'person_id'});
            }
        },
        instanceMethods: function(){

        }
    });
    return Player;
};

