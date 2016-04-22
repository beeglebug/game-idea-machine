/**
 * return a random element from an array
 * or random key from an object
 */
module.exports = function(arr) {

  if(!arr) { return false; }

  if(!arr.length) {
    arr = Object.keys(arr);
  }

  return arr[Math.floor(Math.random() * arr.length)];
};