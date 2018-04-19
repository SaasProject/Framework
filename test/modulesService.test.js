var ModulesService = require('../services/modules.service');
var chai = require('chai');
var should = chai.should;
var expect = chai.expect;

var details = {
    author: 'Jeremy Reccion',
    dateExecuted: new Date(),
}

console.log('Author: ' + details.author);
console.log('Date Executed: ' + details.dateExecuted);

before(function(){
    //set timeout to 10s
    this.timeout(10000);
});

//the test cases only check return values from the service (promise). check db values manually
describe('addModule()', function(){

    //it is suggested to clean (either manually or other service methods) the test data inserted to the database
    //if service methods will be used, use before() hook
    //before(function(){});

    it('should not be rejected since parameter is an object with "name" property', function(){
        return ModulesService.addModule({name: 'testModule1'}).then(function(){
            //expect(data).to.be.an('object');
        });
    });
    
});