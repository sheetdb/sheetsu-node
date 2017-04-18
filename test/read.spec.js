var sheetsuAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetsu', function() {
  describe('read() function', function() {
    var sheetsu = sheetsuAPI({
      address: 'dfsdf43fsd',
    });

    it('should run with GET method', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd', function(req, res) {
        return res.status(200).body('test');
      });

      return sheetsu.read({}).then(function(data) {
        assert.equal(data, 'test');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should run with Http Basic Auth', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd', function(req, res) {
        return res.status(200).body(req._headers);
      });

      sheetsuLocal = sheetsuAPI({
        address: 'dfsdf43fsd',
        api_key: 'somekey',
        api_secret: 'somesecret',
      });

      return sheetsuLocal.read().then(function(data) {
        assert.equal(data.authorization, "Basic c29tZWtleTpzb21lc2VjcmV0");
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with correct headers', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd', function(req, res) {
        return res.status(200).body(req._headers);
      });

      return sheetsu.read().then(function(data) {
        assert.equal(data["accept"], "application/vnd.sheetsu.3+json");
        assert.equal(data["content-type"], "application/json");
        assert.equal(data["x-user-agent"], "Sheetsu-Node/1.0");
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url without limit and offset', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd', function(req, res) {
        return res.status(200).body(req);
      });
      return sheetsu.read().then(function(data){
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url with limit', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd?limit=5', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.read({ limit: 5 }).then(function(data){
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd?limit=5');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url with offset', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd?offset=10', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.read({ offset: 10 }).then(function(data) {
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd?offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return url with offset and limit', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd?limit=5&offset=10', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.read({ limit: 5, offset: 10 }).then(function(data){
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd?limit=5&offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to search', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/search?name=test&foo=bar', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.read({ search: {name: 'test', foo: 'bar'} }).then(function(data) {
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd/search?name=test&foo=bar');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to search with limit', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/search?name=test&foo=bar&limit=5', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.read({ limit: 5, search: {name: 'test', foo: 'bar'} }).then(function(data) {
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd/search?name=test&foo=bar&limit=5');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to use different sheet', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.read({ sheet: 'Sheet3' }).then(function(data) {
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should be able to use different sheet when limit set', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.read({ limit: 6, sheet: 'Sheet3' }).then(function(data) {
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3?limit=6');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 404', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(404).body(req);
      });

      return sheetsu.read().then(function(data) {
        assert.fail('sheetsu does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 429', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(429).body(req);
      });

      return sheetsu.read().then(function(data) {
        assert.fail('sheetsu does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 403', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(403).body(req);
      });

      return sheetsu.read().then(function(data) {
        assert.fail('sheetsu does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 401', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(401).body(req);
      });

      return sheetsu.read().then(function(data) {
        assert.fail('sheetsu does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 500', function() {
      mock.setup();
      mock.get('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3?limit=6', function(req, res) {
        return res.status(500).body(req);
      });

      return sheetsu.read().then(function(data) {
        assert.fail('sheetsu does not throw any error');
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });
  });
});
