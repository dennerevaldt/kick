var express = require('express'),
  	router = express.Router();

var PersonModel = require('../models/PersonModel');
var AuthController = require('../controllers/AuthController')(PersonModel);

router.post('/token', AuthController.token.bind(AuthController));

// player
router.use('/player', require('./player'));

module.exports = router;