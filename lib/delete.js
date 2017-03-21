var btoa = require('btoa');

module.exports = function(columnName, value, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    var sheetParam = (!sheet) ? '' : '/sheets/' + sheet;

    if(!columnName) {
      reject('no column name');
    }

    var url = config.address + sheetParam + '/' + columnName +  '/' + value;

    xhr.open('DELETE', url, true);

    xhr.setRequestHeader("Accept", "application/vnd.sheetsu.3+json");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("User-Agent", "Sheetsu-Node/"+config.version);

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

    xhr.send();
  });
}
