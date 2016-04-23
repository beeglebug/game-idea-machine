#!/usr/bin/env node

var log = require('./src/util/log.js');
var generateSafe = require('./src/generation/generateSafe.js');
var handlebars = require('./src/handlebars.js');
var data = require('require-directory')(module, './data');
var Twit = require('twit');
var secrets = require('./secrets.js');

var twitter = new Twit(secrets);
var idea = generateSafe(null, null, data, handlebars);

twitter.post('statuses/update', { status: idea }, function(err) {
  if(err) {
    log(err);
  } else {
    log('scheduled tweet sent');
  }
});