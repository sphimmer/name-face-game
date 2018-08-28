# Name Game

This is the Name Game with two modes: Guess the person's name and guess their job title

## API

Look at dev-aws-nodejs-dev-swagger.yaml to look at how the API is laid out is designed. 

### Code Architecture

I decided to keep the business logic separate from the Lambda functions in the case of using a different cloud provider. The business logic wouldn't have to change. Business logic can be found in the `util-classes/` directory. In there you will also find a `hooks/` directory that holds the interface for the MySQL database and a helper class for making HTTP responses

### UnitTesting

I used Node's Mocha &amp; Chai unit testing modules. When installed you can run `npm test` to run them. The data ingestion tests are skipped as of right now since the data is already in the database. 

## Database

I spun up a MySQL database to service the API. The DDL can be seen in database/ddl.sql

## Built With

* [Serverless](https://serverless.com) - The API framework used
* [Node.js](https://nodejs.org/en/) - Progamming language used
* [Bootstrap](https://getbootstrap.com/) - Frontend Framework used
* [AWS Lambda](https://aws.amazon.com/lambda/) - Serverless Computing Engine used
* [AWS API Gateway](https://aws.amazon.com/api-gateway/) - API Gateway Manager used


## Authors

* **Stuart Himmer** 

## Acknowledgments

* Hat tip to anyone whose code/modules was used
* Thank you to those at Willow Tree for providing the initial data and the opportunity to build this.
