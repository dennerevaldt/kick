var debug   = require('debug')('api:controller:auth');
var jwt     = require('jwt-simple'),
    moment  = require('moment'),
    config  = require('config');

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
	        request.user = decoded.user;
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
    this.model.find({username: username})
        .then(function(data) {
          	if (data) {
                if (data.validPassword(password, data.password)) {
                  	var expires = moment().add(7, 'days').valueOf();
                  	var token = jwt.encode({
                    	user: username,
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

module.exports = function(PersonModel) {
    return new AuthController(PersonModel);
};