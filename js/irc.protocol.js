var IRC = (function() {
	function IRC(host, port, username, nickname) {
		var _this = this;
		this.host = host;
		this.port = port;
		this.username = username;
		this.nickname = nickname;
		this.buffer = "";
		this.handlers = {"PING": function (msg) {
			console.log(msg.msg);
			_this.sendIrc("PONG "+msg.msg);
		}};
		this.mySocket = new jSocket();
		this.mySocket.onReady = function () {
			console.log("socket ready");
			this.buffer = []
			_this.connect();
		}
		this.mySocket.onConnect = function (success,data) {
			console.log("socket connected");
			if(!success)
			{
				console.log("error:"+data)
					return;
			}
			_this.handshake();
		}
		this.mySocket.onData = function (content) {
			this.buffer = this.buffer + content;
			var lineend = this.buffer.indexOf("\n");
			while (lineend != -1) {
				_this.readLine(this.buffer.substring(0, lineend));
				this.buffer = this.buffer.substring(lineend+2);
				lineend = this.buffer.indexOf("\n");
			}
		}
		this.mySocket.onClose = function () {
			console.log("socket close");
			_this.onClose();
		}
	};
	IRC.prototype = {
		connect: function() {
			console.log("Connecting to " + this.host);
			this.mySocket.connect(this.host, this.port);
		},

		handshake: function () {
			this.sendIrc("USER "+this.username+" 0 * :jsIRC");
			this.sendIrc("NICK "+this.nickname);
			
		},

		readLine: function (line) {
			console.log("<= "+line);
			if (line == "")
				return;
			var msg = new Message(line);
			//var handler = this.handlers[msg.command];
			if (msg.command[0] == "4") {
 				this.handle("error", msg);
 			};
 			this.handle(msg.command, msg);
			},
 
			handle: function(key, msg) {
 			var handler = this.handlers[key];
 
			if (handler != undefined) {
				//handler(msg);
				if (msg != undefined) {
 					handler(msg);
 				} else {
 					handler();
 				}
				} else {
 				if (msg.command.match(/[0-9]{3}/)) {
 					this.handle("status", msg);
 				};
			}
		},
		
		onClose: function() {
 			this.handle("close");
 		},

		addHandler: function(cmd, func) {
			this.handlers[cmd] = func;
		},

		sendIrc: function (line) {
			console.log("-> "+line);
			this.mySocket.write(line);
		},

		privmsg: function(target, message) {
			this.sendIrc("PRIVMSG " + target + " :" + message);
		},

		whois: function(target) {
			this.sendIrc("WHOIS " + target);
		},

		join: function(channel) {
			this.sendIrc("JOIN " + channel);
		},

		part: function(channel) {
			this.sendIrc("PART " + channel);
		},
		
		kick: function(channel, nick, reason) {
 			if (reason == undefined) {
 				this.sendIrc("KICK " + channel + " " + nick);
 			} else {
 				this.sendIrc("KICK " + channel + " " + nick + " :" + reason);
 			}
 		},

		quit: function() {
			this.sendIrc("QUIT");
		},

		nick: function(nick) {
			this.sendIrc("NICK " + nick);
			
		},

		ctcp: function(target, message) {
			this.sendIrc("PRIVMSG " + target + " :\001" + message + "\001");
		},

		mode: function(target, line) {
			this.sendIrc("MODE " + target + " :" + line);
		},

		invite: function(client, channel) {
			this.sendIrc("INVITE " + client + " " + channel);
		},

		topic: function(channel, topic) {
			if (topic != undefined) {
				this.sendIrc("TOPIC " + channel + " :" + topic);
			} else {
				this.sendIrc("TOPIC " + channel);
			}
		}
	};


	function Message(line) {
		if (line[0] == ":") {
			line = line.substring(1);
		}
		this.line = line;
		var tokens = line.split(":");
		this.msg = tokens[1];
		tokens = tokens[0].split(" ").filter(function(v) {
			return v != "";
		});
		if (tokens[0] == "PING"
 			|| tokens[0] == "NOTICE"
 			|| tokens[0] == "ERROR") {
			this.source = new Source("");
			this.command = tokens[0];
			this.target = tokens[1];
			this.args = tokens.slice(2);
		} else {
			this.source = new Source(tokens[0]);
			this.command = tokens[1];
			this.target = tokens[2];
			this.args = tokens.slice(3);
		}
	};
	Message.prototype.toString = function() {
		return this.line;
	};

	var checkMyName=0;
	
	function Source(line) {
		var bang = line.indexOf("!");
		if (bang == -1) {
			this.type = "server";
			this.name = line;
		} else {
			this.type = "user";
			this.nick = line.substring(0, bang);
			if(checkMyName==0){
			changeNickIfExist(this.nick);
			checkMyName++;
			}
			var at = line.indexOf("@");
			this.name = line.substring(bang+1, at);
			this.host = line.substring(at+1);
		}
	};
	Source.prototype.toString = function() {
		if (this.type == "server") {
			return this.name;
		} else {
			return this.nick + "!" + this.name + "@" + this.host;
		}
	};

	return IRC
})()
