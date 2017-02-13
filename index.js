function create(newObject, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();;
    var sheetParam = (!sheet) ? 'Sheet1' : sheet;
    var isArray = Array.isArray(newObject);
    var data;

    if (isArray) {
      data = JSON.stringify({
        rows: newObject,
      });
    } else {
      data = JSON.stringify(newObject);
    }

    var url = config.address + '/sheets/' + sheetParam;

    xhr.open("POST", url, true);

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        resolve(xhr);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send(data);
  });
}

function read(limit, offset, search, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var sheetParam = (!sheet) ? 'Sheet1' : sheet;
    var limitParam = (!limit) ? '' : '?limit=' + limit;
    var offsetParam = (!offset) ? '' : '?offset=' + offset;
    var searchParam = (!search) ? '' : '/search';
    var searchKeys = (!search) ? [] : Object.keys(search);

    for (var i = 0; i < searchKeys.length; i++) {
      var searchValue = search[searchKeys[i]];
      if(i === 0){
        searchParam += '?' + searchKeys[i] + '=' + searchValue;
      }
      else {
        searchParam += '&' + searchKeys[i] + '=' + searchValue;
      }
    }

    var url = config.address + '/sheets/' + sheetParam + limitParam + offsetParam + searchParam;

    xhr.open("GET", url, true);

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        resolve(xhr);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send(null);
  });
}

function update() {
}

function deleteFunc(columnName, value, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();;
    var sheetParam = (!sheet) ? 'Sheet1' : sheet;

    if(!columnName) {
      reject('no column name');
    }

    var url = config.address + '/sheets/' + sheetParam + '/' + columnName+  '/' + value;

    xhr.open("DELETE", url, true);

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        resolve(xhr);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send();
  });
}

var sheetsuNode = function(config) {
  var configParam = config || {};

  var version = configParam.version || '1.0';
  var api_key = configParam.api_key || '';
  var api_secret = configParam.api_secret || '';
  if(!configParam.address) {
    throw Error('address param needed');
  }
  var address = configParam.address;

  return {
    config: configParam,
    create: create,
    read: read,
    update: update,
    delete: deleteFunc,
  }
}

module.exports = sheetsuNode;
