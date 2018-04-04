var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
var multer = require('multer');
var fs=require('fs');
db.bind('users');

var fs = require('fs');

/*
    Function name: Upload File Service Multer Storage
    Author(s): Flamiano, Glenn
    Date Modified: 2018/03/01
    Description: Configuration for saving uploaded image file
    Parameter(s): request, file, cb
    Return: cb
*/
var storage = multer.diskStorage({
    destination: './profile_pictures',
    filename: function(req, file, cb) {
        return cb(null, req.body.email +'.'+ file.mimetype.toString().slice(6));
    }
});

var upload = multer({storage: storage}).single("myfile");
 
var service = {};

//Added by Glenn
service.uploadFile = uploadFile; //glenn
service.deleteFile = deleteFile; //glenn
service.readFile = readFile; //glenn
 
module.exports = service;

function readFile(req, res){
    //console.log(req.query);
    var deferred = Q.defer();
    var found = false;
    try{
        var file=fs.readFileSync(req.query.urlFile);
        //console.log('file found');
        deferred.resolve('true');
    }catch(err){
        //if file of profile picture is not found
        //console.log('no file found');
        deferred.resolve('false');
    }
    return deferred.promise;
}

/*
    Function name: Upload File Service Delete Profile Picture
    Author(s): Flamiano, Glenn
    Date Modified: 2018/03/08
    Update Date: 2018/04/03
    Description: Deletes the user profile picture url in the database and profile picture file in the server
    Parameter(s): none
    Return: none
*/
function deleteFile(req, res){
    var deferred = Q.defer();

    //update db
    db.users.findOne({ email: req.body.email }, function (err, user) {
        if (err) deferred.reject(err);
 
        if (user) {
            db.users.update({email: req.body.email}, {$set: { profilePicUrl: ''}}, function(err){
                if(err) deferred.reject(err);
                //If no errors, send it back to the client
                try{
                    var file=fs.readFileSync('profile_pictures/'+user.profilePicUrl); //catch error here if file not found
                    fs.unlink('profile_pictures/'+user.profilePicUrl, function (err) {
                        if (err) deferred.reject(err);
                    });
                    //console.log('file deleted');
                    deferred.resolve();
                }catch(err){
                    //if file of profile picture is not found
                    //console.log('file delete failed not found');
                    deferred.resolve();
                }
                deferred.resolve();
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
    deferred.resolve();

    return deferred.promise;
}

/*
    Function name: Upload File Service Upload Profile Picture
    Author(s): Flamiano, Glenn
    Date Modified: 2018/03/01
    Update Date: 2018/04/03
    Description: Updates profile picture url in user collection and saves image request to profile pictures folder
        within the workspace
    Parameter(s): none
    Return: none
*/
function uploadFile(req, res){
    var deferred = Q.defer();
    upload(req, res, function (err) {
        if (err) {
            deferred.reject(err)
        } else {
            if (!req.file) {
                deferred.reject(err)
            } else {
                //update db
                db.users.findOne({ email: req.body.email }, function (err, user) {
                    if (err) deferred.reject(err);
             
                    if (user) {
                        db.users.update({email: req.body.email}, {$set: { profilePicUrl: req.file.filename}}, function(err){
                            if(err) deferred.reject(err);
                            //If no errors, send it back to the client
                            deferred.resolve();
                        });
                    } else {
                        // authentication failed
                        deferred.resolve();
                    }
                });
                deferred.resolve();
            }
        }
        deferred.resolve();
    });
    return deferred.promise;
}
