function create(newRow, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();;
    var sheetParam = (!sheet) ? '' : '/sheets/' + sheet;
    var isArray = Array.isArray(newRow);
    var data;

    if (isArray) {
      data = JSON.stringify({
        rows: newRow,
      });
    } else {
      data = JSON.stringify(newRow);
    }

    var url = config.address + sheetParam;

    xhr.open('POST', url, true);

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
    var sign = (search) ? '&' : '?';

    var sheetParam = (!sheet) ? '' : '/sheets/' + sheet;
    var limitParam = (!limit) ? '' : sign + 'limit=' + limit;
    var offsetParam = (!offset) ? '' : sign + 'offset=' + offset;
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

    var url = config.address + sheetParam + searchParam + limitParam + offsetParam;
    xhr.open('GET', url, true);

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

function update(columnName, value, newRow, updateWhole, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var sheetParam = (!sheet) ? '' : '/sheets/' + sheet;
    var data = JSON.stringify(newRow);

    if(!columnName) {
      reject('no column name');
    }

    var url = config.address + sheetParam + '/' + columnName +  '/' + value;

    xhr.open(updateWhole ? 'PUT' : 'PATCH', url, true);

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

function deleteFunc(columnName, value, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();;
    var sheetParam = (!sheet) ? '' : '/sheets/' + sheet;

    if(!columnName) {
      reject('no column name');
    }

    var url = config.address + sheetParam + '/' + columnName +  '/' + value;

    xhr.open('DELETE', url, true);

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
