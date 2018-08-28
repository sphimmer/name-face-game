'use strict';
var mysql = require('mysql');

class MySQLHook{
	constructor(db){
		this.conn_config = {
		  host: process.env.MYSQL_HOST
		  , user:  process.env.MYSQL_USER
		  , password: process.env.MYSQL_PASSWORD
		  , database: db
		};
	}

	query_with_values(sql, values, callback){
		const conn = mysql.createConnection(this.conn_config);
		conn.connect(function(err) {
			if (err) {
				console.log('ERROR IN QUERY WITH VALUES: Connection error')
				console.log(err);
				callback(err);
			} else {
				conn.query(sql, values, function(err,result) {
					if (err) {
						console.log('ERROR IN QUERY WITH VALUES: Query Error')
						console.log(err);
						console.log(result);
						callback(err);

					} else {
						callback(null, result);

					}
					
				});
			}
		});
		
	}

	query(sql, callback){
		const conn = mysql.createConnection(this.conn_config);
		conn.connect(function(err){
			if (err) {
				console.log("ERROR IN QUERY: connection error");
				console.log(err);
				callback(err);

			} else {
				conn.query(sql, function(err, result){
					callback(err, result);

				});
			}
		});
		
	}
}


module.exports = MySQLHook;
