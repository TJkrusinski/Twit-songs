var mongo = require('mongojs').connect('twitter', ['looks'])

var twitter = {
	saveLook: function(array){
		mongo.looks.update({counts:count}, {$push:{looks:array}}, {upsert:true}, function(){});
	}
}


exports.twitter = twitter;