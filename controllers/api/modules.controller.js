var express = require('express');
var router = express.Router();
var ModulesService = require('services/modules.service');

//declare routes that are to be called from the client (angular)
router.post('/addModule', addModule);
router.get('/getAllModules', getAllModules);
/* router.get('/getModuleByName/:name', getModuleByName);
 */
router.put('/updateModule', updateModule);
router.put('/updateModuleFields', updateModuleFields);
router.delete('/deleteModule/:id/:name', deleteModule);

function addModule(req, res){
    ModulesService.addModule(req.body).then(function(){
        res.status(200).send();
    }).catch(function(err){
        res.status(400).send();
    });
}

function getAllModules(req, res){
    ModulesService.getAllModules().then(function(modules){
        res.status(200).send(modules);
    }).catch(function(err){
        res.status(400).send();
    });
}

function updateModule(req, res){
    ModulesService.updateModule(req.body).then(function(){
        res.status(200).send();
    }).catch(function(err){
        res.status(400).send();
    });
}

function updateModuleFields(req, res){
    ModulesService.updateFields(req.body.name, req.body.fields).then(function(){
        res.status(200).send();
    }).catch(function(err){
        res.status(400).send();
    });
}

function deleteModule(req, res){
    ModulesService.deleteModule(req.params.id, req.params.name).then(function(){
        res.status(200).send();
    }).catch(function(err){
        res.status(400).send();
    });
}

module.exports = router;

