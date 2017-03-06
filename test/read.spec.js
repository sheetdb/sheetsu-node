var sheetsuAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetsu', function() {
  describe('read function run without security token', function() {
    var sheetsu = sheetsuAPI({
      address: 'https://sheetsu.com',
    });
    mock.setup();

    it('should run with GET method', function() {
      mock.get('https://sheetsu.com', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read().then(function(data) {
        assert.equal(data.method, 'GET');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should run with correct headers', function() {
      mock.get('https://sheetsu.com', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read().then(function(data) {
        assert.equal(data._requestHeaders["Accept"], "application/vnd.sheetsu.3+json");
        assert.equal(data._requestHeaders["Accept-Encoding"], "gzip, deflate");
        assert.equal(data._requestHeaders["Content-Type"], "application/json");
        assert.equal(data._requestHeaders["User-Agent"], "Sheetsu-Node/1.0");
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url without limit and offset', function() {
      mock.get('https://sheetsu.com', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });
      return sheetsu.read().then(function(data){
        assert.equal(data.url, 'https://sheetsu.com');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with limit', function() {
      mock.get('https://sheetsu.com?limit=5', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read(5).then(function(data){
        assert.equal(data.url, 'https://sheetsu.com?limit=5');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with offset', function() {
      mock.get('https://sheetsu.com?offset=10', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read(undefined, 10).then(function(data) {
        assert.equal(data.url, 'https://sheetsu.com?offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with offset and limit', function() {
      mock.get('https://sheetsu.com?limit=5&offset=10', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read(5, 10).then(function(data){
        assert.equal(data.url, 'https://sheetsu.com?limit=5&offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should be able to search', function() {
      mock.get('https://sheetsu.com/search?name=test&foo=bar', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read(undefined, undefined, {name: 'test', foo: 'bar'}).then(function(data) {
        assert.equal(data.url, 'https://sheetsu.com/search?name=test&foo=bar');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should be able to search with limit', function() {
      mock.get('https://sheetsu.com/search?name=test&foo=bar&limit=5', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read(5, undefined, {name: 'test', foo: 'bar'}).then(function(data) {
        assert.equal(data.url, 'https://sheetsu.com/search?name=test&foo=bar&limit=5');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should be able to use different sheet', function() {
      mock.get('https://sheetsu.com/sheets/Sheet3', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read(undefined, undefined, undefined, 'Sheet3').then(function(data) {
        var url = data.url;

        assert.equal(data.url, 'https://sheetsu.com/sheets/Sheet3');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should be able to use different sheet ', function() {
      mock.get('https://sheetsu.com/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      return sheetsu.read(6, undefined, undefined, 'Sheet3').then(function(data) {
        var url = data.url;

        assert.equal(data.url, 'https://sheetsu.com/sheets/Sheet3?limit=6');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });
  });
});
