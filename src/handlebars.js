var handlebars = require('handlebars');

handlebars.registerHelper('$', require('./handlebars/randomTag.js'));
handlebars.registerHelper('$x2', require('./handlebars/randomTagX2.js'));
handlebars.registerHelper('$x3', require('./handlebars/randomTagX3.js'));

module.exports = handlebars;