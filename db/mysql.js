var sequelize = require('sequelize'),
    config    = require('config'),
    debug     = require('debug')('api:db');

var db = new sequelize(
	config.get('mysql.database'),
	config.get('mysql.username'), 
	config.get('mysql.password'), 
	{
		host: config.get('mysql.server'),
		dialect: config.get('mysql.dialect'),

		pool: {
	    	max: 5,
	    	min: 0,
	    	idle: 10000
	  	}

	  	// SQLite only
	  	// storage: 'path/to/database.sqlite'
	});

var test = db.authenticate()
    .then(function () {
        debug("CONNECTED! ");
    })
    .catch(function (err) {
        debug("SOMETHING DONE GOOFED");
    })
    .done();

module.exports = db;
