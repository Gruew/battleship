var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var RequestHandler = require('./request-handler');
var Constants = require('./constants');
var DataCreator = require('./db-data-creator');
var Logger = require('./utils/logger');
var PicGetter = require('./pic-getter');
var https = require('https');
var fs = require('fs');

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
    } else if(process.argv.length > 2 && process.argv[2] === 'getpic'){
        Logger.log(__filename, 'in get pic', null, false);
        var picGetter = new PicGetter('sdr.jpg');
        picGetter.getPic(function(data) {
            if (data) {
                Logger.log(__filename, 'succesfully retrieved pic', null, true);
                return;
            }

            Logger.log(__filename, 'failed to retrieve pic', null, true);
        });
    } else {
        Logger.log(__filename, 'No argument entered. Starting server...', null, false);

        // gets
        var requestHander = new RequestHandler();
        app.get(Constants.requestUrls.getAllUsers, requestHander.getAllUsers);
        app.get(Constants.requestUrls.getAllCrops, requestHander.getAllCrops);
        app.get(Constants.requestUrls.createData, requestHander.createData);

        // posts
        //app.post('/save-user', handler.saveUser);
        app.post(Constants.requestUrls.saveUser, requestHander.saveUser);


        // define the server
        //var key = fs.readFileSync(path.join(__dirname, '../keys/key.pem'));
        //var certificate = fs.readFileSync(path.join(__dirname, '../keys/server.crt'));
        //Logger.log(__filename, 'server key:', key, false);
        //Logger.log(__filename, 'server certificate:', certificate, false);
        //https.createServer({
        //    key: key,
        //    cert: certificate
        //}, app).listen(9000);

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
