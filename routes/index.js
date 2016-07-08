var express = require('express'),
  	router = express.Router();

var models = require('../models');
var AuthController = require('../controllers/AuthController')(models.Person);

// middleware authentication
router.post('/token', AuthController.token.bind(AuthController));
// get data user authenticate
router.get('/user', AuthController.middlewareAuth, AuthController.userData.bind(AuthController))
// player
router.use('/player', require('./player'));
// enterprise
router.use('/enterprise', require('./enterprise'));

module.exports = router;