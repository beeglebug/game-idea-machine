/**
 * game idea machine
 * a twitter bot which tweets random game ideas
 */
var Twit = require('twit');
var fs  = require('fs');
var path = require('path');
var IdeaMachine = require('./IdeaMachine.js');

var Twitter = new Twit({
	consumer_key: '65FCELLR6C4aC4X6SeXCeA',
	consumer_secret: '1bolDWqibvaRBme6LcQDovpu9tovDwy2EOtAWXm6k',
	access_token: '1927106185-UdNmx2XJe29FsolQCVP7E7lQuGfr6kvUvGqax5e',
	access_token_secret: 'SaLEULFiKdMYvxk1MgQwJOZEDGDp5hQOvjHcZl7EX8'
});

handleArguments();

function handleArguments() {

	var count = 1,
		type = null;

	switch(process.argv[2]) {

		// generate some stuff
		case 'gen' :

			// how many?
			if(process.argv[3]) {
				count = parseInt(process.argv[3]);
			}

			// specific type?
			if(process.argv[4]) {
				type = 	process.argv[4];
			}

			// spit them out
			while(count--) {
				console.log( IdeaMachine.generateSafe(type) );
			}

			break;

		// send a tweet
		case 'tweet':

			tweet();
			break;

		// calculate possibilities
		case 'count':

			IdeaMachine.count();
			break;

		// listen for commands
		case 'monitor':

			monitor();
			break;

	}
}

var commands = {

	status : function(tweet) {

		reply(tweet, 'ok');

	},

	idea : function(tweet) {
		reply(tweet, IdeaMachine.generateSafe(null, tweet.user.screen_name));
	}

};

function monitor() {

	var stream = Twitter.stream('user');

	stream.on('tweet', function (tweet) {

		var message = tweet.text;
		var command = message.replace('@gameideamachine','').trim();

		if(!commands[command]) { return; }

		commands[command](tweet);

	});

}

function reply(tweet, message) {

	var status = '@' + tweet.user.screen_name + ' ' + message;

	Twitter.post('statuses/update', { status: status, in_reply_to_status_id : tweet.id_str }, function(err, reply) {	});

}

function tweet() {

	var file = path.resolve(__dirname, 'queue.txt');

	fs.readFile(file, function(err, contents) {

		var queue = contents.toString().split('\n');
		var status = queue.shift();

		if(!status) {
			status = IdeaMachine.generateSafe();
		}

		Twitter.post('statuses/update', { status: status }, function(err, reply) {
			if(err) { return; }

			// drop the empty last element
			queue.pop();

			// add a replacement to the queue
			queue.push(IdeaMachine.generateSafe());

			fs.writeFile(file, queue.join('\n'), function (err) { });
		});
	});
}
