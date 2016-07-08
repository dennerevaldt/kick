var express = require('express'),
    router  = express.Router();

var models = require('../models');
var PlayerController = require('../controllers/PlayerController')(models.Player);
var AuthController = require('../controllers/AuthController')(models.Person);

// router.use(AuthController.middlewareAuth);

router.get('/', PlayerController.getAll.bind(PlayerController));
router.get('/:_id', PlayerController.getById.bind(PlayerController));
router.post('/', PlayerController.create.bind(PlayerController));
router.put('/:_id', PlayerController.update.bind(PlayerController));
router.delete('/:_id', PlayerController.remove.bind(PlayerController));

module.exports = router;