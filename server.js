var giphy = require('giphy-api')();
var express = require('express');
var app = express();
var gm = require('gm');
var request = require('request');
var async = require('async');


var imageMagick = gm.subClass({
		imageMagick: true
	});
var fs = require('fs');
var http = require('http');

giphy.search({
	api: 'stickers',
	q: 'funny'
}).then(function (res) {
	//var response = JSON.parse(res);
	res.data.forEach(function (gif) {
		var imgUrl = gif.images.fixed_height.url;
		console.log(gif.id);
		imageMagick(request(imgUrl))
		.coalesce()
		.montage().geometry(200,200).background('none').tile(5)
		.write(gif.id + '-spritesheet.png', function(err){
			if(err) throw err;
			console.log('done');
		});
	});
	//console.log(parsed);
});

app.get('/stickers', function (req, res) {
	console.log('req');

});

var server = app.listen(3000, function () {
		console.log('Server listening on localhost:3000');
	});
