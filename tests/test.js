'use-strict';
var request = require('request');
var expect = require('chai').expect;
var AWS = require('aws-sdk')
var Game = require('../util-classes/Game');

var WillowTreeProfileData = require('../util-classes/WillowTreeProfileData');

var dynamo = new AWS.DynamoDB.DocumentClient();


describe.skip('WillowTreeProfileData.get_data()', function(){
    it('should retrieve urls data', function(){
        //arrange
        let url = 'https://www.willowtreeapps.com/api/v1.0/profiles';
        const status_code = 200;

        //act
        const wt = new WillowTreeProfileData(request, dynamo); 
        wt.get_data(url, function(err, response){
            // assert
            expect(wt.status_code).to.be.equal(status_code);
            expect(response).to.be.an('string');

        });
    });
});


describe.skip('WillowTreeProfileData.save_data()', function(){
    it('should save json string to dynamo', function(){
        // arrange
        var test_data = require('./profile_data')
        const expected_response = "Data loaded into mysql";

        //act
        const wt = new WillowTreeProfileData(request, dynamo); 
        wt.save_data(test_data, function(err, response){
            // assert
            expect(response).to.be.equal(expected_response);
            expect(err).to.be.equal(null);
        });
    });
});


describe('Game.get_six_faces()', function(){
    it('should get six profile objects and a name to guess', function(done){
        // arrange
        const object_count = 6;
        // act
        let game = new Game();
        game.get_faces(object_count, function(err, response){
            // assert

            expect(object_count).to.be.equal(response.faces.length);
            expect(response.faces[0].id).to.be.a('string');
            expect(response.name_to_guess.first_name).to.be.a('string');
            expect(response.name_to_guess.last_name).to.be.a('string');
            done();
        });
    });
});

describe('Game.make_guess()', function(){
    it('should get one false and one true', function(done){
        // arrange
        
        const name_1 = {first_name:'Matt', last_name: 'VanNuys'};
        const name_2 = {first_name: 'Stuart', last_name:'Himmer'};

        const id_1 = '77fk4hAiJyOkMIkUOyGGya';
        const id_2 = '12345';
        // act
        let game = new Game();
        // assert
        game.make_guess(id_1, name_1, function(err, response){
            
            expect(response).to.be.equal(true);
            
        });

        game.make_guess(id_2, name_2, function(err, response){

            expect(response).to.be.equal(false);
            done();
        });
    });
});



describe('Game.get_job_titles()', function(){
    it('should get six profile objects and a jobt title to guess', function(done){
        // arrange
        const object_count = 6;
        // act
        let game = new Game();
        game.get_job_titles(object_count, function(err, response){
            // assert

            expect(object_count).to.be.equal(response.people.length);
            expect(response.people[0].id).to.be.a('string');
            expect(response.job_title_to_guess).to.be.a('string');
            done();
        });
    });
});

describe('Game.make_job_title_guess()', function(){
    it('should get one false and one true', function(done){
        // arrange
        
        const job_title1 = 'Senior Software Engineer';
        const job_title2 = 'Project Manager';

        const id = '77fk4hAiJyOkMIkUOyGGya';
       
        // act
        let game = new Game();
        // assert
        game.make_job_title_guess(id, job_title1, function(err, response){
            
            expect(response).to.be.equal(true);     
            
        });

        game.make_job_title_guess(id, job_title2, function(err, response){

            expect(response).to.be.equal(false);
            done();
        });
    });
});