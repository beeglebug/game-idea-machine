var log = require('../util/log.js');

module.exports = function(twitter, tweet, message) {

  var status = '@' + tweet.user.screen_name + ' ' + message;

  twitter.post('statuses/update', {
    status: status,
    in_reply_to_status_id : tweet.id_str
  }, function(err, reply) {
    if(err) { log(err); }
    else { log('reply sent to ' + tweet.user.screen_name); }
  });
};