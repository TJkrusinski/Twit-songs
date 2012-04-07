alert = function(msg){
	$("#alert").text(msg);
	$("#subs").focus();
}


$(function(){
	var socket = io.connect('/')
	
	setTimeout(function(){
		$("#info").fadeIn(400);
		$(".twit").animate({
			top: '4em'
		},300);
		$(".songs").animate({
			top:'9em'
		},400);
	},00)
	
	
	var twit = {
		start: function(){
			if($("#subs").val() == ''){
				alert('Please enter something more interesting!')
			} else {
				alert('Getting tweets');
				var subs = $("#subs").val().split(' ');
				socket.emit('track', subs);
				$(".twit").animate({
					top: '2em',
					left: '15%'
				},500);
				$(".songs").animate({
					top: '3em',
					left: '40%'
				},400);
				$("#info").animate({
					'padding-top':'15em'
				},700);
			}
		},
		
		addStatus: function(status){
			console.log(status);
			var html = "<div class='tweet' style='opacity:0'>";
			html+= "<a href='http://www.twitter.com/"+status.user.screen_name+"'><img src='"+status.user.profile_image_url+"' alt='"+status.user.screen_name+"'></a>";
			html+= "<div class='tweet-inner'><h1>"+status.text+"</h1>";
			html+= "<h2>From: "+status.source+"</h2>";
			html+= "<h2>On: "+status.created_at+"</h2>";
			html+= "<h2>By: <a href='http://www.twitter.com/"+status.user.screen_name+"' target='_blank'>"+status.user.name+"</a></h2></div><div class='clear'></div></div>";
			$(".statuses").prepend(html);
			$(".tweet:first-child").animate({
				opacity:1
			},100);
		}
	}
	
	$("#info").submit(function(e){
		e.preventDefault();
		twit.start();
	});
	
	socket.on('status', function(status) {
		twit.addStatus(status);
	});
	
	var scrollInfo = {
		speed: 80,
		step: 1,
		current: 0,
		width: 2247,
		hwidth: parseInt(window.innerWidth,10),
	};
	scrollInfo.start = -(scrollInfo.width - scrollInfo.hwidth);
	
	var scroll = function(){
		scrollInfo.current -= scrollInfo.step;
		if (scrollInfo.current == scrollInfo.start){
			scrollInfo.current = 0;
		}
		$('.clouds').css("background-position", scrollInfo.current+"px 0");
	}

	var startScroll = setInterval(scroll, scrollInfo.speed);
	
});