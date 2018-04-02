var express = require('express');
var router = express.Router();
var ModulesService = require('services/modules.service');

//declare routes that are to be called from the client (angular)
router.post('/addModule', addModule);
/* router.get('/getAllModules', getAllModules);
router.get('/getModuleByName/:name', getModuleByName);
router.put('/updateModule', updateModule);
router.put('/updateModuleFields', updateModuleFields);
router.delete('/deleteModule/:id/:name', deleteModule); */

function addModule(req, res){
    ModuleService.addModule(req.body).then(function(){
        res.status(200).send({message: 'aw yeah added'});
    }).catch(function(err){
        res.status(400).send({message: 'no no not added'});
    });
}

module.exports = router;

