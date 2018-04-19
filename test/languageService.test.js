var languageService = require('../services/language.service');
var chai = require('chai');
var should = chai.should;
var expect = chai.expect;

var details = {
    author: 'Sanchez, Macku',
    dateExecuted: new Date(),
}

function testAuthor(){
    console.log('   Author: ' + details.author);
    console.log('   Date Executed: ' + details.dateExecuted+'\n');
}


//the test cases only check return values from the service (promise). check db values manually


describe('language service testing', function(){

   before(function(){
        //set timeout to 10s
        this.timeout(10000);
        testAuthor();
    });

    describe('getDefaultLanguage()', function(){

        

        //it is suggested to clean (either manually or other service methods) the test data inserted to the database
        //if service methods will be used, use before() hook
        //before(function(){});

        it('should return an object that has a language pack that depends on the default language set by the Admin', function(){
            //testAuthor();
            return languageService.getDefaultLanguage({}).then(function(data){
                //console.log(Object.keys(data)[0]);
                expect(data).to.be.an('object');
            });
        });
        
    });

    describe('getSpecificLanguage()', function(){
         
        //it is suggested to clean (either manually or other service methods) the test data inserted to the database
        //if service methods will be used, use before() hook
        //before(function(){});

        it('should return an object that is english language pack', function(){
            //testAuthor();
            var qwe={params:{user:'english'}};
        
            return languageService.getSpecificLanguage(qwe).then(function(data){
                //console.log(Object.keys(data)[0]);
                expect(data).to.have.property('English');
            });
        });

        it('should return an error', function(){
            var qwe={params:{user:'nihongo'}};
        
            return languageService.getSpecificLanguage(qwe).then(function(data){
                //console.log(Object.keys(data)[0]);
            }).catch(function(error){
                expect(data).to.have.property('English');
            })
        });

        it('should return an object that is 日本語 language pack', function(){
            var qwe={params:{user:'nihongo'}};
        
            return languageService.getSpecificLanguage(qwe).then(function(data){
                //console.log(Object.keys(data)[0]);
                expect(data).to.have.property('日本語');
            });
        });
        it('should return an error', function(){
            var qwe={params:{user:'日本語'}};
        
            return languageService.getSpecificLanguage(qwe).then(function(data){
                //console.log(Object.keys(data)[0]);
            }).catch(function(error){
                expect(data).to.have.property('日本語');
            })
        });
        
    });
    
});

