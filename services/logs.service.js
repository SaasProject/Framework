var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
var fs=require('fs');
var emailService = require('services/logs.service');
db.bind('logs');

var fs = require('fs');
 
var service = {};


service.addModuleDocLog = addModuleDocLog;
 
module.exports = service;

function addModuleDocLog(moduleName,moduleDoc,functionName){
    var deferred = Q.defer();

    console.log(moduleName)
    console.log(moduleDoc)
    console.log(functionName)


        db.logs.insert(user,function (err, doc) {
            if (err) deferred.reject(err);
 
                deferred.resolve();
        });

    return deferred.promise;
}
 
