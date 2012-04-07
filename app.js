var express = require('express'),
		app = express.createServer(),
		io = require('socket.io').listen(app),
		funcs = require('./twitter.js').twitter,
		Twitter = require('twitter');




app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {layout: false});
	app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.cookieParser());
	  app.use(app.router);
	  app.use(express.static(__dirname + '/public'));
	  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));	
});

app.listen(3000);

var twitInfo = {
	consumer_key: 'Fi5w9fJxwsY1y1fO9MCAUQ',
	consumer_secret: 'Sd81fBAMEMLX1hZGn5Suam61UGykXoPcDsSv1kYwkv4',
	access_token_key: '31461058-YsMwD7MOQybspzQky6lNI7dC4QyIiTrUgU7TzyEz6',
	access_token_secret: '6cAeMe88CQF6g8D59RIbGHrEr8crYVXuxgxVfyhjU'
};

var twit = new Twitter(twitInfo);
/*
twit.stream('statuses/filter', {track:['#obama']}, function(stream) {
	stream.on('data', function (data) {
		console.log(data.text);
	});
});
*/
app.get('/twitter?', function (req, res) {
	res.render('twitter', {
		
	});
});

app.get('/', function(req, res){
	res.redirect('/twitter');
});

io.sockets.on('connection', function (socket) {
	
	var listen = function(socket){
		socket.twitter.on('data', function(data){
			socket.emit('status', data);
		})
	}
	
	socket.on('track', function(status){
		funcs.saveLook(status);
		socket.twitter = new Twitter(twitInfo);
		socket.twitter.stream('statuses/filter', {track:status}, function(stream){
			socket.twitter = stream;
		})
		listen(socket);
	});
	
	socket.on('stop', function(status){
		socket.twitter.destroy();
	})
	
	socket.on('disconnect', function(){
		
	});
	
});




