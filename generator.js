var Handlebars = require('handlebars');
var getArticle = require('indefinite-article');
var data = require('./data.js');

var allTemplates = [];
for(type in data) {
	allTemplates = allTemplates.concat(data[type].templates);
}

// random tag
Handlebars.registerHelper('$', function(data, options) {

	var item = random(data);

	if(options && options.hash) {
		if(options.hash.article) {
			item = getArticle(item) + ' ' + item;
		}
		if(options.hash.singular) {
			item = singularVerb(item);
		}
		if(options.hash.capital) {
			item = capitaliseFirstLetter(item);
		}
	}

	return item;
});


/**
 * convert a word (or first word of a phrase) into singular verb form
 */
function singularVerb(phrase) {

	var word = /\w+/.exec(phrase)[0];

	if(word === 'are') {
		phrase = phrase.replace('are', 'is');
	} else if (word.slice(-1) === 'y') {
		phrase = phrase.replace(word, word.slice(0,-1) + 'ies');
	} else {
		phrase = phrase.replace(word, word + 's' );
	}

	return phrase;
}


/**
 * return a random element from an array
 * or random key from an object
 */
function random(arr) {

	if(!arr.length) {
		arr = Object.keys(arr);
	}
	return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * capitalise the first letter of a string
 */
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {

	/**
	 * generate a random game idea
	 */
	generate : function(type) {

		if(!type || !data[type]) {
			type = random(data);
		}

		var templates = data[type].templates;
		var template = random(templates);
		var compiled = Handlebars.compile(template);
		var rendered = compiled(data);

		// get rid of multiple, leading and trailing spaces
		rendered = rendered.replace(/ +(?= )/g,'').trim();

		return capitaliseFirstLetter( rendered );
	},

	/**
	 * generate a twitter safe idea (<140 chars)
	 * can be passed a prefix (usualy a name, for replies)
	 * and it takes that into account
	 */
	generateSafe : function(type, prefix) {

		var status = this.generate(type);

		// @user and space afterwards
		var len = 0;
		if(prefix) { len = prefix.length + 2; }

		while(status.length > 140 - len) {
			status = this.generate(type);
		}

		return status;
	}
};
