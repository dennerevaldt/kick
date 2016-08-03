var express = require('express'),
    router  = express.Router();

var models = require('../models');
var EnterpriseController = require('../controllers/EnterpriseController')(models.Enterprise);
var AuthController = require('../controllers/AuthController')(models.Person);

router.get('/', AuthController.middlewareAuth, EnterpriseController.getAll.bind(EnterpriseController));
router.get('/:_id', AuthController.middlewareAuth, EnterpriseController.getById.bind(EnterpriseController));
router.post('/', EnterpriseController.create.bind(EnterpriseController));
router.put('/:_id', AuthController.middlewareAuth, EnterpriseController.update.bind(EnterpriseController));
router.delete('/:_id', AuthController.middlewareAuth, EnterpriseController.remove.bind(EnterpriseController));
router.post('/proximity', AuthController.middlewareAuth, EnterpriseController.getAllProximity.bind(EnterpriseController));


module.exports = router;