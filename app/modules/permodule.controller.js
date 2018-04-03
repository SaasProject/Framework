(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Modules.PerModuleController', Controller)
 
    function Controller($scope, $stateParams, ModulesService){
        $scope.aModule = {};

        ModulesService.getModuleByName($stateParams.moduleName).then(function(aModule){
            $scope.aModule = aModule;
            console.log('oii');
        }).catch(function(err){

        });



    }
})();