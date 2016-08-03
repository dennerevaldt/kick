var debug  = require('debug')('api:ctrlCourt'),
    models = require('../models');

var handleNotFound = function(data) {
    if(!data) {
        var err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
    return data;
};

function CourtController(CourtModel) {
    this.model = CourtModel;
}

CourtController.prototype.getAll = function(request, response, next) {
    var query = {
        where: {enterprise_id : request.user.typeid},
        include: [{
            model: models.Schedule
        }]
    };

    this.model.findAll(query)
    .then(function(data) {
        response.json(data);
    })
     .catch(next);
};

CourtController.prototype.getById = function(request, response, next) {
    var query = {
        where: {id : request.params._id},
        include: [{
            model: models.Schedule 
        }]
    };

  	this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            response.json(data);
        })
    .catch(next);
};

CourtController.prototype.create = function(request, response, next) {
  	var body = request.body;

    this.model.create({
        name: body.name || "",
        category: body.category,
        enterprise_id: request.user.typeid
    })
    .then(function(data){
        response.json(data);
    })
    .catch(next);

};

CourtController.prototype.update = function(request, response, next) {
    var _id  = request.params._id,
        body = request.body;

    var _court = {
        name: body.name || "",
        category: body.category,
    };

  	var query = {
        where: {id : _id}
    };

    this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            data.update(_court)
                .then(function(court){
                	response.json(court);
                    return court;
                })
                .catch(next);
            return data;
        })
    .catch(next);
};

CourtController.prototype.remove = function(request, response, next) {
    var _id  = request.params._id;

    var query = {
        where: {id : _id}
    };

    this.model.destroy(query)
        .then(handleNotFound)
        .then(function(rowDeleted){
            if(rowDeleted === 1){
                response.json({
                    message: 'Deleted successfully'
                });
            }
        })
        .catch(next);
};

module.exports = function(CourtModel) {
  	return new CourtController(CourtModel);
};