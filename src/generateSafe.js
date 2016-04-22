var generate = require('./generate.js');

/**
 * generate a twitter safe idea (<140 chars)
 * can be passed a prefix (usually a handle for replies)
 * and it takes that into account
 */
module.exports = function(type, prefix, data, compiler) {

  var status = generate(type, data, compiler);

  // @user and space afterwards
  var len = 0;
  if(prefix) { len = prefix.length + 2; }

  while(status.length > 140 - len) {
    status = generate(type, data, compiler);
  }

  return status;
};