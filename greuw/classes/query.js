var _ = require('underscore');
var moment = require('moment');
var Logger = require('./utils/logger');

function Query() {
    /**
     *
     * @param table - string - table name in db
     * @returns {string}
     */
    this.getAllDataForTable = function(table) {
        return 'SELECT * FROM ' + table;
    };

    /**
     * Makes query string for a target value which can be a
     * boolean, int, float or string
     *
     * @param table - string - Table name in db
     * @param parameter - string - Column name in db
     * @param value - search parameter
     * @returns {string}
     */
    this.getAllDataForParameter = function(table, parameter, value) {
        return 'SELECT * FROM ' + table + ' WHERE `' + parameter + '`=' + this._handleValue(value);
    };

    /**
     *
     * @param table - string - table name in db
     * @param datum - array - array of objects corresponding to rows in the db
     * @returns {string}
     */

    this.insertQuery = function (table, datum) {
        Logger.log(__filename, 'datam', datum, true);
        var columns = this._keysUsed(datum[0]);
        var index = 0;
        var query = 'INSERT INTO ' + table + ' (';
        _.each(columns, function(key) {
            var ending = (index == columns.length - 1) ? ')' : ',';
             query += '`' + key + '`' + ending;
            index++;
        });

        index = 0;
        var values = [];
        _.each(datum, function(data) {
            values.push([]);
            _.each(columns, function(key) {
                var value = data[key];
                values[index].push(this._handleValue(value));
            }, this);

            index++;
        }, this);

        var columnValues = [];
        _.each(values, function(valueArray) {
            columnValues.push('(' + valueArray.join() + ')');
        }, this);

        Logger.log(__filename, 'column values:', columnValues, true);
        return query + ' VALUES' + columnValues.join();
    };

    this.updateQuery = function(table, data, parameter) {
        var usedKeys = this._keysUsed(data);
        var values = [];
        _.each(usedKeys, function(key) {
            var entry = '`' + key + '`=' + this._handleValue(data[key]);
             values.push(entry);
        }, this);


        return 'UPDATE ' + table + ' SET ' + values.join() +
            ' WHERE ' + parameter + '=' + this._handleValue(data[parameter]);
    };

    this._keysUsed = function(data) {
        var usedKeys = [];
        var key;
        for (key in data) {
            if (data[key] && data.hasOwnProperty(key) && typeof data[key] != 'function') {
                usedKeys.push(key);
            }
        }

        return usedKeys;
    };

    this._handleValue = function(value) {
        var valueString;
        if (typeof  value === 'string') {
            valueString = "'" + value + "'";
        } else if (typeof value === 'number') {
            valueString = value.toString();
        } else if (typeof value === 'boolean') {
            valueString = this._boolToInt(value).toString();
        } else if (value instanceof Date) {
            valueString = "'" + moment(value).format('YYYY-MM-DD hh:mm:ss') + "'";
        }

        return valueString;
    };

    this._boolToInt = function(bool) {
        return !bool ? 0 : 1;
    }
}

module.exports = Query;
