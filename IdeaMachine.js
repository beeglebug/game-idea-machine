var Handlebars = require('handlebars');
var getArticle = require('indefinite-article');
var data = require('./data.js');


// random tag
Handlebars.registerHelper('$', function(data, options) {

	var item = random(data);

	if(options && options.hash) {
		if(options.hash.article) {
			item = getArticle(item) + ' ' + item;
		}
		if(options.hash.singular) {
			item = single(item);
		}
	}

	return item;
});

function single(phrase) {

	var word = /\w+/.exec(phrase)[0];

	if(word === 'are') {
		phrase = phrase.replace('are', 'is');
	} else {
		phrase = phrase.replace(word, word + 's' );
	}

	return phrase;
}

// random array element
function random(arr) {
	if(!arr.length) {
		arr = Object.keys(arr);
	}
	return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = function(type) {

	if(!type || !data[type]) {
		type = random(data);
	}

	var templates = data[type].templates;
	var template = random(templates);

	return Handlebars.compile(template)(data).trim();

};
