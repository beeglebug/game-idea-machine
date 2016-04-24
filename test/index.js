var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;

var generate = require('../src/generation/generate.js');
var generateSafe = require('../src/generation/generateSafe.js');
var handlebars = require('../src/handlebars.js');
var data = require('require-directory')(module, '../data');


describe('generator', function() {

  it('should generate ideas', function () {
    var idea = generate(null, data, handlebars);
    expect(idea).to.be.string;
  });

  it('should generate tweetable ideas', function () {
    var idea = generateSafe(null, 'some_twitter_handle', data, handlebars);
    expect(idea).to.be.string;
    expect(idea).to.have.length.below(141);
  });

});