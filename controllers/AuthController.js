var debug   = require('debug')('api:controller:auth');
var jwt     = require('jwt-simple'),
    moment  = require('moment'),
    config  = require('config'),
    models  = require('../models');

function AuthController(PersonModel) {
    this.model = PersonModel;
}

AuthController.prototype.middlewareAuth = function(request, response, next) {
	var token = request.query.token || request.headers['x-access-token'];
	if(!token) {
		var err = new Error('Forbidden');
  	err.status = 403;
  	return next(err);
	}
	try {
  	var decoded = jwt.decode(token, config.get('jwtTokenSecret'));
  	var isExpired = moment(decoded.exp).isBefore(new Date());
    if(isExpired) {
        var err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    } else {
        request.user = decoded;
        next();
    }
	} catch(err) {
  	return next(err);
	}
};

AuthController.prototype.token = function(request, response, next) {
  var username = request.body.username;
  var password = request.body.password;
  if(!username || !password) {
    var err = new Error('Bad request');
    err.status = 400;
    return next(err);
  }
  this.model.findOne({ where: {username: username} })
    .then(function(data) {
      	if (data) {
            if (data.validPassword(password, data.password)) {
            	var expires = moment().add(7, 'days').valueOf();
            	var token = jwt.encode({
                id: data.id,
                typeperson: data.typeperson,
              	username: data.username,
              	exp: expires
            	}, config.get('jwtTokenSecret'));

            	response.json({
              	token: token
            	});
          	} else {
            	var err = new Error('Unauthorized');
            	err.status = 401;
            	next(err);
          	}
        } else {
          var err = new Error('Login inexistent');
          err.status = 404;
          next(err);
        }
    })
    .catch(next);
};

AuthController.prototype.tokenWithFacebook = function(request, response, next) {
  var email = request.body.email;
  var password = request.body.password;

  if(!email || !password) {
    var err = new Error('Bad request');
    err.status = 400;
    return next(err);
  }
  this.model.findOne({ where: {email: email} })
    .then(function(data) {
        if (data) {
            if (data.validPassword(password, data.password)) {
              var expires = moment().add(7, 'days').valueOf();
              var token = jwt.encode({
                id: data.id,
                typeperson: data.typeperson,
                username: data.username,
                exp: expires
              }, config.get('jwtTokenSecret'));

              response.json({
                token: token
              });
            } else {
              var err = new Error('Unauthorized');
              err.status = 401;
              next(err);
            }
        } else {
          var err = new Error('Login inexistent');
          err.status = 404;
          next(err);
        }
    })
    .catch(next);
};

AuthController.prototype.userData = function(request, response, next) {
    var _id = request.user.id;
    var _type = request.user.typeperson === 'P' ? models.Player : models.Enterprise;
    
    _type.findOne({ 
      where: {person_id: _id} ,
      include: [{
            model: this.model
        }]
    })
        .then(function(data) {
            response.json(data);
        })
        .catch(next);
};

module.exports = function(PersonModel) {
    return new AuthController(PersonModel);
};