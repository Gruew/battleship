/**
 * Created by agreen on 3/30/15.
 */

function DateHandler() {

}

DateHandler.prototype.currentDateAsUTCString = function() {
    return this.dateAsUtcString(new Date());
};

DateHandler.prototype.dateAsUtcString = function (date) {
    return this._addZero(date.getUTCFullYear()) + '-' +
        this._addZero((date.getUTCMonth() + 1).toString()) + '-' +
        this._addZero(date.getUTCDate().toString()) +  ' ' +
        this._addZero(date.getUTCHours().toString()) + ':' +
        this._addZero(date.getUTCMinutes().toString()) + ':' +
        this._addZero(date.getUTCSeconds().toString());
};

DateHandler.prototype._addZero = function (dateNumber) {
    var dateString = dateNumber.toString();
    if (dateNumber < 10) {
        dateString = '0' + dateString;
    }

    return dateString;
};
module.exports = DateHandler;