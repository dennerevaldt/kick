var express = require('express'),
    router  = express.Router();

var models = require('../models');
var GameController = require('../controllers/GameController')(models.Game);
var AuthController = require('../controllers/AuthController')(models.Person);

router.use(AuthController.middlewareAuth);

router.get('/', GameController.getAll.bind(GameController));
router.get('/:_id', GameController.getById.bind(GameController));
router.post('/', GameController.create.bind(GameController));
router.put('/:_id', GameController.update.bind(GameController));
router.delete('/:_id', GameController.remove.bind(GameController));

module.exports = router;