var path = require('path');

var Logger = {
    log: function (filename, message, object, skipLine) {

        if (filename) {
            message = path.basename(filename, '.js') + ' :: ' + message;
        }

        if (skipLine) {
            message = '\n' + message;
        }

        if(object) {
            console.log(message, object);
        } else {
            console.log(message);
        }
    }
};

module.exports = Logger;