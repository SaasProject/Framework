(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('UploadService', Service);
 
    function Service($http, $q) {
        var service = {};
 
        service.uploadFile = uploadFile;
        service.deleteFile = deleteFile;
        service.readFile = readFile;
 
        return service;

        /*
            Function name: Read profile picture file
            Author(s): Flamiano, Glenn
            Date Modified: 2018/04/03
            Description: returns http update on deleting the user profile picture
            Parameter(s): urlFile
            Return: http get response
        */
        function readFile(urlFile){
            return $http({url: '/api/uploadFile/readFile', 
                method: "GET", params: {urlFile:urlFile}}).then(handleSuccess, handleError);
        }

        /*
            Function name: Delete profile picture
            Author(s): Flamiano, Glenn
            Date Modified: 2018/04/03
            Description: returns http update on deleting the file
            Parameter(s): user
            Return: http post response
        */
        function deleteFile(user) {
            return $http.put('/api/uploadFile/deleteFile/' + user._id, user).then(handleSuccess, handleError);
        }

        /*
            Function name: User App Service Upload File
            Author(s): Flamiano, Glenn
            Date Modified: 2018/03/01
            Description: appends current user id and email and input file to form data and
                sends it to controllers/user.controller.js to return correct http response
            Parameter(s): input file, user scope
            Return: http post response
        */
        function uploadFile(file, user) {
            var fd = new FormData();
            fd.append('id', user._id);
            fd.append('email', user.email);
            fd.append('myfile', file.upload);
            return $http.post('/api/uploadFile/uploadFile', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined}}).then(handleSuccess, handleError);
        }
 
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }
    }
 
})();