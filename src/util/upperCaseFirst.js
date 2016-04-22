/**
 * capitalise the first letter of a string
 */
module.exports = function(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
};