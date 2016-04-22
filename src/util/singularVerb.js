/**
 * convert a word (or first word of a phrase) into singular verb form
 */
module.exports = function(phrase) {

  var word = /\w+/.exec(phrase)[0];

  if(word === 'are') {
    phrase = phrase.replace('are', 'is');
  } else if (word.slice(-1) === 'y') {
    phrase = phrase.replace(word, word.slice(0,-1) + 'ies');
  } else {
    phrase = phrase.replace(word, word + 's' );
  }

  return phrase;
};