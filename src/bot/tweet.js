var log = require('../util/log.js');

module.exports = function(twitter, data, compiler) {

  var idea = generateSafe(null, null, data, compiler);

  twitter.post('statuses/update', { status: idea }, function(err) {
    if(err) { log(err); }
    else { log('scheduled tweet sent'); }
  });
};