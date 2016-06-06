'use strict';

var db = require('../db/mysql');
var Sequelize = require('sequelize');

function UserDAO(model) {
	this.model = model;
}

UserDAO.prototype.create = function(data) {
	return this.model.create(data);
};

UserDAO.prototype.find = function(query) {
	return this.model.all({});
};

UserDAO.prototype.findOne = function(_id) {
	var query = { where: { id : _id } };
	return this.model.findOne(query);
};

UserDAO.prototype.update = function(_id, data) {
	var query = { where: { id : _id } };
	return this.model.update(data, query);
};

UserDAO.prototype.remove = function(_id, callback) {
	var query = { where: { id : _id } };
	return this.model.destroy(query);
};

var User = db.define('users', {
	id: {
		primaryKey      : true,
		autoIncrement   : true,
		type            : Sequelize.INTEGER
	},
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, 
{
	timestamps: true
});

module.exports = new UserDAO(User);