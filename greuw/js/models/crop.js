var constants = require('../constants');

function Crop(cropInfo) {
    this.cropId = cropInfo[constants.cropConstants.cropId];
    this.userId = cropInfo[constants.cropConstants.userId];
    this.amount = cropInfo[constants.cropConstants.amount];
    this.amountUnit = cropInfo[constants.cropConstants.amountUnit];
    this.type = cropInfo[constants.cropConstants.type];
    this.category = cropInfo[constants.cropConstants.category];
    this.organic = cropInfo[constants.cropConstants.organic];
    this.pesticides = cropInfo[constants.cropConstants.pesticides];
}

module.exports = Crop;


