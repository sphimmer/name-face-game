'use strict';

var Game = require('./util-classes/Game');
var HTTPResponse = require('./util-classes/hooks/HTTPResponse');

module.exports.six_faces = function(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;
	let game = new Game();
	game.get_faces(6, function(err, response){
		if(!err){
			let success = new HTTPResponse(200, response)
    		callback(null, success);
		} else {
			let error = new HTTPResponse(500, response)

    		callback(err, error);
		}
	});
    
};


module.exports.make_guess = function(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;
	
	if (event.body) {
		let body = JSON.parse(event.body);
		if (!body.id && !body.name) {
			let error = new HTTPResponse(400, {"message": "Expecting 2 items in body. {id, name}"});
			callback(null,error);
		} else {
			let game = new Game();
			game.make_guess(body.id, body.name, function(err, response){
				if (err) {
					let error = new HTTPResponse(400, err);
					callback(null, error);
				} else {
					const success = new HTTPResponse(200, response);
					callback(null, success);
				}
			});
		}
	} else {
		let error = new HTTPResponse(400, {"message": "POST body not found. expecting 2 items in body. {id, name}"});
		callback(null,error);
	}
}

module.exports.get_job_titles = function (event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;
	let game = new Game();
	game.get_job_titles(6, function(err, response){
		if(!err){
			let success = new HTTPResponse(200, response)
    		callback(null, success);
		} else {
			let error = new HTTPResponse(500, response)

    		callback(err, error);
		}
	});
}

module.exports.make_job_title_guess = function(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;
	
	if (event.body) {
		let body = JSON.parse(event.body);
		if (!body.id && !body.job_title) {
			let error = new HTTPResponse(400, {"message": "Expecting 2 items in body. {id, job_title}"});
			callback(null,error);
		} else {
			let game = new Game();
			game.make_job_title_guess(body.id, body.job_title, function(err, response){
				if (err) {
					let error = new HTTPResponse(400, err);
					callback(null, error);
				} else {
					const success = new HTTPResponse(200, response);
					callback(null, success);
				}
			});
		}
	} else {
		let error = new HTTPResponse(400, {"message": "POST body not found. expecting 2 items in body. {id, job_title}"});
		callback(null,error);
	}
}