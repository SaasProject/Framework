var express = require('express');
var router = express.Router();
var ModulesService = require('services/modules.service');

//declare routes that are to be called from the client (angular)
router.post('/addModule', addModule);
router.get('/getAllModules', getAllModules);
router.put('/updateModule', updateModule);
router.put('/updateModuleFields', updateModuleFields);
router.delete('/deleteModule/:id/:name', deleteModule);

router.get('/getModuleByName/:name', getModuleByName);
router.post('/addModuleDoc', addModuleDoc);
router.get('/getAllModuleDocs/:name', getAllModuleDocs);
router.put('/updateModuleDoc', updateModuleDoc);
router.delete('/deleteModuleDoc/:name/:id', deleteModuleDoc);

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

function getModuleByName(req, res){
    ModulesService.getModuleByName(req.params.name).then(function(aModule){
        res.status(200).send(aModule);
    }).catch(function(err){
        res.status(400).send();
    });
}

function addModuleDoc(req, res){
    ModulesService.addModuleDoc(req.body.moduleName, req.body.moduleDoc).then(function(){
        res.status(200).send();
    }).catch(function(err){
        res.status(400).send();
    });
}

function getAllModuleDocs(req, res){
    ModulesService.getAllModuleDocs(req.params.name).then(function(moduleDocs){
        res.status(200).send(moduleDocs);
    }).catch(function(err){
        res.status(400).send();
    });
}

function updateModuleDoc(req, res){
    ModulesService.updateModuleDoc(req.body.moduleName, req.body.moduleDoc).then(function(){
        res.status(200).send();
    }).catch(function(err){
        res.status(400).send();
    });
}

function deleteModuleDoc(req, res){
    ModulesService.deleteModuleDoc(req.params.name, req.params.id).then(function(){
        res.status(200).send();
    }).catch(function(err){
        res.status(400).send();
    });
}

module.exports = router;

