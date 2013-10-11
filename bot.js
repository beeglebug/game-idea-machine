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

	// generate some stuff
	if(process.argv[2] === 'gen') {

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
			console.log( generateSafe(type) );
		}

	// send a tweet
	} else if (process.argv[2] === 'tweet') {

		tweet();

	// calculate possibilities
	} else if (process.argv[2] === 'count') {

		IdeaMachine.count();

	}
}


function generateSafe(type) {

	var status = IdeaMachine.generate(type);

	if(status.length > 140) {
		status = generateSafe(type);
	}

	return status;
}

function tweet() {

	var file = path.resolve(__dirname, 'queue.txt');

	fs.readFile(file, function(err, contents) {

		var queue = contents.toString().split('\n');
		var status = queue.shift();

		if(!status) {
			status = generateSafe();
		}

		Twitter.post('statuses/update', { status: status }, function(err, reply) {
			if(err) { return; }

			// drop the empty last element
			queue.pop();

			// add a replacement to the queue
			queue.push(generateSafe());

			fs.writeFile(file, queue.join('\n'), function (err) { });
		});
	});
}
