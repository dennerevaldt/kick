var express = require('express'),
  	router = express.Router();

var UserModel = require('../models/UserModel');
var AuthController = require('../controllers/AuthController')(UserModel);

router.post('/token', AuthController.token.bind(AuthController));

// user
router.use('/user', require('./user'));

module.exports = router;