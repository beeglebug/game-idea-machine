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
			item = single(item);
		}
	}

	return item;
});

function single(phrase) {

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

// random array element
function random(arr) {

	if(!arr.length) {
		arr = Object.keys(arr);
	}
	return arr[Math.floor(Math.random() * arr.length)];
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {

	generate : function(type) {

		var templates = [];

		if(!type || !data[type]) {
			templates = data[random(data)].templates;
		} else {
			templates = data[type].templates;
		}

		var template = random(templates);

		return capitaliseFirstLetter( Handlebars.compile(template)(data).trim() );

	},

	generateSafe : function(type, prefix) {

		var status = this.generate(type);

		// @user and space afterwards
		var len = prefix.length + 2;

		while(status.length > 140 - len) {
			status = this.generate(type);
		}

		return status;
	},

	count : function() {

		console.log( Object.keys(data).length + ' types' );
		console.log( allTemplates.length + ' templates' );

		var grandTotal = 0;

		allTemplates.forEach(function(template) {
			var tags = template.match(/{{.+?}}/g);
			tags = tags.map(function(text){
				return text.replace('{{$','').replace('{{#','').replace('{{/','').replace('}}','').replace('article=true','').replace('singular=true','').trim();
			});
			tags.pop();
			var scope = tags.shift().replace('with ','');
			var total = data[scope][tags.shift()].length;
			tags.forEach(function(tag){
				var options = data[scope][tag].length;
				total *= options;
			});
			grandTotal += total;
		});

		console.log(grandTotal + ' possibilities');
		console.log( Math.floor(grandTotal / 6 / 365) + ' years worth at 6 per day');

	}

};
