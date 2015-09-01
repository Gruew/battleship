/**
 * Created by agreen on 3/27/15.
 */
var passwordHS = require('password-hash-and-salt');
var crypto = require('crypto');

var PasswordHandler = function () {
    this._saltLength = 16;
};

//PasswordHandler.prototype.hashAndSalt = function(pwToHashAndSalt, callback) {
//
//    if (!pwToHashAndSalt) {
//        callback(null);
//    }
//
//    passwordHS(pwToHashAndSalt).hash(function(error, hash) {
//        if (error) throw error;
//        callback(hash);
//    });
//};

PasswordHandler.prototype.newHash = function(pwToHashAndSalt, callback) {
    if (pwToHashAndSalt) {
        this._createHash(pwToHashAndSalt, this._salt(), callback);
    } else {
        callback(null, null);
    }
};

PasswordHandler.prototype._createHash = function(password, salt, callback) {
    console.log('callback: ', callback);

    var saltedPW = crypto.createHash('sha256').update(salt + password).digest("hex");
    callback(saltedPW, salt);
    //crypto.pbkdf2(password, salt, 4096, 512, 'sha256', function(err, key) {
    //    console.log('before err');
    //    if (err) throw err;
    //    console.log(key.toString('hex'));
    //    callback(key.toString('hex'), salt);
    //});
};

//PasswordHandler.prototype.verify = function(incomingPW, hashedPw, callback) {
//    console.log('\nincomingPw: ', incomingPW);
//    console.log('\nhashedPW', hashedPw);
//
//    if(!incomingPW || !this.hash) {
//        callback(false);
//    } else {
//        passwordHS(incomingPW).verifyAgainst(hashedPw, function (error, verified) {
//            if (error) throw error;
//            callback(verified);
//        });
//    }
//};

PasswordHandler.prototype.verify = function(incomingPW, hashedPw, salt, callback) {
    console.log('\nincomingPw: ', incomingPW);
    console.log('\nhashedPW', hashedPw);

    this._createHash(incomingPW, salt, function (newHash, newSalt) {
        callback(newHash === hashedPw);
    });
};

PasswordHandler.prototype._salt = function() {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var setSize = set.length;
    var saltString = '';
    for(var i=0; i < this._saltLength; i++) {
        var target = Math.floor(Math.random() * setSize);
        saltString += set[target];
    }

    return saltString;
};

module.exports = PasswordHandler;