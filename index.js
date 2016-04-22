#!/usr/bin/env node

var handlebars = require('handlebars');
var requireDirectory = require('require-directory');
var generateSafe = require('./src/generateSafe.js');
var Twit = require('twit');
var secrets = require('./secrets.js');
var tweet = require('./src/bot/tweet.js');
var monitor = require('./src/bot/monitor.js');

handlebars.registerHelper('$', require('./src/handlebars/randomTag.js'));
handlebars.registerHelper('$x2', require('./src/handlebars/randomTagX2.js'));
handlebars.registerHelper('$x3', require('./src/handlebars/randomTagX3.js'));

var count = 1,
  type = null,
  twitter,
  data = requireDirectory(module, './data');

switch(process.argv[2]) {

  // generate some stuff
  case 'generate' :

    // how many?
    if(process.argv[3]) {
      count = parseInt(process.argv[3]);
    }

    // specific type?
    if(process.argv[4]) {
      type = process.argv[4];
    }

    // spit them out to the console
    while(count--) {
      var idea = generateSafe(type, null, data, handlebars);
      console.log(idea);
    }

    break;

  // send a tweet
  case 'tweet':
    twitter = new Twit(secrets);
    tweet(twitter);
    break;

  // listen for commands
  case 'monitor':
    twitter = new Twit(secrets);
    monitor(twitter);
    break;
}