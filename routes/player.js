var express = require('express'),
    router  = express.Router();

var models = require('../models');
var PlayerController = require('../controllers/PlayerController')(models.Player);
var AuthController = require('../controllers/AuthController')(models.Person);

//router.use(AuthController.middlewareAuth);

router.get('/', AuthController.middlewareAuth, PlayerController.getAll.bind(PlayerController));
router.get('/:_id', AuthController.middlewareAuth, PlayerController.getById.bind(PlayerController));
router.post('/', PlayerController.create.bind(PlayerController));
router.put('/:_id', AuthController.middlewareAuth, PlayerController.update.bind(PlayerController));
router.delete('/:_id', AuthController.middlewareAuth, PlayerController.remove.bind(PlayerController));

module.exports = router;