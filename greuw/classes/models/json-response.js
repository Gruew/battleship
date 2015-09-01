/**
 * Created by agreen on 3/28/15.
 */

var Constants = require('./../constants');
var _ = require('underscore');

function JsonResponse(response, code, payload, options) {
    this.payload = payload;
    this.code = code;
    this.response = response;
    this.options = options;
}

JsonResponse.prototype. respond = function() {
    this.response.append(
        Constants.httpConstants.contentType,
        Constants.httpConstants.typeJson
    );

    this.response.append(
        Constants.httpConstants.accessControl,
        Constants.httpConstants.accessType
    );

    this.response.json({
        response: this.code,
        payload: this.payload
    });
};

module.exports = JsonResponse;
