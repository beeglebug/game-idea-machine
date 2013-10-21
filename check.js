#!/usr/bin/env node

var data = require('./data.js');

console.log('checking for duplicates');

for(type in data) {
	for(set in data[type]) {
		if(set == 'templates') { continue; }
		var dupes = findDuplicates(data[type][set]);
		if(dupes.length) {
			console.log(type, ' -> ', set, ' -> ',  dupes);
		}
	}
}


function findDuplicates(arr) {
  var len=arr.length,
      out=[],
      counts={};

  for (var i=0;i<len;i++) {
    var item = arr[i];
    var count = counts[item];
    counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
  }

  for (var item in counts) {
    if(counts[item] > 1)
      out.push(item);
  }

  return out;
}