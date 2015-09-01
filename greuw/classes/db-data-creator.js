var path = require('path');
var md5 = require('md5');
var User = require('./models/user');
var Crop = require('./models/crop');
var _ = require('underscore');
var SqlInterface = require('./sql-interface');
var Logger = require('./utils/logger');
var moment = require('moment');
var Constants = require('./constants');
var jsonFile = require('jsonfile');

function DbDataCreator(numberToCreate) {
    this.numOfUsersToCreate = numberToCreate;

    this.maxCropsForUser = 10;

    this.userNames = jsonFile.readFileSync(
        path.join(__dirname, '..', '/files/users.json')
    );

    this.crops = jsonFile.readFileSync(
        path.join(__dirname, '..', '/files/crops.json')
    );

    this.citiesAndStates = jsonFile.readFileSync(
        path.join(__dirname, '..', '/files/citiesAndStates.json')
    );

    this.pesticides = jsonFile.readFileSync(
        path.join(__dirname, '..', '/files/pesticides.json')
    );

    this.email = function(username) {
        return username.firstName + '@greuw.com';
    };

    this.password = function(username) {
        return md5(this.email(username));
    };

    this.facebook_id = function(username) {
        return this.email(username);
    };

    this.facebookAccessToken = function(username) {
        return md5(username.lastName + username.firstName);
    };

    this.dob = function() {
        return this.makeDate();
    };

    this.dateJoined = function() {
        return this.makeDate();
    };

    this.dateUpdated = function() {
        return this.makeDate();
    };

    this.makeDate = function() {
        return new Date(
            this.randomNumber(2000, 2015),
            this.randomNumber(1, 12),
            this.randomNumber(1, 28),
            this.randomNumber(0, 23),
            this.randomNumber(0, 59),
            this.randomNumber(0, 59),
            0
        );
    };

    this.latitude = function() {
        return 123.88888;
    };

    this.longitude = function() {
        return -105.4738;
    };

    this.cityAndState = function() {
        var index = this.randomNumber(0, this.citiesAndStates.length - 1);
        return this.citiesAndStates[index];
    };

    this._createUserInfo = function(username) {
        var location = this.cityAndState();
        return {
            userId: null,
            firstName: username.firstName,
            lastName: username.lastName,
            sex: username.sex,
            email: this.email(username),
            fbId: this.facebook_id(username),
            fbAccessToken: this.facebookAccessToken(username),
            dob: this.dob(),
            dateJoined: this.dateJoined(),
            dateUpdate: this.dateUpdated(),
            latitude: this.latitude(),
            longitude: this.longitude(),
            city: location.city,
            state: location.state
        };
    };

    this._getUserName = function() {
        var index = this.randomNumber(0, this.userNames.length - 1);
        var username = this.userNames[index];
        username.username = function() {
            return md5(this.firstName + this.lastName + this.sex);
        };

        return username;
    };

    this.createInfo = function(callback) {
        var self = this;
        SqlInterface.getAllUsers(function(err, userRows) {
            if (err) {
                Logger.log(__filename, 'Failed to retrieve users with error', err, true);
                callback(Constants.responseCodes.genericFailure);
                throw err;
            }

            if (userRows.length > 0) {
                self.createCrops(userRows);
            } else {
                self.createUsers(callback);
            }
        });
    };

    this.createUsers = function(callback) {
        var index = 0;
        var self = this;
        var users = [];
        while (index < this.numOfUsersToCreate) {
            var userInfo = this._createUserInfo(this._getUserName());
            users.push(new User(userInfo));
            index++;
        }

        SqlInterface.saveNewUsers(users, function(err, data) {
            if (err) {
                Logger.log(__filename, 'Failed to create users with error', err, true);
                callback(Constants.responseCodes.genericFailure);
                throw err;
            }

            Logger.log(__filename, 'Successfully created users', null, true);
            self.createCrops(callback);
        });

    };

    this.createCrops = function(callback) {
        var self = this;
        SqlInterface.getAllUsers(function(err, users) {
            if (err) {
                Logger.log(__filename, 'Failed to retrieve users with error', err, true);
                throw err;
            }

            self._createCrops(users, callback);
        });
    };

    this._createCrops = function(users, callback) {
        var crops = this._cropsForUsers(users);
        SqlInterface.saveNewCrops(crops, function(err, cropData) {
            if (err) {
                Logger.log(__filename, 'Failed to create crops with error', err, true);
                throw err;
            }

            Logger.log(__filename, 'Created crops: ', crops, true);
            callback(err, cropData);
        });
    };

    this._cropsForUsers = function(users) {
        var crops = [];
        _.each(users, function(user) {
             crops = crops.concat(this._cropsForUser(user));
        }, this);

        return crops;
    };

    this._cropsForUser = function(user) {
        var upperCropBound = this.crops.length < this.maxCropsForUser ?
            this.crops.length : this.maxCropsForUser;
        var numberOfCrops = this.randomNumber(1, upperCropBound);
        var index = 0;
        var crops = {};
        while (index < numberOfCrops) {
            var cropInfo = this._createCropInfo(user);
            var crop = new Crop(cropInfo);
            if (!_.has(crops, crop.type)) {
                crops[crop.type] = crop;
                index++;
            }
        }

        return _.values(crops);
    };

    this._createCropInfo = function(user) {
        var amount = this.makeCropAmount();
        var crop = this._getCrop();
        var isOrganic = this.isOrganic();
        return {
            cropId: null,
            userId: user.userId,
            amount: amount.amount,
            amountUnit: amount.unit,
            type: crop.type,
            category: crop.category,
            organic: isOrganic,
            pesticides:this._getPesticides(isOrganic)
        };
    };

    this.makeCropAmount = function() {
        var amount = this.randomNumber(0, 5);
        return {
            amount: amount,
            unit: amount % 2 === 0 ? 'lbs' : 'kg'
        };
    };

    this._getCrop = function() {
        var index = this.randomNumber(0, this.crops.length - 1);
        return this.crops[index];
    };

    this.randomNumber = function(low, high) {
        return Math.floor(Math.random()*(high - low)) + low;
    };

    this.isOrganic = function() {
        return false;
    };

    this._getPesticides = function(isOrganic) {
        if (isOrganic) {
            return null;
        }

        var index = this.randomNumber(0, this.pesticides.length - 1);
        return JSON.stringify(this.pesticides[index]);
    }
}

module.exports = DbDataCreator;
