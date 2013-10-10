/**
 * twitter bot
 * cron : 0 0,6,12,18 * * * node /home/udlr/main.js tweet
 */
var Twit = require('twit');
var fs  = require("fs");
var IdeaMachine = require('./IdeaMachine.js');

var Twitter = new Twit({
	consumer_key: '65FCELLR6C4aC4X6SeXCeA',
	consumer_secret: '1bolDWqibvaRBme6LcQDovpu9tovDwy2EOtAWXm6k',
	access_token: '1927106185-UdNmx2XJe29FsolQCVP7E7lQuGfr6kvUvGqax5e',
	access_token_secret: 'SaLEULFiKdMYvxk1MgQwJOZEDGDp5hQOvjHcZl7EX8'
});

// debug override
// Twitter.post = function(url, data, callback) { console.log(data.status); callback(); }

var queue, count = 1, type = null;

if(process.argv[2] === 'gen') {

	if(process.argv[3]) {
		count = parseInt(process.argv[3]);
	}

	if(process.argv[4]) {
		type = 	process.argv[4];
	}

	while(count--) {
		console.log( generateSafe(type) );
	}

} else if (process.argv[2] === 'tweet') {

	tweet();

}

function generateSafe(type) {

	var status = IdeaMachine(type);

	if(status.length > 140) {
		status = generateSafe(type);
	}

	return status;
}

function tweet() {

	var file = './queue.txt';

	fs.readFile(file, function(err, contents) {

		var queue = contents.toString().split('\n');
		var status = queue.shift();

		if(!status) {
			status = generateSafe();
		}

		Twitter.post('statuses/update', { status: status }, function(err, reply) {
			if(!err) {
				fs.writeFile(file, queue.join('\n'), function (err) {
					// error handling?
				});
			}
		});
	});
}
