(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Modules.IndexController', Controller)
 
    function Controller($scope, ModulesService){
        //$scope.newModule = {};
        $scope.module = {
            name: 'assets',
            fields: []
        }
        $scope.newField = {
            name: '',
            required: false,
            unique: false,
            type: 'text'
        }

        $scope.getModuleByName = function(){
            ModulesService.getModuleByName($scope.module.name).then(function(aModule){
                $scope.module = aModule;
            }).catch(function(err){

            });
        }

        $scope.getModuleByName();

        /* ModulesService.getAllModules().then(function(modules){
            $scope.modules = modules;
        }).catch(function(err){
            alert(err);
        }); */

        /* $scope.submit = function(){
            console.log($scope.newModule);
            if($scope.newModule.name == 'users'){
                alert('cannot have "users" collection');
            }
            else if($scope.newModule._id == undefined){
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
            
        } */

        /* $scope.editModule = function(aModule){
            angular.copy(aModule, $scope.newModule);
        } */

        $scope.editField = function(aField){
            angular.copy(aField, $scope.newField);
        }

        $scope.saveField = function(){
            //change this check

            var doesExists = $scope.newModule.fields.findIndex(function(x){
                return x.name == $scope.newField.name && x.id != $scope.newField.id;
            });

            if(doesExists == -1){
                //sample
                var forSave = {
                    moduleName: $scope.newModule.name,
                    field: $scope.newField
                }
                if($scope.newField.id == undefined){
                    ModulesService.addModuleField(forSave).then(function(){
                        alert('field added');
                    }).catch(function(err){
                        alert('cannot add field');
                    });
                }
                else{
                    ModulesService.updateModuleField(forSave).then(function(){
                        alert('field updated');
                    }).catch(function(err){
                        alert('cannot update field');
                    });
                }
            }
            else{
                alert('field already exists');
            }
        }

        $scope.deleteField = function(fieldObject){
            ModulesService.deleteModuleField($scope.newModule.name, fieldObject.id).then(function(){
                alert('field deleted');
            }).catch(function(err){
                alert('cannot delete field');
            });
        }

        /* $scope.deleteModule = function(aModule){
            if(aModule.name == 'users'){
                alert('cannot delete "users" collection')
            }
            else{
                if(confirm('Are you sure you want to delete ' + aModule.name + 
                '?\nAll documents in this collection will also be deleted.')){
                    ModulesService.deleteModule(aModule._id, aModule.name).then(function(){
                        alert('module deleted');
                    }).catch(function(err){
                        alert('oh wow did not delete');
                    });
                }
            }
        } */
    }
})();