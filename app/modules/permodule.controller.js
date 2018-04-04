(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Modules.PerModuleController', Controller)
 
    function Controller($scope, $stateParams, ModulesService){
        $scope.aModule = {};
        $scope.moduleDocForm = {};
        $scope.moduleDocs = [];

        ModulesService.getModuleByName($stateParams.moduleName).then(function(aModule){
            $scope.aModule = aModule;

            ModulesService.getAllModuleDocs($stateParams.moduleName).then(function(moduleDocs){
                $scope.moduleDocs = moduleDocs;
            }).catch(function(err){

            });
        }).catch(function(err){

        });


        $scope.submit = function(){
            var forSubmit = {
                moduleName: $stateParams.moduleName,
                moduleDoc: $scope.moduleDocForm
            }
            //add
            if($scope.moduleDocForm._id == undefined){
                ModulesService.addModuleDoc(forSubmit).then(function(){
                    alert('new document added');
                }).catch(function(err){
                    alert('cannot add document');
                });
            }
            //update
            else{
                ModulesService.updateModuleDoc(forSubmit).then(function(){
                    alert('document updated');
                }).catch(function(err){
                    alert('cannot update document');
                });
            }
        }

        $scope.editModuleDoc = function(editDoc){
            angular.copy(editDoc, $scope.moduleDocForm);
        }

        $scope.deleteModuleDoc = function(id){
            var forDelete = {
                moduleName: $stateParams.moduleName,
                id: id
            }
            if(confirm('delete this document?')){
                ModulesService.deleteModuleDoc(forDelete).then(function(){
                    alert('deleted');
                }).catch(function(err){
                    alert('cannot delete');
                });
            }
        }


    }
})();