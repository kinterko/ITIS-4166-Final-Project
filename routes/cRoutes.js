// Kory Kinter

const express = require('express');
const controller = require('../controllers/cController')
const { isLoggedIn, isHost, isNotHost} = require('../middlewares/auth');
const { validateId, validateRsvp, validateResult, validateConnection } = require('../middlewares/validator');
const {body} = require('express-validator');
const router = express.Router();

router.get('/', controller.index);

router.get('/new', isLoggedIn, (controller.new));

router.get('/:id', validateId, (controller.show));

router.get('/:id/edit', isLoggedIn, isHost,  validateId, (controller.edit));

router.post('/', isLoggedIn, validateConnection, validateResult, (controller.create));

router.put('/:id', isLoggedIn, isHost, validateId, validateConnection, validateResult, (controller.update));

router.delete('/:id', isLoggedIn, isHost,  validateId, (controller.delete));

router.post('/:id/rsvp', validateId, isLoggedIn, isNotHost, validateRsvp, validateResult, (controller.rsvp));

router.delete('/:id/rsvp', validateId, isLoggedIn, (controller.deleteRsvp));

module.exports = router;