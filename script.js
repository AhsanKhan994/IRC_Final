var irc = {

	muted: [],
	blocked: [],
	ips: {},
	pendingban: [],
	connection: undefined,
	
	ignoredStatuses: ["818", "819", // CR proprietary stuff
					  "366",        // End of names
					  "330",        // Whowas time
					  "322", "323", // Channel list
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
		this.connection = new IRC("irc.bizimdiyar.com", "6667", "TurkWeb", nick, password);
		$.extend(this.connection.handlers, {
			"PRIVMSG": function(msg) {
				if (_this.muted.indexOf(msg.source.nick) == -1 ) {
					_this.onMessage(msg.source.nick, msg.target, msg.msg);
				} else {
					console.log("Muted message from " + msg.source.nick);
				}
			},
			"NOTICE": function(msg) {
				_this.onNotice(msg.source.nick, msg.target, msg.msg);
			},
			"JOIN": function(msg) {
				_this.onJoin(msg.source, msg.msg);
			},
			"NICK": function(msg) {
				if (msg.source.type == "server") {
					msg.msg = msg.target;
				}
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
			"KICK": function(msg) {
				_this.onKick(msg.target, msg.args[0], msg.msg);
			},
			"MODE": function(msg) {
				switch(msg.args[0]) {
					case "+o":
						_this.onOp(msg.source.nick, msg.target, msg.args[1]);
						break;
					case "-o":
						_this.onDeop(msg.source.nick, msg.target, msg.args[1]);
						break;
					case "+v":
						_this.onVoice(msg.source.nick, msg.target, msg.args[1]);
						break;
					case "-v":
						_this.onDevoice(msg.source.nick, msg.target, msg.args[1]);
						break;
					case "+b":
						_this.onBan(msg.source.nick, msg.target, msg.args.slice(1));
						break;
					case "-b":
						_this.onUnban(msg.source.nick, msg.target, msg.args.slice(1));
						break;
					default:
						_this.onMode(msg.source.nick, msg.target, msg.args.join(" "));
				}
			},
			"001": function(msg) {
				_this.onConnected(true);
				_this.onStatus("Last updated 20160202");
			},
			"002": function(msg) {
				console.log(channels);
				console.log("Autojoining " + channels.join(" "));
				channels.forEach(function(item) {
					_this.connection.join(item);
				});
			},
			"307": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], msg.msg);
				}
			},
			"310": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], msg.msg);
				}
			},
			"311": function(msg) {
				var nick = msg.args[0];
				var ip = msg.args[2];
				_this.ips[nick] = ip;
				if (_this.pendingban[nick]) {
					_this.banNickOnChannelByIP(nick, _this.pendingban[nick]);
				} else {
					var text = "is ( " + msg.args[1] + "@" + msg.args[2] + " )" + msg.args.slice(3).join(" ");
					_this.onWhois(msg.args[0], text);
				}
			},
			"312": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], "Server: " + msg.msg);
				}
			},
			"313": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], msg.msg);
				}
			},
			"317": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], msg.msg);
				}
			},
			"318": function(msg) { // WHOIS_END
				_this.pendingban[nick] = false;
			},
			"319": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], "Channels: " + msg.msg);
				}
			},
			"325": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], msg.msg);
				}
			},
			"334": function(msg) {
				if (!_this.pendingban[msg.args[0]]) {
					_this.onWhois(msg.args[0], msg.args[1] + ": " + msg.msg);
				}
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
				if (!_this.banList[msg.args[0]]) {
					_this.banList[msg.args[0]] = [];
				}
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
			"404": function(msg) {
				_this.onMessageDeliveryFailed(msg.args[0], msg.msg);
			},
			"432": irc.onNickChangeRequest,
			"433": irc.onNickChangeRequest,
			"436": irc.onNickChangeRequest,
			"error": function(msg) {
				_this.onError(""+msg.command + " " + msg.args.join(" ") + " :" + msg.msg);
			},
			"status": function(msg) {
				if (_this.ignoredStatuses.indexOf(msg.command) == -1) {
					_this.onStatus(msg.args.join(" ") + " " + msg.msg);
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
			case "J":
			case "JOIN":
				if (tokens[1][0] == "#") {
					var channel = tokens[1];
				} else {
					var channel = "#" + tokens[1];
				}
				this.joinChannel(channel);
				break;
			case "MSG":
				this.message(tokens[1], tokens.slice(2).join(" "));
				break;
			case "ME":
				this.connection.ctcp(target, "ACTION " + text);
			case "NICK":
				this.changeNick(tokens.slice(1).join(" "));
				break;
			case "ATTACH": // CR's nick registration.
				this.connection.sendIrc("ATTACH " + tokens.slice(1).join(" "));
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
			case "UMODE":
				this.connection.mode(_this.currentNick, tokens.slice(1).join(" "));
				break;
			case "NS":
				_this.message("NickServ", tokens.slice(1).join(" "));
				break;
			case "CS":
				_this.message("ChanServ", tokens.slice(1).join(" "));
				break;
			case "MS":
				_this.message("MemoServ", tokens.slice(1).join(" "));
				break;
			case "OS":
				_this.message("OperServ", tokens.slice(1).join(" "));
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

	registerNick: function(password, email) {
		this.connection.sendIrc("ATTACH " + password + " " + email);
	},

	login: function(nick, password) {
		this.connection.nick(nick + " " + password);
	},

	banNickOnChannel: function(nick, channel) {
		this.connection.mode(channel, "+b "+nick);
	},

	banNickOnChannelByIP: function(nick, channel) {
		var ip = this.ips[nick];
		if (ip == undefined) {
			this.pendingban[nick] = channel;
			this.whoisNick(nick);
		} else {
			this.connection.mode(channel, "+b *!*@"+ip);
		}
	},

	unbanPatternOnChannel: function(nick, pattern) {
		this.connection.mode(channel, "-b " + pattern);
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

	opNickOnChannel: function (nick, channel) {
		this.connection.mode(channel, "+o "+nick);
	},

	deopNickOnChannel: function (nick, channel) {
		this.connection.mode(channel, "-o "+nick);
	},

	voiceNickOnChannel: function (nick, channel) {
		this.connection.mode(channel, "+v "+nick);
	},

	devoiceNickOnChannel: function (nick, channel) {
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
		var plain_text = no_colors.replace(/[\x1D\x0F\x02\x16\x1F]/g, '');
		return plain_text;
	},

	messageColors: function(coloredText) {
		var textPos = 0;
		var colors = [];
		var fg = undefined;
		var bg = undefined;
		for (var i = 0; i < coloredText.length; i++) {
			if (coloredText[i] == "\x03") {
				var color = coloredText.slice(i+1).match(/\d{0,2}(,\d{0,2})?/)[0].split(",");
				var obj = {"start": textPos};
				if (color[0] != "") {
					fg = irc.colorIrc2html(color[0]);
					obj.fg = fg;
				} else {
					fg = undefined;
				}
				if (color.length >= 2) {
					bg = irc.colorIrc2html(color[1]);
					obj.bg = bg;
				} else {
					fg = undefined;
				}
				colors.push(obj);
				textPos -= color.join(",").length;
			} else if (coloredText[i].match(/[\x1D\x0F\x02\x16\x1F]/)) {
				var obj = {"start": textPos,
					"style": {"\x0F": "plain",
						"\x02": "bold",
						"\x16": "reverse",
						"\x1F": "underline",
						"\x1D": "italic"}[coloredText[i]]};
				if (coloredText[i] != "\x0F") {
					if (fg) obj.fg = fg;
					if (bg) obj.bg = bg;
				} else {
					fg = undefined;
					bg = undefined;
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
	onNotice: function(who, where, text) {console.log("onNotice " + who + " " + where + " " + text);},
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
	onOp: function(source, channel, nick) {console.log("onOp " + source + " " + channel + " " + nick);},
	onDeop: function(source, channel, nick) {console.log("onDeop " + source + " " + channel + " " + nick);},
	onVoice: function(source, channel, nick) {console.log("onVoice " + source + " " + channel + " " + nick);},
	onDevoice: function(source, channel, nick) {console.log("onDevoice " + source + " " + channel + " " + nick);},
	onKick: function(source, channel, nick) {console.log("onKick " + source + " " + channel + " " + nick);},
	onBan: function(source, channel, pattern) {console.log("onBan " + source + " " + pattern + " " + channel);},
	onUnban: function(source, channel, pattern) {console.log("onUnban " + source + " " + pattern + " " + channel);},
	onMode: function(nick, channel, message) {console.log("onMode " + nick + " " + channel + " " + message);},
	onMessageDeliveryFailed: function(channel, error) {console.log("onMessageDeliveryFailed " + channel + " " + error);},
	onNickChangeRequest: function(msg) {
		irc.currentNick = msg.target;
		console.log("onNickChangeRequest");
		setTimeout(function() {
			irc.changeNick("Guest");
		}, 5000);
	}
}

userName = undefined;
function changeNickIfExist(nck)
{
	$("#myNick").html(nck);
	userName=nck;
}
