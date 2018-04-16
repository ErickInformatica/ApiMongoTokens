'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var md_auth = require('../middleware/autenticacion');
var api = express.Router();

api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.get('/prueba', md_auth.ensureAuth ,UserController.prueba);
module.exports = api;