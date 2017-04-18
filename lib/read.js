var btoa = require('btoa');
if(typeof window === 'undefined') {
  XMLHttpRequest = require('xhr2');
}

module.exports = function(params) {
  var config = this.config,
      params = params ? params : {};

  return new Promise(function(resolve, reject) {

      var limit = params.limit,
          offset = params.offset,
          search = params.search,
          sheet = params.sheet,
          xhr = new XMLHttpRequest(),
          limitSign = (search) ? '&' : '?',
          offsetSign = (search || limit) ? '&' : '?',
          sheetParam = (!sheet) ? '' : '/sheets/' + sheet,
          limitParam = (!limit) ? '' : limitSign + 'limit=' + limit,
          offsetParam = (!offset) ? '' : offsetSign + 'offset=' + offset,
          searchParam = (!search) ? '' : '/search',
          searchKeys = (!search) ? [] : Object.keys(search);

      for (var i = 0; i < searchKeys.length; i++) {
        var searchValue = search[searchKeys[i]];
        
        if(i === 0){
          searchParam += '?' + searchKeys[i] + '=' + searchValue;
        } else {
          searchParam += '&' + searchKeys[i] + '=' + searchValue;
        }
      }

      var url = config.address + sheetParam + searchParam + limitParam + offsetParam;

      xhr.open('GET', url, true);

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

      xhr.send();
  });
}
