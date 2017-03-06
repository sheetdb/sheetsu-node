// var sheetsuAPI = require('../');
// var assert = require('assert');
// var MockXMLHttpRequest  =  require('mock-xmlhttprequest');
// global.XMLHttpRequest = MockXMLHttpRequest;
//
// describe('sheetsu', function() {
//   describe('create function run without security token', function() {
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
//     it('should run with POST method', function() {
//       return sheetsu.create({}).then(function(data) {
//         assert.equal(data.method, 'POST');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should run with object data', function() {
//       return sheetsu.create({some: 5}).then(function(data){
//         assert.equal(data.body, '{"some":5}');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should run with array data', function() {
//       return sheetsu.create([{}, {test: 3}]).then(function(data){
//         assert.equal(data.body, '{"rows":[{},{"test":3}]}');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should return correct url', function() {
//       return sheetsu.create().then(function(data){
//         assert.equal(data.url, 'https://sheetsu.com');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//     it('should return url different Sheet', function() {
//       return sheetsu.create(undefined, 'Sheet2').then(function(data){
//         assert.equal(data.url, 'https://sheetsu.com/sheets/Sheet2');
//       }, function(err) {
//         assert.fail('sheetsu throw error');
//       });
//     });
//
//   });
// });
