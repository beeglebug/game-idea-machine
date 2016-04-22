var randomItem = require('../util/randomItem.js');

/**
 * Get two unique random tags joined with 'and'
 * @param data
 * @returns {string}
 */
module.exports = function(data) {

  var item1, item2;

  item1 = randomItem(data);
  item2 = randomItem(data);

  while(item2 == item1) {
    item2 = randomItem(data);
  }

  return item1 + ' and ' + item2;
};