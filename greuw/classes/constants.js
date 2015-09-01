/**
 * Created by agreen on 3/19/15.
 */

var Constants = {

    httpConstants: {
        contentType     : "Content-Type",
        typeHtml        : "text/html",
        typeJson        : "application/json",
        accessControl   : 'Access-Control-Allow-Origin',
        accessType      : '*'
    },

    userConstants: {
        userId          : 'userId',
        email           : 'email',
        fbId            : 'fbId',
        fbAccessToken   : 'fbAccessToken',
        firstName       : 'firstName',
        lastName        : 'lastName',
        dob             : 'dob',
        sex             : 'sex',
        dateJoined      : 'dateJoined',
        dateUpdated     : 'dateUpdated',
        latitude        : 'latitude',
        longitude       : 'longitude',
        city            : 'city',
        state           : 'state'
    },

    cropConstants: {
        cropId          : 'cropId',
        userId          : 'userId',
        amount          : 'amount',
        amountUnit      : 'amountUnit',
        type            : 'type',
        category        : 'category',
        organic         : 'organic',
        pesticides      : 'pesticides'
    },

    errorMessage: {
        queryError: {
            noQuery: 'There was no query provided. ' +
            'You must create a query string for your query object'
        }
    },

    responseCodes: {
        genericSuccess: 1000,
        genericFailure: 1001
    },

    mysqlConversions: {
        intToBool: 'intToBool'
    },

    requestUrls: {
        getAllUsers : '/all-users',
        saveUser    : '/save-user',
        getAllCrops : '/all-crops',
        createData  : '/create-data'
    }
};



module.exports = Constants;
