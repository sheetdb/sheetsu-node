module.exports = function(address) {
  var pattern = new RegExp("^https:\/\/");
  var res = pattern.test(address);

  return res;
}
