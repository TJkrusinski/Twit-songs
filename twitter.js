var mongo = require('mongojs').connect('twitter', ['looks']),
		email = require("mailer");

var twitter = {
	saveLook: function(array){
	//	mongo.looks.update({counts:count}, {$push:{looks:array}}, {upsert:true}, function(){});
	},
	
	sendEmail: function(array){
		email.send({
		    ssl: true,
		    host : "smtp.gmail.com",
		    port : 465,
		    domain : "[127.0.0.1]",            
		    to : "tjkrus@gmail.com",
		    from : "tjkrus@gmail.com",
		    subject : "twit songs search",
		    reply_to:"tjkrus@gmail.com",
		   	html: JSON.stringify(array),
		    authentication : "login",
		    username : 'tjkrus@gmail.com',
		    password : 'ilovedogs1',
		  },
		  function(err, result){
		    if(err){ console.log(err); }
		  });
	}
}


exports.twitter = twitter;