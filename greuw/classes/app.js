var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var RequestRouter = require('./request-router.js');
var Constants = require('./constants');
var DataCreator = require('./db-data-creator');
var Logger = require('./utils/logger');

function start() {
    var app = express();

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    //app.set('view engine', 'ejs');

    // static directories
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // other middleware
    app.use(bodyParser.json());

    if (process.argv.length > 2 && process.argv[2] === 'createdata') {
        var dataCreator = new DataCreator(50);
        dataCreator.createInfo();
    } else {
        Logger.log(__filename, 'No argument entered. Starting server...', null, false);

        // gets
        app.get(Constants.requestUrls.getAllUsers, RequestRouter.getAllUsers);
        app.get(Constants.requestUrls.getAllCrops, RequestRouter.getAllCrops);
        app.get(Constants.requestUrls.createData, RequestRouter.createData);

        // posts
        //app.post('/save-user', handler.saveUser);
        app.post(Constants.requestUrls.saveUser, RequestRouter.saveUser);
        var server = app.listen(9000, function() {
            var host = server.address().address;
            var port = server.address().port;

            console.log('express server running at: %s:%s', host, port);
        });
    }






//    var app = express();
//
//    app.set('views', path.join(__dirname, '..', 'views'));
//    app.set('view engine', 'jade');
//
////app.use(favicon(__dirname + '/public/favicon.ico'));
//    app.use(logger('dev'));
//    app.use(bodyParser.json());
//    //app.use(bodyParser.urlencoded({ extended: false }));
//    app.use(express.static(path.join(__dirname, 'public')));
//
//// catch 404 and forward to error handler
//    app.use(function(req, res, next) {
//        var err = new Error('Not Found');
//        err.status = 404;
//        next(err);
//    });
//
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//    if (app.get('env') === 'development') {
//        app.use(function(err, req, res, next) {
//            res.status(err.status || 500);
//            res.render('error', {
//                message: err.message,
//                error: err
//            });
//        });
//    }
//
//// production error handler
//// no stacktraces leaked to user
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: {}
//        });
//    });
//
//    var handler = new Handler.Handler();
//    handler.info();
//    handler.moreInfo();
//
//    // gets
//    app.get('/all-users', handler.getAllUsers);
//
//    // posts
//    //app.post('/save-user', handler.saveUser);
//    app.post('/save-user', function(req, res) {
//        console.log('in save user post with data', req.body);
//    });
//
//    var server = app.listen(3000, function() {
//        var host = server.address().address;
//        var port = server.address().port;
//
//        console.log('express server running at: %s:%s', host, port);
//    });
}

module.exports.start = start;
