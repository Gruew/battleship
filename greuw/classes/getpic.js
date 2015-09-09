"use strict";
console.log('get');
var path = require('path');
var fs = require('fs');
console.log('gut');
function picgetter(name){
	this.name = name;
	this.path = "../media/headshots/";
	this.picpath = function(){
		console.log('in picpath');
		return path.join(this.path, this.name);
	};
	this.getpic = function(){
		console.log('Picture path', this.picpath());
		return fs.readFileSync(this.picpath());
	};
}

module.export = picgetter;