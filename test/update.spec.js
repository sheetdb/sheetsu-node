// var sheetsuAPI = require('../');
// var assert = require('assert');
// var MockXMLHttpRequest  =  require('mock-xmlhttprequest');
// global.XMLHttpRequest = MockXMLHttpRequest;
//
// describe('sheetsu', function() {
//   describe('update function run without security token', function() {
//     var sheetsu = sheetsuAPI({
//       address: 'https://sheetsu.com',
//     });
//     //
//     // MockXMLHttpRequest.onSend = function(xhr) {
//     // var response = {
//     //   result: 'success',
//     // };
//     // var responseHeaders = {
//     //   'Content-Type': 'application/json',
//     // }
//     //   xhr.respond(200, responseHeaders, JSON.stringify(response));
//     // };
//
//     it('should run with PUT method', function() {
//       return sheetsu.update('column', 'test', undefined, true).then(function(data) {
//         assert.equal(data.method, 'PUT');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should run with PATCH method', function() {
//       return sheetsu.update('column', 'test', undefined, false).then(function(data) {
//         assert.equal(data.method, 'PATCH');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should run with column name and value', function() {
//       return sheetsu.update('column', 'value').then(function(data){
//         assert.equal(data.url, 'https://sheetsu.com/column/value');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should throw error when no column param', function() {
//       return sheetsu.update().then(function(data){
//         assert.fail('sheetsu do not throw error');
//       }, function(err) {
//         assert.equal(err, 'no column name');
//       });
//     });
//
//     it('should run with array data', function() {
//       return sheetsu.update('column', 'test', {test: 3}, false, 'Sheet2').then(function(data){
//         assert.equal(data.body, '{"test":3}');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should return url different Sheet', function() {
//       return sheetsu.update('column', 'test', {}, false, 'Sheet2').then(function(data){
//         assert.equal(data.url, 'https://sheetsu.com/sheets/Sheet2/column/test');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//   });
// });
