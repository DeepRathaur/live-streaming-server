const express                   =   require('express');
const router                    =   express.Router();
const PARAMS                    =   require('../config/globalparam');



const UserController 	        = require('../controllers/user.controller');
const StateController 	        = require('../controllers/state.controller');
const City                      = require('../controllers/city.controller')



const passport      	= require('passport');
const allowOnly         = require('../services/routes.helper').allowOnly;

require('./../middleware/passport')(passport);


/* GET home page. */
router.get('/', function(req, res) {
    res.json({status:"success", message:"Live Streaming Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/users',                   UserController.create);                                                                                                         // C
router.post (    '/otp',                    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, UserController.sendOtp));                    // R
router.post (    '/verifyotp',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user, UserController.verifyotp));                    // R
router.get (    '/users',                   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, UserController.getAll));                    // R
router.get (    '/users/:id',               passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.getOne));                    // R
router.put (    '/users',                   passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.update));                    // U
router.delete(  '/users/:id',               passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, UserController.remove));                    // D
router.get(     '/userprofile',             passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.profile)); 
router.post(    '/users/profilepicture',    passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.user,  UserController.profilepicture));                   // P

router.post(    '/users/login',              UserController.login);                     // Login

/**
 * @State Controller Routing
 */
router.post(    '/states',                  passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.create));                   // C
router.get(     '/states',                  StateController.getAll);                                                                                                        // R
router.put(     '/states/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.update));                   // U
router.delete(  '/states/:id',              passport.authenticate('jwt', {session:false}), allowOnly(PARAMS.accessLevels.admin, StateController.remove));                   // D
                              // C


module.exports = router;