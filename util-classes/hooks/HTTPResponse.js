'use-strict';

class HTTPResponse{
	constructor(status_code, body){
		this.statusCode = status_code;
		this.body = JSON.stringify(body);
		this.headers = {
	        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
	        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
	      };
	}
}

module.exports = HTTPResponse;