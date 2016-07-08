var debug = require('debug')('api:ctrlPlayer');
var models = require('../models');

var handleNotFound = function(data) {
    if(!data) {
        var err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
    return data;
};

function PlayerController(PlayerModel) {
    this.model = PlayerModel;
}

PlayerController.prototype.getAll = function(request, response, next) {
  	var query = {
        include: [{
            model: models.Person, 
            attributes: {exclude: ['password']} 
        }]
    };

    this.model.findAll(query)
    .then(function(data) {
        response.json(data);
    })
    .catch(next);
};

PlayerController.prototype.getById = function(request, response, next) {
    var query = {
        where: {id : request.params._id},
        include: [{
            model: models.Person,
            attributes: {
                exclude: ['password']
            }
        }]
    };

  	this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            response.json(data);
        })
    .catch(next);
};

PlayerController.prototype.create = function(request, response, next) {
  	var body = request.body;

    var _person = {
        username: body.username,
        password: body.password,
        fullname: body.fullname,
        email: body.email,
        district: body.district,
        typeperson: 'P',
        lat: body.lat,
        lng: body.lng
    };

    this.model.create({
        position: body.position,
        Person: _person
    }, {
        include: [models.Person]
    })
    .then(function(data){
        response.json(data);
    })
    .catch(next);

};

PlayerController.prototype.update = function(request, response, next) {
    var _id  = request.params._id,
        body = request.body;

    var _person = {
        username: body.username,
        fullname: body.fullname,
        email: body.email,
        district: body.district,
        typeperson: 'P',
        lat: body.lat,
        lng: body.lng
    };

    var _player = {
        position: body.position
    };
	
  	var query = {
        where: {id : _id},
        include: [{
            model: models.Person,
            attributes: {
                exclude: ['password']
            }
        }]
    };

    this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            data.Person.update(_person)
                .then(function(person){
                    data.update(_player)
                        .then(function(player){
                        response.json(player);
                    })
                    .catch(next);
            })
            .catch(next);
        })
    .catch(next);
};

PlayerController.prototype.remove = function(request, response, next) {
    var _id  = request.params._id;

    var query = {
        where: {id : _id},
        include: [{
            model: models.Person,
            attributes: {
                exclude: ['password']
            }
        }]
    };

    this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            data.Person.destroy()
                .then(function(data){
                    response.json(data);
                })
                .catch(next);
        })
        .catch(next);
};

module.exports = function(PlayerModel) {
  	return new PlayerController(PlayerModel);
};