var config = require('config.json');
var express = require('express');
var emailService = require('services/email.service');
var router = express.Router();
var userService = require('services/user.service');
 
// routes
router.get('/isAdmin', getAdminUser);
router.get('/all', getAllUsers);
router.post('/authenticate', authenticateUser);
router.post('/emailOn', emailOn);       // added by dyan0
router.post('/addUser', addUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);;
router.put('/saveLanguage/:_id', saveLanguage);
 
module.exports = router;

function saveLanguage(req, res) {
    userService.saveLanguage(req, res)
       .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllUsers(req, res) {
    userService.getAll(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function authenticateUser(req, res) {
    userService.authenticate(req.body.email, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
// added by dyan0
function emailOn(req, res) {
    userService.emailOn(req.body)
        .then(function (emailDBstat) {
            res.status(200).send(emailDBstat);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
// end of add - dyan0


function addUser(req, res) {
    userService.insert(req.body)
        .then(function (password) {
            sendingMail(password);
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });

        //sending the email
        function sendingMail(password){
            console.log(req.body.email);
			console.log(password);
			
            const output = `
                            <p>You have been registered to the Saas App</p>
                            <h3> Account Details</h3>
                            <ul>
                                <li>Email: ${req.body.email}</li>
                                <li>Password: ${password}</li>
                            </ul>
                            <h3>Message</h3>
                            <p>Please change your password to your convenience.</p>
                        `;

                    var mailInfos = {};
                    mailInfos.to = req.body.email;
                    mailInfos.subject = "Account Registered";
                    mailInfos.text = "Welcome to Saas Project";
                    mailInfos.html = output;
            
                   emailService.sendMail(mailInfos).then(function(){
                       res.sendStatus(200);
                   })
                   .catch(function (err) {
                        res.status(400).send(err);
                    });
        }
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*
    Function name: User Controller Get Admin User
    Author(s): Flamiano, Glenn
    Date Modified: 2018/03/01
    Description: Determines if user is admin or not
    Parameter(s): none
    Return: none
*/
function getAdminUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if(user) {
                if (user.role == 'Admin') {
                    res.send(true);
                } else {
                    res.send(false);
                }
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function updateUser(req, res) {
    var userId = req.params._id
 
    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function deleteUser(req, res) {
    var userId = req.params._id;

    userService.delete(userId)
        .then(function () {
            //if the user deletes himself he should be logged out. in angular, catch this error & flag and redirect to login
            if(req.session.user._id == userId){
                res.status(400).send({self_delete: true});
            }
            else{
                res.sendStatus(200);
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(400).send(err);
        });
}