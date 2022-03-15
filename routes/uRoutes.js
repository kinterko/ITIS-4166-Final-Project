// Kory Kinter

const express = require('express');
const controller = require('../controllers/uController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');
const {body} = require('express-validator');
const {logInLimiter} = require('../middlewares/rateLimiters');
const {validateSignUp, validateLogIn, validateResult} = require('../middlewares/validator');

const router = express.Router();


router.get('/new', isGuest, controller.signUp);

router.post('/', isGuest, validateSignUp, validateResult, controller.createUser);

router.get('/login', isGuest, controller.login);

router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.getUser);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router; 