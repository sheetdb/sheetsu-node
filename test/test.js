var sheetsuAPI = require('../');
var assert = require('assert');
var MockXMLHttpRequest  =  require('mock-xmlhttprequest');
global.XMLHttpRequest = MockXMLHttpRequest;

describe('sheetsu', function() {
  describe('config', function() {
    it('should throw error when no address', function() {
      assert.throws(function(){
        sheetsuAPI();
      }, Error);
    });
    it('should not throw error when is address', function() {
      sheetsuAPI.bind(sheetsuAPI, {
        address: 'http://',
      });
      assert.doesNotThrow(function() {
        sheetsuAPI({
          address: 'http://',
        });
      }, Error);
    });
  });

  describe('read function without security tokens', function() {
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

    it('should return url without limit and offset', function() {
      return sheetsu.read().then(function(data){
        var url = data.url;

        assert.equal(data.url, 'http://testAddress/sheets/Sheet1');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with limit', function() {
      return sheetsu.read(5).then(function(data){
        var url = data.url;

        assert.equal(data.url, 'http://testAddress/sheets/Sheet1?limit=5');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with offset', function() {
      return sheetsu.read(undefined, 10).then(function(data){
        var url = data.url;

        assert.equal(data.url, 'http://testAddress/sheets/Sheet1?offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should return url with offset and limit', function() {
      return sheetsu.read(5, 10).then(function(data){
        var url = data.url;

        assert.equal(data.url, 'http://testAddress/sheets/Sheet1?limit=5?offset=10');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should be able to search', function() {
      return sheetsu.read(undefined, undefined, {name: 'test', foo: 'bar'}).then(function(data){
        var url = data.url;
        assert.equal(data.url, 'http://testAddress/sheets/Sheet1/search?name=test&foo=bar');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

    it('should use different sheet', function() {
      return sheetsu.read(undefined, undefined, undefined, 'Sheet3').then(function(data){
        var url = data.url;

        assert.equal(data.url, 'http://testAddress/sheets/Sheet3');
      }, function(err) {
        assert.fail('sheetsu throw error');
      });
    });

  });
});
