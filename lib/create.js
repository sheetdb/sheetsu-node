var btoa = require('btoa');
if(typeof window != 'undefined') {
  XMLHttpRequest = require('xhr2');
}

module.exports = function(newRow, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
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
    xhr.setRequestHeader("Accept", "application/vnd.sheetsu.3+json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-User-Agent", "Sheetsu-Node/"+config.version);

    if (config.api_key && config.api_secret) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(config.api_key+":"+config.api_secret));
    }

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.send(data);
  });
}
