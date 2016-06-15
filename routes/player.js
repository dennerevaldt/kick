var express = require('express'),
    router  = express.Router();

var PlayerModel = require('../models/PlayerModel');
var PlayerController = require('../controllers/PlayerController')(PlayerModel);
var AuthController = require('../controllers/AuthController')(PlayerModel);

// router.use(AuthController.middlewareAuth);

router.get('/', PlayerController.getAll.bind(PlayerController));
router.get('/:_id', PlayerController.getById.bind(PlayerController));
router.post('/', PlayerController.create.bind(PlayerController));
router.put('/:_id', PlayerController.update.bind(PlayerController));
router.delete('/:_id', PlayerController.remove.bind(PlayerController));

module.exports = router;