var upperCaseFirst = require('./util/upperCaseFirst.js');
var randomItem = require('./util/randomItem.js');
var handlebars = require('./handlebars.js');
var requireDirectory = require('require-directory');

module.exports = {

  templates : requireDirectory(module, '../templates'),

  data : requireDirectory(module, '../data'),

  compiler : handlebars,

  generate : function(type) {

    if (!type || !this.templates[type]) {
      type = randomItem(this.templates);
    }

    var templates = this.templates[type];
    var template = randomItem(templates);

    var compiled = this.compiler.compile(template);
    var rendered = compiled(this.data);

    // get rid of multiple, leading and trailing spaces
    rendered = rendered.replace(/ +(?= )/g, '').trim();

    return upperCaseFirst(rendered);
  },

  generateSafe: function(type, prefix) {

    var status = this.generate(type);

    var len = 0;
    if(prefix) {
      // @user and a space afterwards
      len = prefix.length + 2;
    }

    while(status.length > 140 - len) {
      status = this.generate(type);
    }

    return status;
  }
};