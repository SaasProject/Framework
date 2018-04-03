(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('ModulesService', Service);
 
    function Service($http, $q) {
        var service = {};
 
        service.addModule = addModule;
        service.getAllModules = getAllModules;
        service.updateModule = updateModule;
        service.updateFields = updateFields;
        service.deleteModule = deleteModule;

        service.getModuleByName = getModuleByName;

        return service;

        function addModule(newModule){
            return $http.post('/api/modules/addModule', newModule).then(handleSuccess, handleError);
        }

        function getAllModules(){
            return $http.get('/api/modules/getAllModules').then(handleSuccess, handleError);
        }

        function updateModule(updateModule){
            return $http.put('/api/modules/updateModule', updateModule).then(handleSuccess, handleError);
        }

        function updateFields(updateModule){
            return $http.put('/api/modules/updateModuleFields', updateModule).then(handleSuccess, handleError);
        }
        
        function deleteModule(deleteModule){
            return $http.delete('/api/modules/deleteModule/' + deleteModule._id + '/' + deleteModule.name).then(handleSuccess, handleError);
        }

        function getModuleByName(moduleName){
            return $http.get('/api/modules/getModuleByName/' + moduleName).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }

    }
})();