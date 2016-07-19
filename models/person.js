'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var Person = sequelize.define('Person', {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 50],
                    msg: 'Seu nome completo deve ter no mínimo 5 e no máximo 50 caracteres.'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Usuário já existe.'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'E-mail já existe.'
            },
            validate: {
                isEmail: {
                    msg: 'E-mail inválido.'
                } 
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100],
                    msg: 'Sua senha deve ter no mínimo 6 e no máximo 8 caracteres.'
                }
            }
        },
        district: DataTypes.STRING,
        typeperson: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
            // associations can be defined here
                Person.hasOne(models.Player, {foreignKey: 'person_id', onDelete: 'cascade', hooks: true});
                Person.hasOne(models.Enterprise, {foreignKey: 'person_id', onDelete: 'cascade', hooks: true});
            }
        },
        hooks: {
            beforeValidate: function (user, options) {
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }

                if (typeof user.username === 'string') {
                    user.username = user.username.toLowerCase();
                }
            },
            beforeCreate: function(user, options) {
                if (!user.password) return; 
                user.password = bcrypt.hashSync(user.password, 10);
            }
        },
        instanceMethods : {
            validPassword: function(password, hash){
                return bcrypt.compareSync(password, hash);
            }
        }
    });
    return Person;
};