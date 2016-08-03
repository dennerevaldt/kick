var express = require('express'),
    router  = express.Router();

var models = require('../models');
var ScheduleController = require('../controllers/ScheduleController')(models.Schedule);
var AuthController = require('../controllers/AuthController')(models.Person);

router.use(AuthController.middlewareAuth);

router.get('/', ScheduleController.getAll.bind(ScheduleController));
router.get('/enterprise/:_id', ScheduleController.getAllById.bind(ScheduleController));
router.get('/:_id', ScheduleController.getById.bind(ScheduleController));
router.post('/', ScheduleController.create.bind(ScheduleController));
router.put('/:_id', ScheduleController.update.bind(ScheduleController));
router.delete('/:_id', ScheduleController.remove.bind(ScheduleController));

module.exports = router;