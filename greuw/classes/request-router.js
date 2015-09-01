/**
 * Created by agreen on 3/30/15.
 */

var RequestHandler = require('./request-handler');

var RequestRouter = {
    getAllUsers: function(req, res) {
        var requestHandler = new RequestHandler();
        requestHandler.getAllUsers(req, res);
    },

    getAllCrops: function(req, res) {
        var requestHandler = new RequestHandler();
        requestHandler.getAllCrops(req, res);
    },

    createData: function(req, res) {
        var requestHandler = new RequestHandler();
        requestHandler.createData(req, res);
    },

    saveUser: function(req, res) {
        var requestHandler = new RequestHandler();
        requestHandler.saveUser(req, res);
    }
};

module.exports = RequestRouter;