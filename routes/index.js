var express = require('express'),
  	router = express.Router();

var models = require('../models');
var AuthController = require('../controllers/AuthController')(models.Person);

// authentication
router.post('/token', AuthController.token.bind(AuthController));
// authentication facebook
router.post('/token-facebook', AuthController.tokenWithFacebook.bind(AuthController));
// get data user authenticate
router.get('/user', AuthController.middlewareAuth, AuthController.userData.bind(AuthController))

// player
router.use('/player', require('./player'));
// enterprise
router.use('/enterprise', require('./enterprise'));
// court
router.use('/court', require('./court'));
// schedule
router.use('/schedule', require('./schedule'));

module.exports = router;