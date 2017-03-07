var sheetsuAPI = require('../');
var assert = require('assert');
var mock = require('xhr-mock');
describe('sheetsu', function() {
  describe('contructor', function() {
    it('should throw error when param has no address', function() {
      assert.throws(function() {
        sheetsuAPI();
      }, Error);
    });

    it('should not throw error when param has valid address', function() {
      mock.get('https://sheetsu.com', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      assert.doesNotThrow(function() {
        sheetsuAPI({
          address: 'https://sheetsu.com',
        });
      }, Error);
    });

    it('should throw error when wrong address', function() {
      mock.get('http://differentAddr', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

      assert.throws(function() {
        sheetsuAPI({
          address: 'https://differentAddr',
        });
      }, Error);
    });

    it('should valid correct address when only id is available', function() {
      mock.get('https://sheetsu.com', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

        var sheetsu = sheetsuAPI({
          address: 'sddfsjh34f3dsa',
        });

        assert.equal(sheetsu.config.address, 'https://sheetsu.com/apis/v1.0/sddfsjh34f3dsa');
    });

    it('should valid correct address when only id is available and different API version', function() {
      mock.get('https://sheetsu.com', function(req, res) {
        return res.status(200).body('<h1>Sheetsu</h1>');
      });

        var sheetsu = sheetsuAPI({
          address: 'sddfsjh34f3dsa',
          version: '2.1',
        });

        assert.equal(sheetsu.config.address, 'https://sheetsu.com/apis/v2.1/sddfsjh34f3dsa');
    });

    it('should use only secure connections (https://)', function() {
      assert.doesNotThrow(function() {
        sheetsuAPI({
          address: 'https://sheetsu.com',
        });
      }, Error);
    });

    it('should throw error when not secure connections (https://)', function() {
      assert.throws(function() {
        sheetsuAPI({
          address: 'http://sheetsu.com',
        });
      }, Error);
    });

    //
    // it('should use correct User-Agent header when different version of API', function() {
    //   assert.doesNotThrow(function() {
    //     sheetsuAPI({
    //       address: 'https://sheetsu.com',
    //       version: '1.2',
    //     });
    //   }, Error);
    // });
    //
    // it('should use Basic Authentication when api_key and api_secret available', function() {
    //   assert.doesNotThrow(function() {
    //     sheetsuAPI({
    //       address: 'https://sheetsu.com',
    //       api_key: '3434',
    //       api_secret: '63532',
    //     });
    //   }, Error);
    // });

  });
});
