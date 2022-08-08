const express = require('express');
const router  = express.Router();
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const passportConfig = require('../config/passport');
passportConfig(passport);



const UsersController = require('../controllers/UserController');
const usersController = new UsersController();

router.get(
    '/users/register',
    usersController.register.bind(usersController));
router.post(
    '/users/register',
    body('name').isLength({min:4}),
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    usersController.postRegister.bind(usersController));
   


router.get(
    '/users/login',
    usersController.login.bind(usersController));

router.post(
    '/users/login',
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    usersController.postLogin.bind(usersController));
    
    

module.exports = router;
