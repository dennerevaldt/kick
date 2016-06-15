'use strict';

var db      = require('../db/mysql');
var Sequelize = require('sequelize');
var bcrypt    = require('bcrypt');

function PersonDAO(model) {
  this.model = model;
}

PersonDAO.prototype.create = function(data) {
  return this.model.create(data);
};

PersonDAO.prototype.update = function(_id, data) {
  var query = { 
    where: { id : _id } 
  };
  return this.model.update(data, query);
};

PersonDAO.prototype.remove = function(_id, callback) {
  var query = { 
    where: { id : _id } 
  };
  return this.model.destroy(query);
};

PersonDAO.prototype.find = function(query) {
  return this.model.find({
    where: query
  });
};

PersonDAO.prototype.findOne = function(_id) {
  var query = { 
    where: { id : _id }, 
    attributes: { exclude: ['password'] } 
  };
  return this.model.findOne(query);
};

PersonDAO.prototype.findAll = function(query) {
  return this.model.findAll({
    attributes: { exclude: ['password'] },
    where: query
  });
};

var Person = db.define('Person', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [5, 50],
                msg: 'Seu nome completo deve ter no mínimo 5 e no máximo 50 caracteres.'
            }
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            msg: 'Usuário já existe.'
        }
    },
    email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 8],
                msg: 'Sua senha deve ter no mínimo 6 e no máximo 8 caracteres.'
            }
        }
    },
    district: Sequelize.STRING
  }, 
  {
    timestamps: true,
    freezeTableName: true,
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

module.exports = new PersonDAO(Person);