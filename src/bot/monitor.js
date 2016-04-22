var log = require('../util/log.js');
var reply = require('./reply.js');
var generateSafe = require('../generation/generateSafe.js');

/**
 * watch the gameideamachine user stream
 * look for tweets aimed at the bot
 */
module.exports = function(twitter, data, compiler) {

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

    var command = message.replace('@gameideamachine','').trim().toLowerCase().split(' ')[0],
      idea;

    if(command === 'idea') {
      idea = generateSafe(null, tweet.user.screen_name, data, compiler);
      reply(twitter, tweet, idea);
    } else if(data[command]) {
      idea = generateSafe(command, tweet.user.screen_name, data, compiler);
      reply(twitter, tweet, idea);
    } else {
      log('unknown command ' + String(command) );
    }
  });
};