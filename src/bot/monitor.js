var log = require('../util/log.js');
var generator = require('../../index.js');
var reply = require('./reply.js');

/**
 * watch the gameideamachine user stream
 * look for tweets at it
 */
module.exports = function(twitter) {

  var stream = twitter.stream('user', { with : 'user' });

  stream.on('tweet', function (tweet) {

    // ignore own tweets
    if(tweet.user.screen_name == 'gameideamachine') { return; }

    var message = tweet.text;
    log('tweet received from ' + tweet.user.screen_name);

    // ignore everything other than "@gameidemachine command" (for now)
    if(message.indexOf('@gameideamachine') !== 0) {
      log('not aimed at me');
      return;
    }

    var command = message.replace('@gameideamachine','').trim().toLowerCase().split(' ')[0];

    if(command === 'idea') {
      reply(twitter, tweet, generator.generateSafe(null, tweet.user.screen_name));
    } else if(data[command]) {
      reply(twitter, tweet, generator.generateSafe(command, tweet.user.screen_name));
    } else {
      log('unknown command ' + String(command) );
      return;
    }
  });
};