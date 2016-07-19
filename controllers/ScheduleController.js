var debug = require('debug')('api:ctrlSchedule');

var handleNotFound = function(data) {
    if(!data) {
        var err = new Error('Not Found');
        err.status = 404;
        throw err;
    }
    return data;
};

function ScheduleController(ScheduleModel) {
    this.model = ScheduleModel;
}

ScheduleController.prototype.getAll = function(request, response, next) {
    this.model.findAll()
    .then(function(data) {
        response.json(data);
    })
    .catch(next);
};

ScheduleController.prototype.getById = function(request, response, next) {
    var query = {
        where: {id : request.params._id}
    };

  	this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            response.json(data);
        })
    .catch(next);
};

ScheduleController.prototype.create = function(request, response, next) {
  	var body = request.body;

    this.model.create({
    	horary: body.horary,
    	date: body.date,
    	court_id: body.court_id,
    	enterprise_id: body.enterprise_id
    })
    .then(function(data){
        response.json(data);
    })
    .catch(next);

};

ScheduleController.prototype.update = function(request, response, next) {
    var _id  = request.params._id,
        body = request.body;

    var _schedule = {
        horary: body.horary,
    	date: body.date,
    	court_id: body.court_id
    };
	
  	var query = {
        where: {id : _id}
    };

    this.model.find(query)
        .then(handleNotFound)
        .then(function(data){
            data.update(_schedule)
                .then(function(schedule){
                    response.json(schedule);
            })
            .catch(next);
        })
    .catch(next);
};

ScheduleController.prototype.remove = function(request, response, next) {
    var _id  = request.params._id;

    var query = {
        where: {id : _id}
    };

    this.model.destroy(query)
        .then(handleNotFound)
        .then(function(rowDeleted){
            if(rowDeleted === 1){
                response.json({
                    message: 'Deleted successfully'
                });
            }
        })
        .catch(next);
};

module.exports = function(ScheduleModel) {
  	return new ScheduleController(ScheduleModel);
};