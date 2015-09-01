/**
 * Created by agreen on 3/26/15.
 */

var mysql = require('mysql');
var Logger = require('./utils/logger');

var MySqlConnection = {
    pool: mysql.createPool({
        host: 'localhost',
        user: 'agreen',
        password: 'password',
        database: 'gruew'
    }),

    connect: function() {
        this.connection.connect(function(err) {
            if (err) {
                Logger.log(__filename, 'Error connecting: ', err, true);
                return;
            }

            Logger.log(__filename, 'Connected to thread:', this.connection.threadId, true);

            // handle errors without a callback
            this.connection.on('error', this._handleError, this);
        }, this);
    },

    end: function() {
        this.connection.end(function(err) {
            if (err) {
                Logger.log(__filename, 'Error ending connection:', err, true);
                return;
            }

            Logger.log(__filename, 'Connection ended', null, true);
        });
    },

    executeQuery: function(query, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                Logger.log(__filename, 'Error getting connection from pool:', err, true);
                callback(err, null);
                return;
            }

            connection.query(query, function(err, results) {
                connection.release();
                if (err) {
                    Logger.log(__filename, 'Error in query:' + query, err, true);
                    callback(err, null);
                    return;
                }

                Logger.log(__filename, 'Success completing query:', query, true);
                callback(null, results);
            });
        });
    },

    _handleError: function(err) {
        if (err.fatal) {
            // handle the fatal error
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                // handle case were connection is lost
                Logger.log(__filename, 'Attempting to reconnect', null, true);
                this.connect();
            } else {
                // if we haven't handled the error yet, throw the error
                throw err;
            }
        } else {
            // if the error is not fatal, let's just log it and forget about it
            Logger.log(__filename, 'Non-fatal error', err, true);
        }
    }
};

module.exports = MySqlConnection;
