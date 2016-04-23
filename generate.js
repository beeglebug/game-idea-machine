#!/usr/bin/env node

var generateSafe = require('./src/generation/generateSafe.js');
var handlebars = require('./src/handlebars.js');
var data = require('require-directory')(module, './data');
var argv = require('yargs')
  .default('type', 'idea')
  .default('count', 1)
  .argv;

var idea;

while(argv.count--) {
  idea = generateSafe(argv.type, null, data, handlebars);
  console.log(idea);
}