var debug = require('debug')('api:ctrluser');

var handleNotFound = function(data) {
    if(!data) {
        var err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
    return data;
};

function UserController(UserModel) {
    this.model = UserModel;
}

UserController.prototype.getAll = function(request, response, next) {
  	this.model.find({})
        .then(function(data) {
            response.json(data);
        })
    .catch(next);
};

UserController.prototype.getById = function(request, response, next) {
  	var _id = request.params._id;
  	this.model.findOne(_id)
        .then(handleNotFound)
        .then(function(data){
            response.json(data);
        })
    .catch(next);
};

UserController.prototype.create = function(request, response, next) {
  	var body = request.body;
  	this.model.create(body)
        .then(function(err, data) {
            response.json(data);
        })
    .catch(next);
};

UserController.prototype.update = function(request, response, next) {
  	var _id  = request.params._id,
        body = request.body;
  	this.model.update(_id, body)
        .then(function(err, data) {
            response.json(data);
        })
    .catch(next);
};

UserController.prototype.remove = function(request, response, next) {
  	var _id = request.params._id;
  	this.model.remove(_id)
        .then(function(err, data) {
            response.json(data);
        })
    .catch(next);
};

module.exports = function(UserModel) {
  	return new UserController(UserModel);
};