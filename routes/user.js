var express = require('express'),
    router  = express.Router();

var UserModel = require('../models/UserModel');
var UserController = require('../controllers/UserController')(UserModel);
var AuthController = require('../controllers/AuthController')(UserModel);

// router.use(AuthController.middlewareAuth);

router.get('/', UserController.getAll.bind(UserController));
router.get('/:_id', UserController.getById.bind(UserController));
router.post('/', UserController.create.bind(UserController));
router.put('/:_id', UserController.update.bind(UserController));
router.delete('/:_id', UserController.remove.bind(UserController));

module.exports = router;