require("dotenv").config({ path: __dirname + "/config/.env" });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

// bootstrap routes
var app = express();

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());
// Allows express to read a request body
app.use(express.json());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./src/routes')(app);

module.exports = app;
