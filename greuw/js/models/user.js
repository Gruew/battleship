var Constants = require('./../constants');
var DateHandler = require('./../utils/date-handler');

function User(userInfo) {
    this.userId = userInfo[Constants.userConstants.userId];
    this.email = userInfo[Constants.userConstants.email];
    this.fbId = userInfo[Constants.userConstants.fbId];
    this.fbAccessToken = userInfo[Constants.userConstants.fbAccessToken];
    this.firstName = userInfo[Constants.userConstants.firstName];
    this.lastName = userInfo[Constants.userConstants.lastName];
    this.dob = userInfo[Constants.userConstants.dob];
    this.sex = userInfo[Constants.userConstants.sex];
    this.dateJoined = userInfo[Constants.userConstants.dateJoined];
    this.dateUpdated = userInfo[Constants.userConstants.dateUpdated];
    this.latitude = userInfo[Constants.userConstants.latitude];
    this.longitude = userInfo[Constants.userConstants.longitude];
    this.city = userInfo[Constants.userConstants.city];
    this.state = userInfo[Constants.userConstants.state];
}

User.prototype.setDateUpdated = function () {
    var dateHandler = new DateHandler();
    this.dateUpdated = dateHandler.currentDateAsUTCString();
};

User.prototype.setDateJoined = function () {
    var dateHandler = new DateHandler();
    this.dateJoined = dateHandler.currentDateAsUTCString();
};


module.exports = User;