var log = require('../util/log.js');

module.exports = function(twitter) {

  var status = generator.generateSafe();

  twitter.post('statuses/update', { status: status }, function(err) {
    if(err) { log(err); }
    else { log('scheduled tweet sent'); }
  });
};