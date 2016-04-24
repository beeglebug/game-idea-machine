var log = require('./src/util/log.js');
var generator = require('./src/generator.js');
var Twit = require('twit');
var secrets = require('./secrets.js');

var twitter = new Twit(secrets);
var stream = twitter.stream('user', { with : 'user' });
var account = 'gameideamachine';

stream.on('tweet', function (tweet) {

  var handle = tweet.user.screen_name;

  // ignore own tweets
  if(handle == account) {
    return;
  }

  log('tweet received from ' + handle);
  var message = tweet.text;

  // ignore everything other than "@gameidemachine command" (for now)
  if(message.indexOf('@' + account) !== 0) {
    log('not aimed at me');
    return;
  }

  var command = message
    .replace('@' + account,'')
    .trim()
    .toLowerCase()
    .split(' ')[0];

  if(command !== 'idea' && !data[command]) {
    log('unknown command ' + String(command));
    return;
  }

  var idea = generator.generateSafe(command, handle);
  var status = '@' + handle + ' ' + idea;

  twitter.post('statuses/update', {
      status: status,
      in_reply_to_status_id : tweet.id_str
    }, function(err, reply) {
      if(err) {
        log(err);
      } else {
        log('reply sent to ' + handle);
      }
    });
});