'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//CARGAR RUTAS
var user_routes = require('./routes/userRoutes');

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//RUTAS
app.use('/api', user_routes);

//EXPORTAR
module.exports = app;