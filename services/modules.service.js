var config = require('config.json');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('modules');
var Q = require('q');

var service = {};

service.addModule = addModule;
service.getAllModules = getAllModules;
service.updateModule = updateModule;
service.updateFields = updateFields;
service.deleteModule = deleteModule;

service.getModuleByName = getModuleByName;

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
            deferred.reject(err);
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
                    deferred.reject(err);
                }
                else{
                    //initialize fields property as empty array if there are none in the input
                    if(newModule.fields == undefined){
                        newModule.fields = [];
                    }

                    db.modules.insert(newModule, function(err){
                        if(err){
                            deferred.reject(err);
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
    Function name: get all modules
    Author: Reccion, Jeremy
    Date Modified: 2018/04/02
    Description: gets all documents from 'modules' collection
    Parameter(s): none
    Return: Promise
*/
function getAllModules(){
    var deferred = Q.defer();
    db.modules.find().toArray(function(err, modules){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(modules);
        }
    });

    return deferred.promise;
}

/*
    Function name: update module
    Author: Reccion, Jeremy
    Date Modified: 2018/04/02
    Description: updates the name of the module
    Parameter(s): Object. Includes:
        *_id: required. string type
        *name: required. string type
    Return: Promise
*/
function updateModule(updateModule){
    var deferred = Q.defer();

    updateModule.name = updateModule.name.toLowerCase();

    //fields array should not be editable when using this function. therefore, delete it from input
    delete updateModule.fields;

    //check if the name of the selected module has not changed
    db.modules.findOne({_id: mongo.helper.toObjectID(updateModule._id)}, function(err, aModule){
        if(err){
            deferred.reject(err);
        }
        else if(aModule){
            //if names are different, renaming the collection must be executed, then proceed to update
            if(aModule.name != updateModule.name){
                db.bind(aModule.name);
                db[aModule.name].rename(updateModule.name, function(err){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        update();
                    }
                });
            }
        }
        else{
            update();
        }
    });

    //updates the document in the 'modules' collection
    function update(){
        var forUpdate = {};
        Object.assign(forUpdate, updateModule);
        //delete _id
        delete forUpdate._id;
 
        db.modules.update({_id: mongo.helper.toObjectID(updateModule._id)}, {$set: forUpdate}, function(err){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve();
            }
        });
    }

    return deferred.promise;
}

/*
    Function name: update fields
    Author: Reccion, Jeremy
    Date Modified: 2018/04/03
    Description: updates the fields of a specific module
    Parameter(s):
        *moduleName: required. string type
        *fieldsArray: required. array type
    Return: Promise
*/
function updateFields(moduleName, fieldsArray){
    var deferred = Q.defer();
    moduleName = moduleName.toLowerCase();

    //set only the fields properties as the whole fieldsArray
    db.modules.update({name: moduleName}, {$set: {fields: fieldsArray}}, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve();
        }
    });

    return deferred.promise;
}

/*
    Function name: delete module
    Author: Reccion, Jeremy
    Date Modified: 2018/04/03
    Description: drops the specific collection then remove its document from the 'modules' collection
    Parameter(s):
        *id: string type
        *moduleName: string type
    Return: Promise
*/
function deleteModule(id, moduleName){
    var deferred = Q.defer();
    moduleName = moduleName.toLowerCase();

    //drop the collection
    db.bind(moduleName);
    db[moduleName].drop();

    //remove document from 'modules' collection
    db.modules.remove({_id: mongo.helper.toObjectID(id)}, function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve();
        }
    });

    return deferred.promise;
}

/*
    Function name: get a specific module
    Author: Reccion, Jeremy
    Date Modified: 2018/04/03
    Description: retrieves a specific module by its name
    Parameter(s):
        *moduleName: string type
    Return: Promise
*/
function getModuleByName(moduleName){
    var deferred= Q.defer();
    moduleName = moduleName.toLowerCase();

    db.modules.findOne({name: moduleName}, function(err, aModule){
        if(err){
            deferred.reject(err);
        }
        else{
            deferred.resolve(aModule);
        }
    });

    return deferred.promise;
}

module.exports = service;
