var createError = require('http-errors');
var express = require('express');
var path = require('path');

// bootstrap routes
var app = express();

require('./src/routes')(app);

module.exports = app;
