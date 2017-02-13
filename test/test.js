var sheetsuAPI = require('../');
var assert = require('assert');
var MockXMLHttpRequest  =  require('mock-xmlhttprequest');
global.XMLHttpRequest = MockXMLHttpRequest;

describe('sheetsu', function() {
  describe('contructor', function() {
    it('should throw error when param has no address', function() {
      assert.throws(function() {
        sheetsuAPI();
      }, Error);
    });

    it('should not throw error when param has address', function() {
      assert.doesNotThrow(function() {
        sheetsuAPI({
          address: 'http://',
        });
      }, Error);
    });
  });

  describe('read function run without security token', function() {
    var sheetsu = sheetsuAPI({
      address: 'http://testAddress',
    });

    MockXMLHttpRequest.onSend = function(xhr) {
    var response = {
      result: 'success',
    };
    var responseHeaders = {
      'Content-Type': 'application/json',
    }
      xhr.respond(200, responseHeaders, JSON.stringify(response));
    };

    it('should run with GET method', function() {
      return sheetsu.read().then(function(data){
        assert.equal(data.method, 'GET');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url without limit and offset', function() {
      return sheetsu.read().then(function(data){
        assert.equal(data.url, 'http://testAddress/sheets/Sheet1');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with limit', function() {
      return sheetsu.read(5).then(function(data){
        assert.equal(data.url, 'http://testAddress/sheets/Sheet1?limit=5');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with offset', function() {
      return sheetsu.read(undefined, 10).then(function(data) {
        assert.equal(data.url, 'http://testAddress/sheets/Sheet1?offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with offset and limit', function() {
      return sheetsu.read(5, 10).then(function(data){
        assert.equal(data.url, 'http://testAddress/sheets/Sheet1?limit=5?offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should be able to search', function() {
      return sheetsu.read(undefined, undefined, {name: 'test', foo: 'bar'}).then(function(data) {
        assert.equal(data.url, 'http://testAddress/sheets/Sheet1/search?name=test&foo=bar');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should be able to use different sheet', function() {
      return sheetsu.read(undefined, undefined, undefined, 'Sheet3').then(function(data){
        var url = data.url;

        assert.equal(data.url, 'http://testAddress/sheets/Sheet3');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });
  });

  describe('create function run without security token', function() {
    var sheetsu = sheetsuAPI({
      address: 'http://testAddress',
    });

    MockXMLHttpRequest.onSend = function(xhr) {
    var response = {
      result: 'success',
    };
    var responseHeaders = {
      'Content-Type': 'application/json',
    }
      xhr.respond(200, responseHeaders, JSON.stringify(response));
    };

    it('should run with POST method', function() {
      return sheetsu.create({}).then(function(data) {
        assert.equal(data.method, 'POST');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should run with object data', function() {
      return sheetsu.create({some: 5}).then(function(data){
        assert.equal(data.body, '{"some":5}');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should run with array data', function() {
      return sheetsu.create([{}, {test: 3}]).then(function(data){
        assert.equal(data.body, '{"rows":[{},{"test":3}]}');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url different Sheet', function() {
      return sheetsu.create(undefined, 'Sheet2').then(function(data){
        assert.equal(data.url, 'http://testAddress/sheets/Sheet2');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

  });
  describe('delete function run without security token', function() {
    var sheetsu = sheetsuAPI({
      address: 'http://testAddress',
    });

    MockXMLHttpRequest.onSend = function(xhr) {
    var response = {
      result: 'success',
    };
    var responseHeaders = {
      'Content-Type': 'application/json',
    }
      xhr.respond(200, responseHeaders, JSON.stringify(response));
    };

    it('should run with DELETE method', function() {
      return sheetsu.delete('column', 'test').then(function(data) {
        assert.equal(data.method, 'DELETE');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should run with column name and value', function() {
      return sheetsu.delete('column', 'value').then(function(data){
        assert.equal(data.url, 'http://testAddress/sheets/Sheet1/column/value');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should throw error when no column param', function() {
      return sheetsu.delete().then(function(data){
        assert.fail('sheetsu do not throw error');
      }, function(err) {
        assert.equal(err, 'no column name');
      });
    });

    it('should return url different Sheet', function() {
      return sheetsu.delete('column', 'test', 'Sheet2').then(function(data){
        assert.equal(data.url, 'http://testAddress/sheets/Sheet2/column/test');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

  });
});
