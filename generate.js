#!/usr/bin/env node

var generator = require('./src/generator.js');
var argv = require('yargs')
  .default('type', 'idea')
  .default('count', 1)
  .argv;

var idea;

while(argv.count--) {
  idea = generator.generate(argv.type);
  console.log(idea);
}