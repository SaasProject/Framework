(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('InputValidationService', Service);
 
    function Service(FlashService) {
        var service = {};
 
        service.AllValid = AllValid;
        service.CheckEmails = CheckEmails;
        service.CheckNumbers = CheckNumbers;
        service.CheckPasswords = CheckPasswords;
        service.CheckConfirmPasswords = CheckConfirmPasswords;
 
        return service;
 
        /*
            Function name: AllValid
            Author(s): Omugtong, Jano
            Date Modified: December 2017
            Description: all input types are valid: email, number, password and confirm password
            Parameter(s): commons(the error messages), fields, allEntry, confirmPassword
            Return: Array

            eg of usage:
            if(!InputValidationService.AllValid($rootScope.selectedLanguage.commons, $scope.fields, $scope.allEntry, $scope.confirmPassword)){
                
            }

        */
        function AllValid(commons, fields, allEntry, confirmPassword) {
            var everythingValid = true;
            if(!CheckEmails()){
                everythingValid = false;
                FlashService.Error(commons.invalidEmail);
            }else if(!CheckNumbers()){
                everythingValid = false;
                FlashService.Error(commons.invalidNo);
            }else if(!CheckPasswords()){
                everythingValid = false;
                FlashService.Error(commons.containPass);
            }else if(!CheckConfirmPasswords(fields, aDevices, confirmPassword)){
                everythingValid = false;
                FlashService.Error(commons.confirmPass);
            }

            return everythingValid;
        }

        function CheckEmails() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var myRows = document.getElementsByName('email');
            var allValid = true;
            for(var i=0;i<myRows.length;i++){ 
                //console.log('aaaaaa', myRows[i].value);
                if(myRows[i].value != ''){
                    //console.log(myRows[i].value+' grrrr '+re.test(myRows[i].value.toLowerCase()));
                    if(!re.test(myRows[i].value.toLowerCase())){
                        allValid = false;
                    }
                }
            } 
            return allValid;
        }
 
        function CheckNumbers() {
            var myRows = document.getElementsByName('number');
            var allValid = true;
            for(var i=0;i<myRows.length;i++){ 
                if(myRows[i].value != ''){
                    if(isNaN(myRows[i].value)){
                        allValid = false;
                    }
                }
            } 
            return allValid;
        }
 
        function CheckPasswords() {
            var myRows = document.getElementsByName('password');
            var allValid = true;
            for(var i=0;i<myRows.length;i++){ 
                if(myRows[i].value != ''){
                    if(!checkPasswordChars(myRows[i].value)){
                        allValid = false;
                    }
                }
            } 
            return allValid;            
        }

        function CheckConfirmPasswords(fields, aDevices, confirmPassword) {
            var allValid = true;
            for(var i in fields){
                var currentField = fields[i];
                
                //validation for password
                if(currentField.type == 'password'){
                    if(aDevices[currentField.name] == ''){
                        confirmPassword[currentField.name] = '';
                    }
                    if(aDevices[currentField.name] != confirmPassword[currentField.name]){
                        allValid = false;
                    }
                }
            }
            return allValid;
        }

        function checkPasswordChars(password){
            var points = 0;
            var valid = false;

            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            if(password.match(lowerCaseLetters)) {  
                points += 1;
            }

            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if(password.match(upperCaseLetters)) {  
                points += 1;
            }

            // Validate numbers
            var numbers = /[0-9]/g;
            if(password.match(numbers)) {  
                points += 1;
            }

            // Validate length
            if(password.length >= 8) {
                points += 1;
            }

            // if points = 4 return true
            if(points == 4){
                valid = true;
            }
            
            return valid;
        }
    }
 
})();