"use strict";

var path = require('path');
var fs = require('fs');
var Logger = require('./utils/logger');

function PicGetter(name) {
	this.name = name;

	this.path = "media/headshots";

	this.picPath = function() {
		return path.join(this.path, this.name);
	};
    
	this.getPic = function(callback) {
        var picPath = this.picPath();
        Logger.log(__filename, 'Retrieving pic:', picPath, false);
        fs.readFile(picPath, callback);
	};
}

module.exports = PicGetter;