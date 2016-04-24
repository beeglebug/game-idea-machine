#!/usr/bin/env node

var log = require('./src/util/log.js');
var generator = require('./src/generator.js');
var Twit = require('twit');
var secrets = require('./secrets.js');

var twitter = new Twit(secrets);
var idea = generator.generateSafe();

twitter.post('statuses/update', { status: idea }, function(err) {
  if(err) {
    log(err);
  } else {
    log('scheduled tweet sent');
  }
});