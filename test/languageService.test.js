var languageService = require('../services/language.service');
var chai = require('chai');
var should = chai.should;
var expect = chai.expect;

var details = {
    author: 'Sanchez, Macku',
    dateExecuted: new Date(),
}

console.log('Author: ' + details.author);
console.log('Date Executed: ' + details.dateExecuted);

before(function(){
    //set timeout to 10s
    this.timeout(10000);
});

//the test cases only check return values from the service (promise). check db values manually
describe('getDefaultLanguage()', function(){

    //it is suggested to clean (either manually or other service methods) the test data inserted to the database
    //if service methods will be used, use before() hook
    //before(function(){});

    it('should return an object that has a language pack that depends on the default language set by the Admin', function(){
        return languageService.getDefaultLanguage({}).then(function(data){
            expect(data).to.be.an('object');
        });
    });
    
});