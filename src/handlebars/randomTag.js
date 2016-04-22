var getArticle = require('indefinite-article');
var randomItem = require('../util/randomItem.js');
var upperCaseFirst = require('../util/upperCaseFirst.js');
var singularVerb = require('../util/singularVerb.js');

module.exports = function(data, options) {

  var item = randomItem(data);

  if(options && options.hash) {

    if(options.hash.article) {
      if(item == '') { return 'a'; }
      item = getArticle(item) + ' ' + item;
    }

    if(options.hash.singular) {
      item = singularVerb(item);
    }

    if(options.hash.capital) {
      item = upperCaseFirst(item);
    }

    if(options.hash.skip) {
      if(Math.random() * 100 > options.hash.skip) {
        return '';
      }
    }
  }

  return item;
};