var debug   = require('debug')('api:ctrlGame'),
    models  = require('../models');

var handleNotFound = function(data) {
    if(!data) {
        var err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
    return data;
};

function GameController(GameModel) {
    this.model = GameModel;
}

GameController.prototype.getAll = function(request, response, next) {
    var query = {
        where: {id : request.user.typeid}
    };

    models.Player.find(query)
        .then(function(player){
            player.getGames({
                    include: [
                        {
                            model: models.Schedule,
                            include:[models.Court]
                        }
                    ]
                })
                .then(function(games){
                    response.json(games);
                    return games;
                })
                .catch(next);
            return player;
        })
        .catch(next);
};

GameController.prototype.getById = function(request, response, next) {
    var query = {
        where: {id : request.params._id},
        include: [
        	{ model: models.Schedule },
	        {
	            model: models.Player,
	            include: [{
	            	model: models.Person
	            }]
	        }
	    ]
    };

  	this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            response.json(data);
        })
    .catch(next);
};

GameController.prototype.create = function(request, response, next) {
  	var body = request.body;
  	var query = {
        where: {id : request.user.typeid},
    };
    var gameCreated = {};
    // game
    this.model.create({
    	name: body.name,
    	creator_id: request.user.typeid,
    	schedule_id: body.schedule_id
	})
    .then(function(game){
    	gameCreated = game;
    	callbackPlayer();
    	return game;
    })
    .catch(next);
    // player
    function callbackPlayer() {
	    models.Player.find(query)
	    	.then(function(player){
	    		callbackGamePlayers(player);
	    		return player;
			})
			.catch(next);
	}
    //game_players
    function callbackGamePlayers(player){
	    player.addGame(gameCreated)
	   	    .then(function(data){
	   	    	return response.json(data);
	   	    })
	   	    .catch(next);
   	}
};

GameController.prototype.remove = function(request, response, next) {
    var _id  = request.params._id;
    var query = {
        where: {id : _id}
    };

    this.model.destroy(query)
        .then(function(data){
            response.json(data);
        })
        .catch(next);
};

GameController.prototype.update = function(request, response, next) {
	var _id  = request.params._id,
        body = request.body;

    var _game = {
        name: body.name,
    	schedule_id: body.schedule_id
    };

  	var query = {
        where: {id : _id}
    };

    this.model.find(query)
        .then(handleNotFound)
        .then(function(game){
            game.update(_game)
                .then(function(gameUpdated){
                	return response.json(gameUpdated);
            })
            .catch(next);
            return game;
        })
    .catch(next);
}

module.exports = function(GameModel) {
  	return new GameController(GameModel);
};