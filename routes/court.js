var express = require('express'),
    router  = express.Router();

var models = require('../models');
var CourtController = require('../controllers/CourtController')(models.Court);
var AuthController = require('../controllers/AuthController')(models.Person);

router.use(AuthController.middlewareAuth);

router.get('/', CourtController.getAll.bind(CourtController));
router.get('/:_id', CourtController.getById.bind(CourtController));
router.post('/', CourtController.create.bind(CourtController));
router.put('/:_id', CourtController.update.bind(CourtController));
router.delete('/:_id', CourtController.remove.bind(CourtController));

module.exports = router;