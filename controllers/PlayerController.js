var debug = require('debug')('api:ctrlplayer');

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
  	this.model.findAll({})
        .then(function(data) {
            response.json(data);
        })
    .catch(next);
};

PlayerController.prototype.getById = function(request, response, next) {
  	var _id = request.params._id;
  	this.model.findOne(_id)
        .then(handleNotFound)
        .then(function(data){
            response.json(data);
        })
    .catch(next);
};

PlayerController.prototype.create = function(request, response, next) {
  	var body = request.body;
    
    var person = {
        username: body.username,
        password: body.password,
        fullname: body.fullname,
        email: body.email,
        district: body.district
    };

    var player = {
        id: null,
        position: body.position
    };

    var dataParam = {};
    dataParam.person = person;
    dataParam.player = player;

    this.model.create(dataParam)
            .then(function(data) {
                response.json(data);
            })
        .catch(next);
};

PlayerController.prototype.update = function(request, response, next) {
  	var _id  = request.params._id,
        body = request.body;
  	this.model.update(_id, body)
        .then(function(err, data) {
            response.json(data);
        })
    .catch(next);
};

PlayerController.prototype.remove = function(request, response, next) {
  	var _id = request.params._id;
  	this.model.remove(_id)
        .then(function(err, data) {
            response.json(data);
        })
    .catch(next);
};

module.exports = function(PlayerModel) {
  	return new PlayerController(PlayerModel);
};