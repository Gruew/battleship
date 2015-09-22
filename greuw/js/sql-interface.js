
var Query = require('./query');
var QueryInterface = require('./query-interface');

/**
 *  all interfaces with sql data base here:
 *
 */

var MysqlInterface =  {
    queryInterface: new QueryInterface(),

    query: new Query(),

    setUp: function() {
        if (!this.queryInterface || !this.query) {
            this.queryInterface = new QueryInterface();
            this.query = new Query();
        }
    },

    getAllUsers: function(callback) {
        var query = this.query.getAllDataForTable('users');
        this.queryInterface.makeQuery(query, callback);
    },

    getUserByEmail: function(email, callback) {
        var query = this.query.getAllDataForParameter('users', 'email', email);
        this.queryInterface.makeQuery(query, callback);
    },

    saveExistingUser: function(user, callback) {
        var query = this.query.updateQuery('users', user, 'userId');
        this.queryInterface.makeQuery(query, callback)
    },

    saveNewUser: function(user, callback) {
        var query = this.query.insertQuery('users', [user]);
        this.queryInterface.makeQuery(query, callback);
    },

    saveNewUsers: function(users, callback) {
        var query = this.query.insertQuery('users', users);
        this.queryInterface.makeQuery(query, callback);
    },

    getUserWithId: function (userId, callback) {
        var query = this.query.getAllDataForParameter('users', 'userId', userId);
        this.queryInterface.makeQuery(query, callback);
    },

    getAllCrops: function(callback) {
        var query = this.query.getAllDataForTable('crops');
        this.queryInterface.makeQuery(query, callback);
    },

    saveNewCrops: function(crops, callback) {
        var query = this.query.insertQuery('crops', crops);
        this.queryInterface.makeQuery(query, callback);
    },

    getCropWithCropId: function (cropId, callback) {
        var query = this.query.getAllDataForParameter('crops', 'cropId', cropId);
        this.queryInterface.makeQuery(query, callback);
    },

    getCropsWithUserId: function (userId, callback) {
        var query = this.query.getAllDataForParameter('crops', 'userId', userId);
        this.queryInterface.makeQuery(query, callback);
    },

    saveExistingCrop: function (crop, callback) {
        var query = this.query.updateQuery('crops', crop, 'cropId');
        this.queryInterface.makeQuery(query, callback);
    }
};

module.exports = MysqlInterface;
