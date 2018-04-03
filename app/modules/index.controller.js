(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Modules.IndexController', Controller)
 
    function Controller($scope, ModulesService){
        $scope.newModule = {};

        ModulesService.getAllModules().then(function(modules){
            $scope.modules = modules;
        }).catch(function(err){
            alert(err);
        });

        $scope.submit = function(){
            console.log($scope.newModule);
            if($scope.newModule._id == undefined){
                ModulesService.addModule($scope.newModule).then(function(){
                    alert('added');
                }).catch(function(err){
                    alert('cannot add');
                });
            }
            else{
                ModulesService.updateModule($scope.newModule).then(function(){
                    alert('updated');
                }).catch(function(err){
                    alert('cannot update');
                });
            }
            
        }

        $scope.editModule = function(aModule){
            angular.copy(aModule, $scope.newModule);
        }

        $scope.updateFields = function(){
            if($scope.newModule.fields.indexOf($scope.newField) == -1){
                $scope.newModule.fields.push($scope.newField);
                ModulesService.updateFields($scope.newModule).then(function(){
                    alert('fields updated');
                }).catch(function(err){
                    alert('cannot update fields');
                });
            }
            else{
                alert('field already exists');
            }
        }

        $scope.deleteField = function(field){
            $scope.newModule.fields.splice($scope.newModule.fields.indexOf(field), 1);
            ModulesService.updateFields($scope.newModule).then(function(){
                alert('fields updated');
            }).catch(function(err){
                alert('cannot update fields');
            });
        }

        $scope.deleteModule = function(aModule){
            if(confirm('Are you sure you want to delete ' + aModule.name + 
            '?\nAll documents in this collection will also be deleted.')){
                ModulesService.deleteModule(aModule).then(function(){
                    alert('module deleted');
                }).catch(function(err){
                    alert('oh wow did not delete');
                });
            }
        }
    }
})();