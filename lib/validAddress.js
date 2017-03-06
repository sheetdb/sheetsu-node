module.exports = function(address) {
  var pattern = new RegExp("^https:\/\/sheetsu.com");
  var res = pattern.test(address);

  return res || address.indexOf('http') === -1 ;
}
