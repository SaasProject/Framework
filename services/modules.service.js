var config = require('config.json');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('modules');
var Q = require('q');

var service = {};

service.addModule = addModule;
service.update = update;

/*
    Flags
*/
var dbError = {dbError: true};
var exists =  {exists: true};

/*
    Function name: add module
    Author: Reccion, Jeremy
    Date Modified: 2018/04/02
    Description: 
        creates a new collection by the name inputted by the user. 
        it is then registered to the "modules" collection.
    Parameter(s): Object. includes:
        *name: required. string type
        *fields: optional. Array type. initialized if not existing from input
    Return: Promise
*/
function addModule(newModule){
    //imitate angular promise. start by initializing this
    var deferred = Q.defer();

    newModule.name = newModule.name.toLowerCase();
    
    //check if there is an existing module
    db.modules.findOne({name: newModule.name}, function(err, aModule){
        if(err){
            deferred.reject(dbError);
        }
        //already exists
        else if(aModule){
            deferred.reject(exists);
        }
        else{
            //unique, so proceed
            //create table first before adding a new document to 'modules' collection (not necessary?)
            db.createCollection(newModule.name, function(err){
                if(err){
                    deferred.reject(dbError);
                }
                else{
                    //initialize fields property as empty array if there are none in the input
                    if(newModule.fields == undefined){
                        newModule.fields = [];
                    }

                    db.modules.insert(newModule, function(err){
                        if(err){
                            deferred.reject(dbError);
                        }
                        else{
                            deferred.resolve();
                        }
                    });
                }
            });
        }
        
    });
    
    //return the promise along with either resolve or reject
    return deferred.promise;
}

/*
        Function name: update field array
        Author(s): Reccion, Jeremy
        Date Modified: 02/27/2018
        Description: setter function for updating the fields array of a specific name (e.g. user, asset, etc)
        Parameter(s): 
        Return: none
    */
function update(id, updated_fields){
    var deferred = Q.defer();

    //console.log(id, updated_fields);
    //use mongo.helper.toObjectID() when using '_id' in queries
            // use $set to apply changes while retaining existing information in the database
            //not using $set and passing an object to update() 's second parameter will rewrite the whole document
    db.fields.update({_id: mongo.helper.toObjectID(id)}, {$set: {fields: updated_fields}}, function(err){
        if(err) {
            console.log(err);
            deferred.reject();
        }
        deferred.resolve();
    });

    return deferred.promise;
}

module.exports = service;
