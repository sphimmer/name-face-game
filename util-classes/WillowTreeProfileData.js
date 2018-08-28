'use strict';
var MySQLHook = require('./hooks/MySQLHook');

class WillowTreeProfileData{
    constructor(request){
        this.request = request;
        this.mysql = new MySQLHook('profiles');
    }

    get_data(url, callback){
        this.request(url, function (error, response, body) {
            this.status_code = response.statusCode
            if (error) {
                console.log('error:', error); // Print the error if one occurred
                callback(error,response.statusCode)
            } else{
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

                callback(null,body);
            }
        });
    }

    save_data(data, callback){


        if (typeof(data) == 'string') {
            data = JSON.parse(data)
        }

        var people_data = [];
        var headshot_data = [];
        var social_links_data = [];

        for (var i = data.length - 1; i >= 0; i--) {

            // people table insert
             people_data.push([ data[i].id 
               , data[i].type 
               , data[i].slug 
               , data[i].jobTitle 
               , data[i].firstName  
               , data[i].lastName  
               , data[i].bio ]);

            // headshot table insert
            headshot_data.push([data[i].id 
                , data[i].headshot.type
                , data[i].headshot.mimeType
                , data[i].headshot.id
                , data[i].headshot.url
                , data[i].headshot.alt
                , data[i].headshot.height
                , data[i].headshot.width]);
            
        }

        let people_insert = "INSERT INTO peoples (id, type, slug, job_title, first_name, last_name, bio) VALUES ?";
        let headshot_insert = "INSERT INTO headshots (people_id, type, mime_type, image_id, url, alt, height, width) VALUES ?";

        this.mysql.query_with_values(people_insert, [people_data], function(err, result){
            if (err) {
                callback(err);
            }
            
        });

        this.mysql.query_with_values(headshot_insert, [headshot_data], function(err, result){
            if (err) {
                callback(err);
            } else {
               callback(null, 'Data loaded into mysql'); 
            }
        });  
        
    }

}


module.exports = WillowTreeProfileData;
