// var sheetsuAPI = require('../');
// var assert = require('assert');
// var MockXMLHttpRequest  =  require('mock-xmlhttprequest');
// global.XMLHttpRequest = MockXMLHttpRequest;
//
// describe('sheetsu', function() {
//   describe('delete function run without security token', function() {
//     var sheetsu = sheetsuAPI({
//       address: 'https://sheetsu.com',
//     });
//
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
//     it('should run with DELETE method', function() {
//       return sheetsu.delete('column', 'test').then(function(data) {
//         assert.equal(data.method, 'DELETE');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should run with column name and value', function() {
//       return sheetsu.delete('column', 'value').then(function(data){
//         assert.equal(data.url, 'https://sheetsu.com/column/value');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should throw error when no column param', function() {
//       return sheetsu.delete().then(function(data){
//         assert.fail('sheetsu do not throw error');
//       }, function(err) {
//         assert.equal(err, 'no column name');
//       });
//     });
//
//     it('should return url different Sheet', function() {
//       return sheetsu.delete('column', 'test', 'Sheet2').then(function(data){
//         assert.equal(data.url, 'https://sheetsu.com/sheets/Sheet2/column/test');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//   });
// });
