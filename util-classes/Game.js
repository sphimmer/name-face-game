'use strict';

var MySQLHook = require('./hooks/MySQLHook');

class Game{
    constructor(){
        this.mysql = new MySQLHook('profiles');
    }

    get_faces(face_count, callback){
        let sql = `SELECT p.id
                        , p.first_name
                        , p.last_name
                        , h.url 
                    FROM peoples p 
                    INNER JOIN headshots h 
                        ON h.people_id = p.id 
                    WHERE h.url IS NOT NULL 
                    ORDER BY RAND() 
                    LIMIT ?`;
        this.mysql.query_with_values(sql, [face_count], function(err, response){

            if (err) {
                callback(err);
            }else{
                const rand_int = Math.floor(Math.random() * response.length);
                const result = {faces: []
                    , name_to_guess: {first_name: response[rand_int].first_name, last_name: response[rand_int].last_name}
                }

                for (var i = response.length - 1; i >= 0; i--) {
                    result.faces.push({id: response[i].id, image_url: response[i].url})
                }

                callback(null, result);
            }
        })
    }

    make_guess(id, name, callback){
        let sql = "SELECT * FROM peoples WHERE id = ? AND first_name = ? AND last_name = ?";
        this.mysql.query_with_values(sql, [id, name.first_name, name.last_name], function (err, result) {
            if (err) {
                callback(err);
            } else {
                if (result.length > 0) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
            
        })
    }

    get_job_titles(count, callback){
        let sql = `SELECT p.id
                    , p.first_name
                    , p.last_name
                    , h.url
                    , p.job_title 
                FROM peoples p 
                INNER JOIN headshots h 
                    ON h.people_id = p.id 
                WHERE h.url IS NOT NULL 
                AND p.job_title IS NOT NULL
                ORDER BY RAND() 
                LIMIT ?` ;
        this.mysql.query_with_values(sql, [count], function(err, result){
             if (err) {
                callback(err);
            } else {
                const rand_int = Math.floor(Math.random() * result.length);
                const resp = {people: [], job_title_to_guess: result[rand_int].job_title}
                for (var i = result.length - 1; i >= 0; i--) {
                    resp.people.push({id: result[i].id
                        , first_name: result[i].first_name
                        , last_name: result[i].last_name
                        , image_url: result[i].url
                    });
                }
                callback(null, resp);
            }
        });

    }

    make_job_title_guess(id, job_title, callback){
        let sql = "SELECT * FROM peoples WHERE id = ? AND job_title = ?";
        // console.log(id, job_title);
        this.mysql.query_with_values(sql, [id, job_title], function (err, result) {
            if (err) {
                callback(err);
            } else {
                if (result.length > 0) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
            
        });
    }

}

module.exports = Game;