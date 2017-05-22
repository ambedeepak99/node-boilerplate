var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//region global variable
global._globalDir = __dirname;
global._fs = require('fs');
global._ = require('underscore');
global._async = require('async');
global._constants = require('./lib/constants');
global._config = require('./config/appConfig');
global._logger = require('./lib/logger/winstonLogger');
global._mailer = require('./lib/contact/mailer');
global._mysqlConnections = require('./lib/db_connect/mysqlConnect');
require('./lib/db_connect/mongoConnect').createConnection(function(connections){
     global._mongoConnections=connections;
});
global._redisConnections = require('./lib/db_connect/redisConnect');
global._utils = require("./lib/utils");
//endregion


var auth = require('./lib/authenticate/auth');
//app.use('/v1/', require('./routes')(app));
app.all(_config.authConfig.basicAlias + '/*', [auth.authenticate]);
var router = require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

process.on('uncaughtException', function (err) {
        _logger.error(" ##### SERVER CRASH ##### \n"
            , err,
            "\n ########## END ##########");
    }
);

module.exports = app;
