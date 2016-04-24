var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;

var generator = require('../src/generator.js');

describe('generator', function() {

  it('should generate ideas', function () {
    var idea = generator.generate();
    expect(idea).to.be.string;
  });

  it('should generate tweetable ideas', function () {
    var idea = generator.generateSafe('some_twitter_handle');
    expect(idea).to.be.string;
    expect(idea).to.have.length.below(141);
  });

});