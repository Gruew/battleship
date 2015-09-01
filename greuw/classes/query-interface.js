/**
 * Created by agreen on 3/26/15.
 */

/**
 * interface for queries
 */

var MySqlConnection = require('./sql-connection.js');
var Constants = require('./constants');
var Logger = require('./utils/logger');

function QueryInterface() {
    this.mysqlConnection = MySqlConnection;
}

QueryInterface.prototype.makeQuery = function(query, callback) {
    if (query) {
        Logger.log(__filename, 'making query:', query, true);
        this.mysqlConnection.executeQuery(query, function(err, rows) {
            if (err) {
                Logger.log(__filename, query + ' Failed with error: ', err, true);
                callback(err, null);
            } else {
                Logger.log(__filename, 'finished query with:', rows, true);
                callback(null, rows);
            }
        });
    } else {
        callback(new Error(Constants.errorMessage.queryError.noQuery), []);
    }
};

module.exports = QueryInterface;
