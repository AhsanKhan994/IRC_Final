var Channels=["#EZZ","#yarisma","#carsaf.nl","#sohbet","#35+","#ask","#gurbet","#radyo"];
var userName=undefined;
var heIsmute=0;
	
var irc = {
	
	muted: [],
	blocked: [],
	connection: undefined,
	ignoredStatuses: ["818", "819"],

	// API

	connect: function(nick, channels, password) {
		userName=nick;
		$("#myNick").html(userName.charAt(0).toUpperCase() + userName.slice(1));
		
		if(nick.match(/@/g))
		{
			$(".kickOut").css("display","inherit");
			$(".mute").css("display","inherit");
		}
		else
		{
			$(".kickOut").css("display","none");
			$(".mute").css("display","none");
		}
		
		_this = this;
		this.nick = nick;
		this.password = password;
		if (this.connection != undefined) {
			console.log("Already connected");
			return;
		};
		this.connection = new IRC("irc.bizimdiyar.com", "6667", "TurkWeb", nick);
		$.extend(this.connection.handlers, {
			"connected": function() {
				console.log("Autojoining " + channels.join(" "));
				channels.forEach(function(item) {
					_this.connection.join(item);
				});
				//_this.onConnected(true);
			},
			
			"PRIVMSG": function(msg) {
				
				heIsmute=0;
				
				console.log(msg.source.nick + "  " + _this.muted);
				
				if (_this.muted.length>0) {
				
					for(var i=0; i<_this.muted.length;i++)
					{
						if(_this.muted[i].match(msg.source.nick))
						{
							heIsmute=1;
						}
					}
					// Do nothing
					
				}
				
				if(heIsmute==0){
					_this.onMessage(msg.source.nick, msg.target, msg.msg);
				}
			},
			"JOIN": function(msg) {
				_this.onJoin(msg.source.nick, msg.msg);
			},
			"NICK": function(msg) {
 			if (msg.source.nick == _this.currentNick) {
 					_this.onSelfNick(msg.msg);
					_this.currentNick = msg.msg;
 				} else {
 					_this.onNick(msg.source.nick, msg.msg);
 				}
 			},
			"QUIT": function(msg) {
				_this.onQuit(msg.source.nick, msg.msg);
			},
			"PART": function(msg) {
				_this.onPart(msg.source.nick, msg.target, msg.msg);
			},
			"MODE": function(msg) {
				switch(msg.args[0]) {
					case "+o":
						_this.onOp(msg.target, msg.args[1]);
						break;
					case "-o":
						_this.onDeop(msg.target, msg.args[1]);
						break;
					case "+v":
						_this.onVoice(msg.target, msg.args[1]);
						break;
					case "-v":
						_this.onDevoice(msg.target, msg.args[1]);
						break;
				}
			},
			"001": function(msg) {
				if (_this.password) {
 					_this.changeNick(_this.nick + " " + _this.password);
 				}
 				_this.onConnected(true);
 			},
			
			"311": function(msg) {
				_this.onWhois(msg.target, msg.args.join(" ") + " " + msg.msg);
			},
			"312": function(msg) {//AhsanKhan1
				//_this.onWhois(msg.target, args[0] + " " + msg.msg);
				_this.onWhois(msg.target, msg.args[0] + " " + msg.msg);
			},
			"313": function(msg) {
				_this.onWhois(msg.target, msg.msg);
			},
			"317": function(msg) {
				_this.onWhois(msg.target, args[0] + " " + msg.msg);
			},
			"319": function(msg) {
				_this.onWhois(msg.target, msg.msg);
			},
			// Channel list
 			"321": function(msg) {
 				_this.channelList = [];
 			},
 			"322": function(msg) {
 				_this.channelList.push({"channel": msg.args[0], "users_count": msg.args[1], "topic": msg.msg});
 			},
 			"323": function(msg) {
 				_this.onChannelList(_this.channelList);
 			},
			"332": function(msg) {
				_this.onTopic(msg.args[0], msg.msg);
			},
			"353": function(msg) {
				_this.onNames(msg.args[1], msg.msg.split(" "));
			},
			"432": irc.onNickChangeRequest,
 			"433": irc.onNickChangeRequest,
 			"436": irc.onNickChangeRequest,
			"482": irc.OpErr,
 			"error": function(msg) {
 				_this.onError(""+msg.command + " " + msg.args.join(" ") + " :" + msg.msg);
 			},
			"status": function(msg) {
				if (_this.ignoredStatuses.indexOf(msg.command) == -1) {
					_this.onStatus(msg.toString());
				};
			},
 			"close": _this.onSelfQuit
		});
		this.connection.connect();
	},
	
	currentNick: undefined,
 
	onNickChangeRequest: function(msg) {
 		irc.connection.nick("Guest");
		
 	},
	
	OpErr:function(msg)
	{
		alert(msg);
	},

	message: function(target, text) {
		if (text[0] == "/") {
			this.slashCommand(text.slice(1));
		} else {
			this.connection.privmsg(target, text);
		};
	},
	
	slashCommand: function(target, text) {
 		var tokens = text.split(" ");
 		var command = tokens[0].toUpperCase();
 		switch(command) {
 			case "JOIN":
 				this.joinChannel(tokens[1]);
 				break;
 			case "MSG":
 				this.message(tokens[1], tokens.slice(2).join(" "));
 				break;
 			case "NICK":
 				this.changeNick(tokens.slice(1).join(" "));
 				break;
 			case "ATTACH": // CR's nick registration.
 				this.connection.sendIrc("ATTACH" + tokens.slice(1).join(" "));
				break;
			case "KICK":
 				this.kickNickFromChannel(tokens[0], tokens[1], tokens.slice(2).join(" "));
 				break;
 			case "PART":
 				this.leaveChannel(target);
 				break;
 			case "QUIT":
 				this.quitIrc();
 				break;
 			case "WHOIS":
 				this.whoisNick(tokens[1]);
 				break;
 			case "MODE":
 				this.connection.mode(target, tokens.slice(1).join(" "));
 				break;
 		
 		}
 	},

	listChannels: function() {
 		this.connection.sendIrc("LIST");
 	},
 
 	kickNickFromChannel: function(nick, channel, reason) {
 		this.connection.kick(channel, nick, reason);
	},

	pingNick: function(nick) {
		this.connection.ping(nick);
	},

	joinChannel: function(channel) {
		this.connection.join(channel);
	},

	leaveChannel: function(channel) {
		this.connection.part(channel);
	},

	changeNick: function(newNick) {
		this.connection.nick(newNick);
	},

	banNickOnChannel: function(nick, channel) {
		this.connection.mode(channel, "+b "+nick);
	},

	whoisNick: function(nick) {
		this.connection.whois(nick);
	},

	inviteNickToChannel: function(nick, channel) {
		this.connection.invite(channel, nick);
	},
	
	quitIrc: function() {
 		this.connection.quit();
 	},
	
	opNickOnChannel(nick, channel) {
 		this.connection.mode(channel, "+o "+nick);
 	},
 
 	deopNickOnChannel(nick, channel) {
 		this.connection.mode(channel, "-o "+nick);
 	},
 
 	voiceNickOnChannel(nick, channel) {
 		this.connection.mode(channel, "+v "+nick);
 	},
 
 	devoiceNickOnChannel(nick, channel) {
 		this.connection.mode(channel, "-v "+nick);
 	},

	muteNick: function(nick) {
		this.muted.push(nick);
		
		console.log(this.muted);
		
	},

	unmuteNick: function(nick) {
		for(var i = this.muted.length-1; i >= 0; i--) {
			if(this.muted[i] === nick) {
				this.muted.splice(i, 1);
			};
		};
		console.log(this.muted);
		
	},

	blockNick: function(nick) {
		blocked.push(nick);
	},

	unblockNick: function(nick) {
 		for(var i = this.blocked.length-1; i >= 0; i--) {
 			if(this.blocked[i] === nick) {
 				this.blocked.splice(i, 1);
			};
		};
	},
	
	messageText: function(coloredText) {
 		var no_colors = coloredText.replace(/(\x03\d{0,2}(,\d{0,2})?|\u200B)/g, '');
 		var plain_text = no_colors.replace(/[\x0F\x02\x16\x1F]/g, '');
 		return plain_text;
 	},
	
	messageColors: function(coloredText) {
 
 	},

	// CALLBACKS
	onConnected: function(success) {console.log("onConnected " + success);
		irc.joinChannel(Channels);
	},
	
	onMessage: function(who, where, text) {console.log("onMessage " + who + " " + where + " " + text);
	
	//text=irc.messageText(text);//AhsanKhanNow
	
					text=text.replace(/:\)/g,'<i class="emoticon smile">:)</i>');
					text=text.replace(/:3/g,'<i class="emoticon lion">:3</i>');
					text=text.replace(/;3/g,'<i class="emoticon winky_lion">;3</i>');
					text=text.replace(/;\)/g,'<i class="emoticon wink">;)</i>');
					text=text.replace(/H:/g,'<i class="emoticon eyebrows">H:</i>');
					text=text.replace(/:\(/g,'<i class="emoticon sad">:(</i>');
					text=text.replace(/;_;/g,'<i class="emoticon cry">;_;</i>');
					text=text.replace(/<3/g,'<i class="emoticon heart">&lt;3</i>');
					text=text.replace(/;D/g,'<i class="emoticon wink_happy">;D</i>');
					text=text.replace(/:P/g,'<i class="emoticon tongue">:P</i>');
					text=text.replace(/:D/g,'<i class="emoticon happy">:D</i>');
					text=text.replace(/:S/g,'<i class="emoticon confused">:S</i>');
					text=text.replace(/xP/g,'<i class="emoticon cringe_tongue">xP</i>');
					text=text.replace(/:O/g,'<i class="emoticon shocked">:O</i>');
					
					text=text.replace(/>_</g,'<i class="emoticon doh">&gt;_&lt;</i>');
					text=text.replace(/o.0/g,'<i class="emoticon wide_eye_right">o.0</i>');
					text=text.replace(/0.o/g,'<i class="emoticon wide_eye_left">0.o</i>');
					text=text.replace(/XD/g,'<i class="emoticon big_grin">XD</i>');
					text=text.replace(/:F/g,'<i class="emoticon unsure">:\</i>');
	
	if(text!="" && where.match(/#/g))
	{
		var	channelName=where.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("#","");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
		
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();
		
		//$('#textInput').val('');
		
		var msgID=channelName+"MsgArea";
		
			
		$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#20A0B5;">&lt;'+who+'&gt;</div><div class="text" style="">'+text+'</div></div>');
		
		//$("#"+msgID+ " .messages").animate({ scrollTop: $(this).scrollHeight }, "fast");
		
		$("#"+msgID+ " .messages")[0].scrollTop=$("#"+msgID+ " .messages")[0].scrollHeight;
	}
	
	else if(text!="")//if private message
	{
		var	channelName=who.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("#","");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
		
		var nickName=channelName;
		if($("#"+nickName+"Tab").length==0)
		{
			$("#joinedChannels li").removeClass("active");
			$(".panel").css("display","none");
			$(".part.fa.fa-nonexistant").css("display","none");
			$(".memberlists div").removeClass("active");
			$("#joinedChannels li").addClass("alert_activity");
			
			$("#joinedChannels").append("<li id='"+nickName+"Tab' onclick="+"showThisPrvtTab('"+nickName+"',event)"+" class='active privateMsgTAb'><span>"+who+"</span><div class='activity'>2</div><span id='close' class='part fa fa-nonexistant'  onclick="+"closeThisTab('"+nickName+"','"+who+"')"+"></span></li>");
			
			$(".panels .panel_container.container1").append('<div id="'+nickName+'MsgArea" class="panel activeMsgWindow" style="display: block;"><div class="messages" style="width: 98%; border-right-style: none;"></div></div>');
			
			$(".close_icon1").css("opacity","0.7");
			$(".close_icon1").css("pointer-events", "none");
		}
		
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();
		
		//$('#textInput').val('');
		
		var msgID=channelName+"MsgArea";
		
			
		$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#20A0B5;">&lt;'+who+'&gt;</div><div class="text" style="">'+text+'</div></div>');
		
		//$("#"+msgID+ " .messages").animate({ scrollTop: $(this).scrollHeight }, "fast");
		
		$("#"+msgID+ " .messages")[0].scrollTop=$("#"+msgID+ " .messages")[0].scrollHeight;
	}
	
	},
	onWhois: function(who, data) {console.log("onWhois " + who + " " + data);
	
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();
		
		var nickName=$("li.nickSelected .nick .nickName").text();
		
	$(".activeMsgWindow .messages").append('<div class="msg whois  nick_416873616e"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#1a2597;">&lt;'+nickName+'&gt;</div><div class="text" style=""><span class="inline-nick" style=";cursor:pointer;"></span> '+data+' </div></div>');
	
	},
	
	onJoin: function(who, where) {console.log("onJoin " + who + " " + where);//AhsanKhan1
		
		var channelName=where.replace("#","");
		channelName=channelName.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
		channelName=channelName.replace(/(?:\r\n|\r|\n)/g, '')
		
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();
		//alert(who);
		var rightBar="";
		
			if(who.match(/@/g))
			{
				rightBar='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+who+'</span></a></li>';
				$("#"+channelName+"Persons ul").prepend(rightBar);
			}
			
			else if(who.match(/\+/g))
			{
				rightBar='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+who+'</span></a></li>';
				$("#"+channelName+"Persons ul").append(rightBar);
			}
			
			else
			{
				rightBar='<li class="mode"><a class="nick"><span class="prefix">@</span><span class="nickName">'+who+'</span></a></li>';
				$("#"+channelName+"Persons ul").append(rightBar);
			}
			
			//increase number of users after joining 1 user
			
			if($("#"+channelName+"Persons .meta")[0])
			{
				var user=$("#"+channelName+"Persons .meta").html();
				user=Number(user.replace("Users",""));
				user++;
				
				$("#"+channelName+"OnlineUsers").html(user);
				
				$("#"+channelName+"Persons .meta").html(user+" Users");
			}
		
		
		//console.log("#"+channelName+"MsgArea .messages");
		$("#"+channelName+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ '+who+' </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">has joined</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+where+'</div></div><br>');
		
	},
	
	onPart: function(who, where, message) {console.log("onPart " + who + " " + where + " " + message);
		
		//console.log("onJoin " + who + " " + where);//AhsanKhan1
		
		var channelName=where.replace("#","");
		channelName=channelName.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
		channelName=channelName.replace(/(?:\r\n|\r|\n)/g, '')
		
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();
		
		$("#"+channelName+"Persons ul li").map(function(i,d){
			
			var str=$("a .nickName",this).html();
			str=str.replace(" ","");
			
			if(str.match(who))
			{
				//decrease number of users after leaving user
				if($("#"+channelName+"Persons .meta")[0])
				{
					var user=$("#"+channelName+"Persons .meta").html();
					user=Number(user.replace("Users",""));
					user--;
					
					$("#"+channelName+"OnlineUsers").html(user);
					
					$("#"+channelName+"Persons .meta").html(user+" Users");
				}
				
				$(this).remove();
				
				if($("#"+who+"MsgArea").length!=0)
				{
					$("#"+who+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has leaved this channel [</div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;">'+where+']</div></div><br>');
				}
			}
		});
		
		
			
		
		
		//console.log("#"+channelName+"MsgArea .messages");
		$("#"+channelName+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has leaved this channel [</div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;">'+where+']</div></div><br>');
		
	},
	onQuit: function(who, message) {console.log("onQuit " + who + " " + message);
		
		var chckI=0;
		
		var id="";
		
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();
		
		$(".PersonsArea ul li").map(function(i,d){
			
			var str=$("a .nickName",this).html();
			str=str.replace(" ","");
			
			if(str.match(who))
			{
				//decrease number of users after quiting user
				
				var t=$(this).parent().parent();
					
				id=$(t).attr("id");
				
				id2=id=id.replace("Persons","");
				id+="MsgArea .messages";
					
				var user=$(".meta",t).html();
				user=Number(user.replace("Users",""));
				user--;
				$("#"+id2+"OnlineUsers").html(user);
					
				$(".meta",t).html(user+" Users");
				
				
				$(this).remove();
				
				$("#"+id).append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has quit (Connection Closed)  </div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;"></div></div><br>');
				
				if($("#"+who+"MsgArea").length!=0 && chckI==0)
				{
					chckI++;
					
					$("#"+who+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has quit (Connection Closed)  </div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;"></div></div><br>');
				}
			}
		});
		
		//console.log("#"+channelName+"MsgArea .messages");
		
	},
	
	onTopic: function(channel, topic) {console.log("onTopic " + channel + " " + topic);
	
		setTimeout(function(){
		
		var channelName=channel.replace("#","");
		channelName=channelName.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
		
		var msgID=channelName+"MsgArea";
		
		
			
		$("#"+msgID+" .messages").append('<div class="msg privmsg" style="border:2px dotted #D4A516;"><div class="time" style="color: #FFED00;font-weight: bold;font-size: 16px;">Topic</div><div class="nick" style="color:#FFFFFF;">&lt;'+channel+'&gt;</div><div class="text" style="background: #3087EC;color:#fff;">'+topic+'</div></div>');
		},1000);
	},
	
	onNick: function(old_nick, new_nick) {console.log("onNick " + old_nick + " " + new_nick);
		
		//var nickName=$(".nick").html();
		if(userName.match(old_nick)){ //check for if my name has changed
			userName=new_nick;
			$("#myNick").html(userName.charAt(0).toUpperCase() + userName.slice(1));
		}
		
		if($("#"+old_nick+"Tab").length!=0)
		{
			var d = new Date();
			var n = d.getHours();
			var m = d.getMinutes();
		
			$("#"+old_nick+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ '+old_nick+' </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">is known as</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+new_nick+'</div></div><br>' + '<div class="time" style="border: 2px dotted #B30000;font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">Due to change of his name you cannot send him message from this window.Kindly close this window.Thanks</div>');
		}
		
		$(".nickName").map(function(i,d){
			
			var str=$(this).html();
			str=str.replace(" ","");
			
			if(str.match(old_nick))
			{
				$(this).html(new_nick);
				
				var id=$(this).closest(".PersonsArea").attr("id");
				id=id.replace("Persons","");
				
				var d = new Date();
				var n = d.getHours();
				var m = d.getMinutes();
				
				$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ '+old_nick+' </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">is known as</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+new_nick+'</div></div><br>');
				
			}
		});
	},
	
	onSelfNick: function(new_nick) {console.log("onSelfNick " + new_nick);},
 	onSelfQuit: function() {console.log("onSelfQuit"); window.location=".";},
 	onError: function(message) {console.log("onError " + message);},
 	onStatus: function(message) {console.log("onStatus " + message);},
 	onChannelList: function(channels) {console.log("onChannelList"); console.log(channels);},
	
	onNames: function(channel, names) {//joinChannelsConfirmed
		
		var rightBar1="",rightBar2="",rightBar3="";
		
		var channelName=channel.replace("#","");
		channelName=channelName.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
		
		names=names.sort();
		
		names+='';
		var names1 = names.split(',');
		
		if($("#"+channelName+"Tab").length==0)
		{
		
			$("#loading-Bar").css("display","none");
			$("#kiwi").css("display","inherit");
			
			console.log("AkNames: "+ names);
			$("#joinedChannels li").removeClass("active");
			$(".panel").css("display","none");
			$(".part.fa.fa-nonexistant").css("display","none");
			$(".memberlists div").removeClass("active");
			$("#joinedChannels li").addClass("alert_activity")
			
			$("#joinedChannels").append("<li id='"+channelName+"Tab' onclick="+"showThisTab('"+channelName+"',event)"+" class='active'><span>"+ channel+"</span><span id='"+channelName+"OnlineUsers' class='numOfClients' style='background:rgba(9, 191, 57, 0.75);border-radius: 1;color: #fff;border: 1px solid #DAEBF6;padding-right: 4px;padding-left: 4px;margin-right: -2px;position: relative;left: 0px;height: 18px;'>"+names1.length+"</span><div class='activity'>2</div><span id='close' class='part fa fa-nonexistant'  onclick="+"closeThisTab('"+channelName+"','"+channel+"')"+"></span></li>");
			
			$(".panels .panel_container.container1").append('<div id="'+channelName+'MsgArea" class="panel activeMsgWindow" style="display: block;"><div class="messages" style="width: 79.9%; border-right-style: none;"></div></div>');
			
			rightBar1='<div id="'+channelName+'Persons" class="active PersonsArea"><div class="activeChannel">'+channel+'</div><div class="meta">'+names1.length+' Users</div><ul>';
			
			for(var i=0;i<names1.length;i++)
			{
				if(names1[i].match(/@/g))
				{
					rightBar1+='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i]+'</span></a></li>';
				}
				
				else if(names1[i].match(/\+/g))
				{
					rightBar2+='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+names1[i]+'</span></a></li>';
				}
				
				else
				{
					rightBar3+='<li class="mode"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i]+'</span></a></li>';
				}
			}
			rightBar1=rightBar1+rightBar2+rightBar3+'</ul></div>';
			
			$(".memberlists").append(rightBar1);
		}
		
		else
		{
			for(var i=0;i<names1.length;i++)
			{
				if(names1[i].match(/@/g))
				{
					rightBar1+='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i]+'</span></a></li>';
				}
				
				else if(names1[i].match(/\+/g))
				{
					rightBar2+='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+names1[i]+'</span></a></li>';
				}
				
				else
				{
					rightBar3+='<li class="mode"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i]+'</span></a></li>';
				}
			}
			
			var num_users=Number($("#"+channelName+"OnlineUsers").html());
			num_users+=names1.length;
			$("#"+channelName+"OnlineUsers").html(num_users);
			$("#"+channelName+"Persons .meta").html(num_users+" Users");
			
			rightBar2=rightBar2+rightBar3;
			
			$("#"+channelName+"Persons ul").prepend(rightBar1);
			$("#"+channelName+"Persons ul").append(rightBar2);
		}
	}, // Called after joining a new channel

	onOp: function(channel, nick) {},
	onDeop: function(channel, nick) {},
	onVoice: function(channel, nick) {},
	onDevoice: function(channel, nick) {}
}

