// community libs
var express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser');

// custom libs
var config = require('./config.js');

// instantiate server
var app = express();

// use body parser to grab information from POST requests
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// configure to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

// turn on logging
app.use(morgan('dev'));

// configure public assets folder
app.use(express.static(__dirname + '/public'));

// add routes
var apiRoutes = require('./app/routes/api/index')(app, express);
app.use('/api', apiRoutes);

// route for index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// start server
app.listen(config.port);