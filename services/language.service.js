var config = require('config.json');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('language');
var Q = require('q');
var fs=require('fs');

var service = {};

service.saveDefaultLanguage = saveDefaultLanguage;
service.getDefaultLanguage = getDefaultLanguage;
service.getSpecificLanguage = getSpecificLanguage;

module.exports = service;

function saveDefaultLanguage(req, res){
	var deferred = Q.defer();
	db.language.update({name: 'defaultLanguage'}, {$set: { value: req.body.option, updatedBy: req.body.email}}, function(err){
        if(err) deferred.reject(err);
        //If no errors, send it back to the client
        deferred.resolve();
    });
    return deferred.promise;
}

function getDefaultLanguage(req, res){
	var deferred = Q.defer();
 
    db.language.findOne({ name: 'defaultLanguage' }, function (err, results) {
        //console.log(results.value);
        if(err){
            var file=fs.readFileSync(__dirname + '/../languages/english.json', 'utf8');
            var languages=JSON.parse(file);
            deferred.resolve(languages);
        }else{
            if (fs.existsSync(__dirname + '/../languages/'+results.value+'.json')) {
                var file=fs.readFileSync(__dirname + '/../languages/'+results.value+'.json', 'utf8');
                var languages=JSON.parse(file);
                deferred.resolve(languages);
            }else{
                var file=fs.readFileSync(__dirname + '/../languages/english.json', 'utf8');
                var languages=JSON.parse(file);
                deferred.resolve(languages);
            }
        }
    });
    return deferred.promise;
}


function getSpecificLanguage(req,res){
    var deferred = Q.defer();

    //console.log(req.session.user.setLanguage);

    if (fs.existsSync(__dirname + '/../languages/'+req.session.user.setLanguage+'.json')) {
        var file=fs.readFileSync(__dirname + '/../languages/'+req.session.user.setLanguage+'.json', 'utf8');
        var languages=JSON.parse(file);
        deferred.resolve(languages);
    }else{
        var file=fs.readFileSync(__dirname + '/../languages/english.json', 'utf8');
        var languages=JSON.parse(file);
        deferred.resolve(languages);
    }

    return deferred.promise;
}
