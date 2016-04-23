var upperCaseFirst = require('../util/upperCaseFirst.js');
var randomItem = require('../util/randomItem.js');

/**
 * generate a random game idea
 */
module.exports = function(type, data, compiler) {

  if(!type || !data[type]) {
    type = randomItem(data);
  }

  var templates = data[type].templates;
  var template = randomItem(templates);
  var compiled = compiler.compile(template);
  var rendered = compiled(data);

  // get rid of multiple, leading and trailing spaces
  rendered = rendered.replace(/ +(?= )/g,'').trim();

  return upperCaseFirst(rendered);
};