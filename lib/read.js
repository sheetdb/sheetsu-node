var btoa = require('btoa');
if(typeof window === 'undefined') {
  XMLHttpRequest = require('xhr2');
}

module.exports = function(limit, offset, search, sheet) {
  var config = this.config;

  return new Promise(function(resolve, reject) {

      var xhr = new XMLHttpRequest();
      var limitSign = (search) ? '&' : '?';
      var offsetSign = (search || limit) ? '&' : '?';
      var sheetParam = (!sheet) ? '' : '/sheets/' + sheet;
      var limitParam = (!limit) ? '' : limitSign + 'limit=' + limit;
      var offsetParam = (!offset) ? '' : offsetSign + 'offset=' + offset;
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
