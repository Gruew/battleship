'use strict';

var SqlInterface = require('./sql-interface.js');
var Constants = require('./constants');
var User = require('./models/user');
var JsonResponse = require('./models/json-response');
var Logger = require('./utils/logger');
var DbDataCreator = require('./db-data-creator');
var PicGetter = require('./pic-getter');


function RequestHandler() {

}

RequestHandler.prototype.getAllUsers = function(req, res) {
    SqlInterface.getAllUsers(function(err, data) {
        var code;
        if (err) {
            Logger.log(__filename, 'Failed to process request:', err, true);
            code = Constants.responseCodes.genericFailure;
        } else {
            code = Constants.responseCodes.genericSuccess;
        }

        var jsonResponse = new JsonResponse(res, code, data, null);
        jsonResponse.respond();
    });
};

RequestHandler.prototype.getAllCrops = function(req, res) {
    SqlInterface.getAllCrops(function(err, data) {
        var code;
        if (err) {
            Logger.log(__filename, 'Failed to process request:', err, true);
            code = Constants.responseCodes.genericFailure;
        } else {
            code = Constants.responseCodes.genericSuccess;
        }

        var jsonResponse = new JsonResponse(res, code, data, null);
        jsonResponse.respond();
    });
};

RequestHandler.prototype.createData = function(req, res) {
    var dbDataCreator = new DbDataCreator(20);
    dbDataCreator.createInfo(function(err, data) {
        var code;
        if (err) {
            Logger.log(__filename, 'Failed to process create data request:', err, true);
            code = Constants.responseCodes.genericFailure;
        } else {
            code = Constants.responseCodes.genericSuccess;
        }

        Logger.log(__filename, 'Finished creating data:', code, true);
        var jsonResponse = new JsonResponse(res, code, null, null);
        jsonResponse.respond();
    });
};

RequestHandler.prototype.getPic = function (req, res) {
    if (!_.has(req.params, 'picName')) {
        Logger.log(__filename, 'No picName parameter supplied to get pic url', null, true);
        var jsonResponse = new JsonResponse(
            res,
            Constants.responseCodes.genericFailure,
            null,
            null
        );
        jsonResponse.respond();
        return;
    }

    var picGetter = new PicGetter(req.param.picName);
    picGetter.getPic(function(err, data) {
        if (err) {
            Logger.log(__filename,
                'Error retrieving pic: ' + req.param.picName,
                err,
                true
            );

            var jsonResponse = new JsonResponse(
                res,
                Constants.responseCodes.genericFailure,
                null,
                null
            );
            jsonResponse.respond();
            return;
        }

        Logger.log(__filename,
            'Retrieving pic: ' + req.param.picName,
            null,
            true
        );

        var jsonResponse = new JsonResponse(
            res,
            Constants.responseCodes.genericSuccess,
            null,
            null
        );
        jsonResponse.respond();
    });
};

RequestHandler.prototype.saveUser = function (req, res) {
    // client does not have this user saved.
    // check to see if the user is already in database
    //var user = new User(req.body);
    //Logger.log('Receiving user data: ', user, true);
    //user.setDateUpdated();
    //var that = this;
    //this.sqlInterface.getUserByUsername(user.username, function(err, data) {
    //    if (err) {
    //        Logger.log('request handler has failed at get user by username', null, true);
    //        var jsonResponse = new JsonResponse(
    //             res,
    //            Constants.responseCodes.genericFailure,
    //            null,
    //            null
    //        );
    //        jsonResponse.respond();
    //        throw err;
    //    } else {
    //        that.sqlInterface.resetQueryInterface();
    //        if (data.length === 0) {
    //            // no user with the user's name.
    //            // therefore this is a new user.
    //            // create a new user and return to client
    //            user.setDateJoined();
    //            Logger.log('no users in db with username: ', user.username, true);
    //            user.hashPassword(function () {
    //                that.sqlInterface.saveNewUser(user, function (err1, data1) {
    //                    if (err1) {
    //                        throw err1;
    //                    } else {
    //                        that.sqlInterface.resetQueryInterface();
    //                        that.sqlInterface.getUserByUsername(user.username, function (err2, data2) {
    //                            if (err2) throw err2;
    //                            Logger.log('new user data from query: ', data2, true);
    //                            var updatedUser = new User(data2[0]);
    //                            var jsonResponse = new JsonResponse(
    //                                res,
    //                                Constants.responseCodes.genericSuccess,
    //                                updatedUser,
    //                                {isPWHashed:Constants.mysqlConversions.intToBool}
    //                            );
    //                            jsonResponse.respond();
    //                        });
    //                    }
    //                });
    //            });
    //        } else {
    //            // user exists with user name supplied. Authenticate.
    //            Logger.log('user Exists', null, true);
    //            that.sqlInterface.resetQueryInterface();
    //            var dbUser = new User(data[0]);
    //            if (user.isPWHashed) {
    //                if (user.password === dbUser.password) {
    //                    that.sqlInterface.saveExistingUser(user, function (err1, data1) {
    //                        if (err1) throw err1;
    //                        that.sqlInterface.getUserByUsername(user.username, function (err2, data2) {
    //                            if (err2) throw err2;
    //                            Logger.log('existing user data from query: ', data2, true);
    //                            var updatedUser = new User(data2[0]);
    //                            var jsonResponse = new JsonResponse(
    //                                res,
    //                                Constants.responseCodes.genericSuccess,
    //                                updatedUser,
    //                                {isPWHashed:Constants.mysqlConversions.intToBool}
    //                            );
    //                            jsonResponse.respond();
    //                        });
    //                    });
    //                } else {
    //                    var jsonResponse = new JsonResponse(
    //                        res,
    //                        Constants.responseCodes.genericFailure,
    //                        null,
    //                        null
    //                    );
    //                    jsonResponse.respond();
    //                }
    //            } else {
    //                user.verifyPassword(dbUser.password, dbUser.salt, function (didAuthenticate) {
    //                    if (didAuthenticate) {
    //                        Logger.log('user authentication succeeded', null, true);
    //                        user.password = dbUser.password;
    //                        that.sqlInterface.saveExistingUser(user, function (err1, data1) {
    //                            if (err1) throw err1;
    //                            that.sqlInterface.getUserByUsername(user.username, function (err2, data2) {
    //                                if (err2) throw err2;
    //                                Logger.log('existing user data from query: ', data2, true);
    //                                var updatedUser = new User(data2[0]);
    //                                var jsonResponse = new JsonResponse(
    //                                    res,
    //                                    Constants.responseCodes.genericSuccess,
    //                                    updatedUser,
    //                                    {isPWHashed:Constants.mysqlConversions.intToBool}
    //                                );
    //                                jsonResponse.respond();
    //                            });
    //                        });
    //                    } else {
    //                        Logger.log('user authentication failed', null, true);
    //                        var jsonResponse = new JsonResponse(
    //                            res,
    //                            Constants.responseCodes.genericFailure,
    //                            null,
    //                            null
    //                        );
    //                        jsonResponse.respond();
    //                    }
    //                });
    //            }
    //        }
    //    }
    //});
};

module.exports = RequestHandler;