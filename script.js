var irc = {

	muted: [],
	blocked: [],
	connection: undefined,
	ignoredStatuses: ["818", "819", // CR proprietary stuff
					  "366",        // End of names
					  "330",        // Whowas time
					  "333"],       // Channel creation time

	// API

	connect: function(nick, channels, password) {
		_this = this;
		this.currentNick = nick;
		this.password = password;
		if (this.connection != undefined) {
			console.log("Already connected");
			return;
		};
		this.connection = new IRC("irc.bizimdiyar.com", "6667", "TurkWeb", nick);
		$.extend(this.connection.handlers, {
			"PRIVMSG": function(msg) {
				if (_this.muted.indexOf(msg.source.nick) == -1 ) {
					_this.onMessage(msg.source.nick, msg.target, msg.msg);
				} else {
					console.log("Muted message from " + msg.source.nick);
				}
			},
			"JOIN": function(msg) {
				_this.onJoin(msg.source, msg.msg);
			},
			"NICK": function(msg) {
				if (msg.source.nick == _this.currentNick) {
					_this.onSelfNick(msg.msg);
					_this.currentNick = msg.msg;
				};
				_this.onNick(msg.source.nick, msg.msg);
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
					_this.changeNick(_this.currentNick + " " + _this.password);
				}
				_this.onConnected(true);
			},
			"002": function(msg) {
				console.log(channels);
				console.log("Autojoining " + channels.join(" "));
				channels.forEach(function(item) {
					_this.connection.join(item);
				});
			},
			"311": function(msg) {
				_this.onWhois(msg.target, msg.args.join(" ") + " " + msg.msg);
			},
			"312": function(msg) {
				_this.onWhois(msg.target, args[0] + " " + msg.msg);
			},
			"313": function(msg) {
				_this.onWhois(msg.target, msg.msg);
			},
			"317": function(msg) {
				_this.onWhois(msg.target, msg.args[0] + " " + msg.msg);
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
			// Ban list
			"367": function(msg) {
				_this.banList[msg.args[0]].push({"channel": msg.args[0], "mask": msg.args[1]});
			},
			"368": function(msg) {
				_this.onBansList(msg.args[0], _this.banList[msg.args[0]]);
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

	message: function(target, text) {
		if (text[0] == "/") {
			this.slashCommand(target, text.slice(1));
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

	banList: [],
	listBans: function(channel) {
		this.banList[channel] = [];
		this.connection.mode(channel, "+b");
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
		nick = nick.replace(/^[+@]/, "");
		this.muted.push(nick);
	},

	unmuteNick: function(nick) {
		nick = nick.replace(/^[+@]/, "");
		for(var i = this.muted.length-1; i >= 0; i--) {
			if(this.muted[i] === nick) {
				this.muted.splice(i, 1);
			};
		};
	},

	blockNick: function(nick) {
		blocked.push(nick);
	},

	unblockNick: function(ip) {
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
		var textPos = 0;
		var colors = [];
		for (var i = 0; i < coloredText.length; i++) {
			if (coloredText[i] == "\x03") {
				var color = coloredText.slice(i+1).match(/\d{0,2}(,\d{0,2})?/)[0].split(",");
				var obj = {"start": textPos};
				if (color[0] != "") {
					obj.fg = irc.colorIrc2html(color[0]);
				}
				if (color.length >= 2) {
					obj.bg = irc.colorIrc2html(color[1]);
				}
				colors.push(obj);
			} else {
				textPos++;
			}
		};
		return colors;
	},

	colorIrc2html: function(color) {
		return {
			0: "#FFFFFF",
			1: "#000000",
			2: "#00007F",
			3: "#009300",
			4: "#FF0000",
			5: "#7F0000",
			6: "#9C009C",
			7: "#FC7F00",
			8: "#FFFF00",
			9: "#00FC00",
			10: "#009393",
			11: "#00FFFF",
			12: "#0000FC",
			13: "#FF00FF",
			14: "#7F7F7F",
			15: "#D2D2D2"
		}[parseInt(color)];
	},

	// CALLBACKS

	onConnected: function(success) {console.log("onConnected " + success);},
	onMessage: function(who, where, text) {console.log("onMessage " + who + " " + where + " " + text);},
	onWhois: function(who, data) {console.log("onWhois " + who + " " + data);},
	onJoin: function(who, where) {console.log("onJoin " + who + " " + where);},
	onPart: function(who, where, message) {console.log("onPart " + who + " " + where + " " + message);},
	onQuit: function(who, message) {console.log("onQuit " + who + " " + message);},
	onTopic: function(channel, topic) {console.log("onTopic " + channel + " " + topic);},
	onNames: function(channel, names) {console.log("onNames " + channel + " " + names);}, // Called after joining a new channel
	onNick: function(old_nick, new_nick) {console.log("onNick " + old_nick + " " + new_nick);},
	onSelfNick: function(new_nick) {console.log("onSelfNick " + new_nick);},
	onSelfQuit: function() {console.log("onSelfQuit");},
	onError: function(message) {console.log("onError " + message);},
	onStatus: function(message) {console.log("onStatus " + message);},
	onChannelList: function(channels) {console.log("onChannelList"); console.log(channels);},
	onBansList: function(channel, bans) {console.log("onBansList " + channel); console.log(bans);},
	onOp: function(channel, nick) {console.log("onOp " + channel + " " + nick);},
	onDeop: function(channel, nick) {console.log("onDeop " + channel + " " + nick);},
	onVoice: function(channel, nick) {console.log("onVoice " + channel + " " + nick);},
	onDevoice: function(channel, nick) {console.log("onDevoice " + channel + " " + nick);},
	onNickChangeRequest: function(msg) {
		console.log("onNickChangeRequest");
		irc.changeNick("Guest");
	}
}
