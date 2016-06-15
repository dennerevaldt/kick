'use strict';

var db        = require('../db/mysql');
var Sequelize = require('sequelize');
var PersonModel = require('./PersonModel');

function PlayerDAO(model) {
  this.model = model;
}

PlayerDAO.prototype.create = function(data) {
    var PlayerModel = this.model;
    return PersonModel.create(data.person)
        .then(function(person){
            var player = {
                person_id: person.dataValues.id,
                position: data.player.position
            };
            return PlayerModel.create(player);
        });
};

PlayerDAO.prototype.update = function(_id, data) {
  var query = { 
    where: { id : _id } 
  };
  return this.model.update(data, query);
};

PlayerDAO.prototype.remove = function(_id, callback) {
  var query = { 
    where: { id : _id } 
  };
  return this.model.destroy(query);
};

PlayerDAO.prototype.find = function(query) {
  return this.model.find({
    where: query
  });
};

PlayerDAO.prototype.findOne = function(_id) {
  var query = { 
    where: { id : _id }
  };
  return this.model.findOne(query);
};

PlayerDAO.prototype.findAll = function(query) {
    return this.model.findAll({ 
        include: [{
            model: db.models.Person, 
            attributes: {exclude: ['password']} 
        }] 
    });
};

var Player = db.define('Player', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        position: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Campo posição não pode estar em branco.'
                }
            }
        }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
);

db.models.Player.belongsTo(db.models.Person);

module.exports = new PlayerDAO(Player);