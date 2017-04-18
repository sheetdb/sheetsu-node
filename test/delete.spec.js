var sheetsuAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetsu', function() {
  describe('delete() function', function() {
    var sheetsu = sheetsuAPI({
      address: 'dfsdf43fsd',
    });

    it('should run with DELETE method', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(200).body('test');
      });

      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data, 'test');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should run with Http Basic Auth', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(201).body(req._headers);
      });

      sheetsuLocal = sheetsuAPI({
        address: 'dfsdf43fsd',
        api_key: 'somekey',
        api_secret: 'somesecret',
      });

      return sheetsuLocal.delete('column', 'test').then(function(data) {
        assert.equal(data.authorization, "Basic c29tZWtleTpzb21lc2VjcmV0");
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with correct headers', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(201).body(req._headers);
      });

      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data["accept"], "application/vnd.sheetsu.3+json");
        assert.equal(data["content-type"], "application/json");
        assert.equal(data["x-user-agent"], "Sheetsu-Node/1.0");
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with column name and value', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(200).body(req);
      })

      return sheetsu.delete('column', 'test').then(function(data){
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should throw error when no column param', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.delete().then(function(data){
        assert.fail('sheetsu do not throw error');
      }, function(err) {
        assert.equal(err, 'no column name');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should return url different Sheet', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3/column/test', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetsu.delete('column', 'test', 'Sheet3').then(function(data){
        assert.equal(data._url, 'https://sheetsu.com/apis/v1.0/dfsdf43fsd/sheets/Sheet3/column/test');
      }, function(err) {
        assert.fail('sheetsu throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should return error when 404', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(404).body(req._xhr);
      });

      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 404);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 429', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(429).body(req._xhr);
      });

      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 429);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 403', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(403).body(req._xhr);
      });

      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 403);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 401', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(401).body(req._xhr);
      });

      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 401);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 500', function() {
      mock.setup();
      mock.delete('https://sheetsu.com/apis/v1.0/dfsdf43fsd/column/test', function(req, res) {
        return res.status(500).body(req._xhr);
      });

      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 500);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

  });
});
