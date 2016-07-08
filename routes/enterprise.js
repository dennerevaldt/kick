var express = require('express'),
    router  = express.Router();

var models = require('../models');
var EnterpriseController = require('../controllers/EnterpriseController')(models.Enterprise);
var AuthController = require('../controllers/AuthController')(models.Person);

// router.use(AuthController.middlewareAuth);

router.get('/', EnterpriseController.getAll.bind(EnterpriseController));
router.get('/:_id', EnterpriseController.getById.bind(EnterpriseController));
router.post('/', EnterpriseController.create.bind(EnterpriseController));
router.put('/:_id', EnterpriseController.update.bind(EnterpriseController));
router.delete('/:_id', EnterpriseController.remove.bind(EnterpriseController));

module.exports = router;