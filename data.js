'use strict';

var request = require('request');
var WillowTreeProfileData = require('./util-classes/WillowTreeProfileData');
var HTTPResponse = require('./util-classes/hooks/HTTPResponse');

module.exports.data_get = function(event, context, callback){
    context.callbackWaitsForEmptyEventLoop = false;
    const wt = new WillowTreeProfileData(request); 
    const url = 'https://www.willowtreeapps.com/api/v1.0/profiles'
    wt.get_data(url, function(err, result){
        if (!err) {
            wt.save_data(result, function(err, response){
                if (err) {
                     let r = new HTTPResponse(500, { "message": "Error loading data into database" });
                     callback(null, r);
                } else {
                    let r = new HTTPResponse(200, { "message": "Data Loaded into database" });
                    callback(null, r)
                }
                
            });
        } else {
            let error = new HTTPResponse(500, {"message": "Error in data retrieval", "error": err});
            callback(null, error);
        }
    });
}
