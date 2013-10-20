'use strict';

var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	Twitter = require('twitter');

app.set('views', __dirname+'/views');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

server.listen(3000);

var twitInfo = {
	consumer_key: 'Fi5w9fJxwsY1y1fO9MCAUQ',
	consumer_secret: 'Sd81fBAMEMLX1hZGn5Suam61UGykXoPcDsSv1kYwkv4',
	access_token_key: '31461058-YsMwD7MOQybspzQky6lNI7dC4QyIiTrUgU7TzyEz6',
	access_token_secret: '6cAeMe88CQF6g8D59RIbGHrEr8crYVXuxgxVfyhjU'
};

app.get('*', function (req, res) {
	res.render('twitter');
});

io.set('log level', 0);

io.sockets.on('connection', function (socket) {
	var twitter = new Twitter(twitInfo);
	
	socket.on('track', function(status){
		twitter.stream('statuses/filter', {track:status}, function(stream){
			stream.on('data', function(data){
				socket.emit('status', data);
			});
		});
	});
	
	socket.on('stop', function(status){
		twitter.destroy();
	});
});
