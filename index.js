var readFunc = require('./lib/read.js');
var createFunc = require('./lib/create.js');
var updateFunc = require('./lib/update.js');
var deleteFunc = require('./lib/delete.js');
var validAddress = require('./lib/validAddress.js');

var sheetsuNode = function(config) {
  var configParam = config || {};

  configParam.version = configParam.version || '1.0';
  configParam.api_key = configParam.api_key || '';
  configParam.api_secret = configParam.api_secret || '';

  if(!configParam.address) {
    throw Error('address param needed');
  }

  if(!validAddress(configParam.address)) {
    throw Error('wrong address param.');
  }

  var address = configParam.address;

  return {
    config: configParam,
    create: createFunc,
    read: readFunc,
    update: updateFunc,
    delete: deleteFunc,
  }
}

module.exports = sheetsuNode;
