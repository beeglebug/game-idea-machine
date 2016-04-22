var randomItem = require('../util/randomItem.js');

/**
 * Get three unique random tags joined with a comma and 'and'
 * @param data
 * @returns {string}
 */
module.exports = function(data) {

  var item1, item2, item3;

  item1 = randomItem(data);
  item2 = randomItem(data);
  item3 = randomItem(data);

  while(item2 == item1) {
    item2 = randomItem(data);
  }

  while(item3 == item1 || item3 == item2) {
    item3 = randomItem(data);
  }

  return item1 + ', ' + item2 + ' and ' + item3;
};