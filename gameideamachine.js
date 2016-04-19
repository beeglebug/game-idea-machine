#!/usr/bin/env node

/**
 * Game Idea Machine
 * a twitter bot which tweets random game ideas
 * this file is the wrapper around the generator, and handles all the twitter related stuff
 */
var Twit = require('twit');
var fs  = require('fs');
var path = require('path');
var util = require('util');
var generator = require('./generator.js');
var requireDirectory = require('require-directory');
var data = requireDirectory(module, './data');


handleArguments();

/**
 * decide what to do based on what commands were passed in
 */
function handleArguments() {

	var count = 1,
		type = null,
    secrets, twitter;

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
				console.log( generator.generateSafe(type) );
			}

			break;

		// send a tweet
		case 'tweet':
      secrets = require('./secrets.js');
      twitter = new Twit(secrets);
			tweet(twitter);
			break;

		// listen for commands
		case 'monitor':
      secrets = require('./secrets.js');
      twitter = new Twit(secrets);
			monitor(twitter);
			break;

	}
}

/**
 * watch the gameideamachine user stream
 * look for tweets at it
 */
function monitor(twitter) {

	var stream = twitter.stream('user', { with:'user'});

	stream.on('tweet', function (tweet) {

		// ignore own tweets
		if(tweet.user.screen_name == 'gameideamachine') { return; }

		var message = tweet.text;
		util.log('tweet received from ' + tweet.user.screen_name);

		// ignore everything other than "@gameidemachine command" (for now)
		if(message.indexOf('@gameideamachine') !== 0) {
			util.log('not aimed at me'); 
			return;
		}

		var command = message.replace('@gameideamachine','').trim().toLowerCase().split(' ')[0];

		if(command === 'idea') {
			reply(twitter, tweet, generator.generateSafe(null, tweet.user.screen_name));
		} else if(data[command]) {
			reply(twitter, tweet, generator.generateSafe(command, tweet.user.screen_name));
		} else {
			util.log('unknown command ' + String(command) );
			return;
		}

	});
}

function reply(twitter, tweet, message) {

	var status = '@' + tweet.user.screen_name + ' ' + message;

	twitter.post('statuses/update', {
		status: status,
		in_reply_to_status_id : tweet.id_str
	}, function(err, reply) {
		if(err) { util.log(err); }
		else { util.log('reply sent to ' + tweet.user.screen_name); }
	});
}

function tweet(twitter) {

	var file = path.resolve(__dirname, 'queue.txt');

	fs.readFile(file, function(err, contents) {

		var queue = contents.toString().split('\n');
		var status = queue.shift();

		if(!status) {
			status = generator.generateSafe();
		}

		twitter.post('statuses/update', { status: status }, function(err, reply) {

			// drop any empty elements
			queue = queue.filter(function(e){ return e; });

			// add a replacement to the queue
			queue.push(generator.generateSafe());

			fs.writeFile(file, queue.join('\n'), function (err) { });

			if(err) { util.log(err); }
			else { util.log('scheduled tweet sent'); }

		});
	});
}
