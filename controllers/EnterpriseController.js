var debug = require('debug')('api:ctrlEnterprise');
var models = require('../models');

var handleNotFound = function(data) {
    if(!data) {
        var err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
    return data;
};

function EnterpriseController(EnterpriseModel) {
    this.model = EnterpriseModel;
}

EnterpriseController.prototype.getAll = function(request, response, next) {
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

EnterpriseController.prototype.getById = function(request, response, next) {
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

EnterpriseController.prototype.create = function(request, response, next) {
  	var body = request.body;
    
    var _person = {
        username: body.username,
        password: body.password,
        fullname: body.fullname,
        email: body.email,
        district: body.district,
        typeperson: 'E',
        lat: body.lat,
        lng: body.lng
    };

    this.model.create({
        telephone: body.telephone,
        Person: _person
    }, {
        include: [models.Person]
    })
    .then(function(data){
        response.json(data);
    })
    .catch(next);

};

EnterpriseController.prototype.update = function(request, response, next) {
    var _id  = request.params._id,
        body = request.body;

    var _person = {
        username: body.username,
        fullname: body.fullname,
        email: body.email,
        district: body.district,
        typeperson: 'E',
        lat: body.lat,
        lng: body.lng
    };

    var _enterprise = {
        telephone: body.telephone
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
                    data.update(_enterprise)
                        .then(function(enterprise){
                        response.json(enterprise);
                    })
                    .catch(next);
            })
            .catch(next);
        })
    .catch(next);
};

EnterpriseController.prototype.remove = function(request, response, next) {
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

module.exports = function(EnterpriseModel) {
  	return new EnterpriseController(EnterpriseModel);
};