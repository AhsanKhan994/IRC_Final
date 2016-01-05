function showThisTab(i,evt)
{		
	
	$("#kiwi .memberlists > div ul li").removeClass("nickSelected");
	
	if(evt.target.id!="close")
	{
		$(".close_icon1").css("opacity","1");
		$(".close_icon1").css("pointer-events", "inherit");

		$("#joinedChannels li").removeClass("active");
		$("#joinedChannels li").addClass("alert_activity");
		$("#"+i+"Tab").addClass("active");
		$("#"+i+"Tab").removeClass("alert_activity");
		$(".part.fa.fa-nonexistant").css("display","none");
		
		$("#"+i+"Tab .part.fa.fa-nonexistant").css("display","inline");
		
		$(".memberlists div").removeClass("active");
		$(".memberlists div#"+i+"Persons").addClass("active");
		
		$(".panel").removeClass("activeMsgWindow");
		$(".panel").css("display","none");
		$("#"+i+"MsgArea").css("display","block");
		$("#"+i+"MsgArea").addClass("activeMsgWindow");
		
		$("#"+i+ "MsgArea .messages")[0].scrollTop=$("#"+i+ "MsgArea .messages")[0].scrollHeight;
		
	}
}

function sendMessage(toSnd,Msg)
{

	irc.message(toSnd,Msg);
	
			Msg=Msg.replace(/:\)/g,'<i class="emoticon smile">:)</i>');
					Msg=Msg.replace(/:3/g,'<i class="emoticon lion">:3</i>');
					Msg=Msg.replace(/;3/g,'<i class="emoticon winky_lion">;3</i>');
					Msg=Msg.replace(/;\)/g,'<i class="emoticon wink">;)</i>');
					Msg=Msg.replace(/H:/g,'<i class="emoticon eyebrows">H:</i>');
					Msg=Msg.replace(/:\(/g,'<i class="emoticon sad">:(</i>');
					Msg=Msg.replace(/;_;/g,'<i class="emoticon cry">;_;</i>');
					Msg=Msg.replace(/<3/g,'<i class="emoticon heart">&lt;3</i>');
					Msg=Msg.replace(/;D/g,'<i class="emoticon wink_happy">;D</i>');
					Msg=Msg.replace(/:P/g,'<i class="emoticon tongue">:P</i>');
					Msg=Msg.replace(/:D/g,'<i class="emoticon happy">:D</i>');
					Msg=Msg.replace(/:S/g,'<i class="emoticon confused">:S</i>');
					Msg=Msg.replace(/xP/g,'<i class="emoticon cringe_tongue">xP</i>');
					Msg=Msg.replace(/:O/g,'<i class="emoticon shocked">:O</i>');
					
					Msg=Msg.replace(/>_</g,'<i class="emoticon doh">&gt;_&lt;</i>');
					Msg=Msg.replace(/o.0/g,'<i class="emoticon wide_eye_right">o.0</i>');
					Msg=Msg.replace(/0.o/g,'<i class="emoticon wide_eye_left">0.o</i>');
					Msg=Msg.replace(/XD/g,'<i class="emoticon big_grin">XD</i>');
					Msg=Msg.replace(/:F/g,'<i class="emoticon unsure">:\</i>');
	
	var	channelName=toSnd.replace("+","P");
		channelName=channelName.replace("#","");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
	
	var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
	
	$('#textInput').val('');
	
	var msgID=channelName+"MsgArea";
	
		
	$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#37971a;">&lt;'+userName+'&gt;</div><div class="text" style="">'+Msg+'</div></div>');
	
	
	//$("#"+msgID+ " .messages").animate({ scrollTop: $(document).height() }, "fast");
	
	$("#"+msgID+ " .messages")[0].scrollTop=$("#"+msgID+ " .messages")[0].scrollHeight;
	
}

function closeThisTab(id,channelName)
{
	irc.leaveChannel(channelName);

	$("#"+id+"Tab").remove();
	$("#"+id+"MsgArea").remove();
	$("#"+id+"Persons").remove();
	
	$("#joinedChannels li").last().removeClass("alert_activity");
	$("#joinedChannels li").last().addClass("active");
	$("#joinedChannels li:last .fa.fa-nonexistant").css("display","inline");
	
	//showThisTab("EZZ");
	$(".panels .panel:last").css("display","block");
	$(".panels .panel").last().css("display","block");
	
	$(".panels .panel:last .messages")[0].scrollTop=$(".panels .panel:last .messages")[0].scrollHeight;
	
	//$(".memberlists>div:last").remove();
	$(".memberlists>div").removeClass("active");
	$(".memberlists>div:last").addClass("active");

	if($("#joinedChannels>li:last").hasClass("privateMsgTAb") && !channelName.match(/#/g))
	{
		$(".close_icon1").css("opacity","0.7");
		$(".close_icon1").css("pointer-events", "none");
	}
	
	else
	{
		$(".close_icon1").css("opacity","1");
		$(".close_icon1").css("pointer-events", "inherit");
	}
}

function closeThisTabFromMenu()
{
	var channelName=$("#joinedChannels .active span:first").html();
	
	irc.leaveChannel(channelName);
	
	var id=channelName.replace("#","");
		id=id.replace("+","P");
		id=id.replace(".","D");
		id=id.replace("*","M");
		id=id.replace("-","S");
		id=id.replace("/","Dv");
		id=id.replace("%","Md");
		id=id.replace("@","AD");
		
	$("#"+id+"Tab").remove();
	$("#"+id+"MsgArea").remove();
	$("#"+id+"Persons").remove();
	
	$("#joinedChannels li").last().removeClass("alert_activity");
	$("#joinedChannels li").last().addClass("active");
	$("#joinedChannels li:last .fa.fa-nonexistant").css("display","inline");
	
	//showThisTab("EZZ");
	$(".panels .panel:last").css("display","block");
	$(".panels .panel").last().css("display","block");	
	
	//$(".memberlists>div:last").remove();
	$(".memberlists>div").removeClass("active");
	$(".memberlists>div:last").addClass("active");
	
	if($("#joinedChannels>li:last").hasClass("privateMsgTAb"))
	{
		$(".close_icon1").css("opacity","0.7");
		$(".close_icon1").css("pointer-events", "none");
	}
	
}

function clearArea()
{
	var channelName=$("#joinedChannels .active span:first").html();
	
	var id=channelName.replace("#","");
		id=id.replace("+","P");
		id=id.replace(".","D");
		id=id.replace("*","M");
		id=id.replace("-","S");
		id=id.replace("/","Dv");
		id=id.replace("%","Md");
		id=id.replace("@","AD");

	$("#"+id+"MsgArea .messages").html('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time" style="color:#DB8030;">---------</div><div class="nick" style="color:#DB8030;">Screen Cleared</div><div class="time" style="color:#DB8030;">---------</div></div><br>');
			
}

function whoisSelectedNick()
{
	
	var nickName=$("li.nickSelected .nick .nickName").text().replace("@","").replace("+","");
			
	irc.whoisNick(nickName);	
}

function changeNick()
{	
	var nickName=$("#changeNick .inp").val();
	
	if(nickName!=="")
	{
		$("#changeNick").css("background","#000");
		changeNicktoNew(nickName);
	
		$("#changeNick").hide(150);
		$("#changeNick .inp").hide(150);
		$("#changeNick .btn").hide(150);
	}
	
	else
	{
		$("#changeNick").css("background","#EC0202");
	}
}
	
	
function changeNicktoNew(nick)
{
	irc.changeNick(nick);
}

function joinChannel()
{
	var channel="#"+$("#joinChan .inp").val();

		if(channel!=="")
		{
			$("#joinChan").css("background","#000");
			joinThisChannel(channel);
			$("#joinChan").hide(150);
			$("#joinChan .inp").hide(150);
			$("#joinChan .btn").hide(150);
			
		}
		
		else
		{
			$("#joinChan").css("background","#EC0202");
		}
}

function joinThisChannel(channelName)
{
	irc.joinChannel(channelName);
}

function showSndMsgPrvt()
{
	var nickNameOrg=$("li.nickSelected .nick .nickName").text().replace(/(?:\r\n|\r|\n)/g, '');
		
			var nickName=nickNameOrg.replace("#","");
			nickName=nickName.replace("+","P");
			nickName=nickName.replace(".","D");
			nickName=nickName.replace("*","M");
			nickName=nickName.replace("-","S");
			nickName=nickName.replace("/","Dv");
			nickName=nickName.replace("%","Md");
			nickName=nickName.replace("@","AD");
			nickName=nickName.replace(/(?:\r\n|\r|\n)/g, '');
	
	if(nickNameOrg!="")
	{
		if($("#"+nickName+"Tab").length==0)
		{
			$("#joinedChannels li").removeClass("active");
			$(".panel").css("display","none");
			$(".part.fa.fa-nonexistant").css("display","none");
			$(".memberlists div").removeClass("active");
			$("#joinedChannels li").addClass("alert_activity");
		

			
			$("#joinedChannels").append("<li id='"+nickName+"Tab' onclick="+"showThisPrvtTab('"+nickName+"',event)"+" class='active privateMsgTAb'><span>"+nickNameOrg+"</span><div class='activity'>2</div><span id='close' class='part fa fa-nonexistant'  onclick="+"closeThisTab('"+nickName+"','"+nickNameOrg+"')"+"></span></li>");
			
			$(".panels .panel_container.container1").append('<div id="'+nickName+'MsgArea" class="panel activeMsgWindow" style="display: block;"><div class="messages" style="width: 98%; border-right-style: none;"></div></div>');
			
			$(".close_icon1").css("opacity","0.7");
			$(".close_icon1").css("pointer-events", "none");
		}
		
		else
		{
			$("#joinedChannels li").removeClass("active");
			$(".panel").css("display","none");
			$(".part.fa.fa-nonexistant").css("display","none");
			$(".memberlists div").removeClass("active");
			$("#joinedChannels li").addClass("alert_activity");
			
			$("#"+nickName+"Tab").addClass("active");
			
			$("#"+nickName+"Tab .fa.fa-nonexistant").css("display","inline");
			
			$("#"+nickName+"MsgArea").css("display","block");
			
			$(".close_icon1").css("opacity","0.7");
			$(".close_icon1").css("pointer-events", "none");
						
		}
		
		$("#"+nickName+"MsgArea .messages").css("width","98%");
	}
}

function showThisPrvtTab(i,evt)
{
	
	$(".close_icon1").css("opacity","0.7");
	$(".close_icon1").css("pointer-events", "none");
		
	$("#kiwi .memberlists > div ul li").removeClass("nickSelected");
	
	if(evt.target.id!="close")
	{
		$("#joinedChannels li").removeClass("active");
		$("#joinedChannels li").addClass("alert_activity");
		$("#"+i+"Tab").addClass("active");
		$("#"+i+"Tab").removeClass("alert_activity");
		$(".part.fa.fa-nonexistant").css("display","none");
		
		$("#"+i+"Tab .part.fa.fa-nonexistant").css("display","inline");
		$("#"+i+"MsgArea .messages").css("width","98%");
		
		$(".memberlists div").removeClass("active");
		$(".memberlists div#"+i+"Persons").addClass("active");
		
		$(".panel").removeClass("activeMsgWindow");
		$(".panel").css("display","none");
		$("#"+i+"MsgArea").css("display","block");
		$("#"+i+"MsgArea").addClass("activeMsgWindow");
		
		$("#"+i+ "MsgArea .messages")[0].scrollTop=$("#"+i+ "MsgArea .messages")[0].scrollHeight;
		
	}
	
	else
	{
		$(".close_icon1").css("opacity","1");
		$(".close_icon1").css("pointer-events", "inherit");
	}
}

function ignoreHim()
{
	var nickShow=$(".nickSelected .nickName").html();
	
	if(nickShow!=undefined)
	{
	
		if($(".nickSelected").hasClass("ignoreHim"))
		{
			$(".nickName").map(function(i,d){
				
				var str=$(this).html();
				str=str.replace(" ","");
				
				if(str == nickShow)
				{
					//$(this).html(new_nick);
					
					var id=$(this).closest(".PersonsArea").attr("id");
					id=id.replace("Persons","");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">Your are not ignoring</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					$(this).closest(".mode").removeClass("ignoreHim");
				}
			});
			
			irc.unmuteNick(nickShow);
			
		}
		else
		{
			$(".nickName").map(function(i,d){
				
				var str=$(this).html();
				str=str.replace(" ","");
				
				if(str == nickShow)
				{
					//$(this).html(new_nick);
					
					var id=$(this).closest(".PersonsArea").attr("id");
					id=id.replace("Persons","");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">Your are ignoring</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					$(this).closest(".mode").addClass("ignoreHim");
				}
			});
			
			irc.muteNick(nickShow);
		}
	}
}

function changeNickIfExist(newNick)
{
	userName=newNick;
	$("#myNick").html(userName);
	
		if(userName.match(/@/g))
		{
			$(".kickOut").css("display","inherit");
			$(".mute").css("display","inherit");
		}
		else
		{
			$(".kickOut").css("display","none");
			$(".mute").css("display","none");
		}
}

function makeOper(n)
{
	var nickShow=$(".nickSelected .nickName").html();
	var channelName=$("#joinedChannels .active span:first").html();
	
	if(nickShow!=undefined)
	{
	
		if(n==2)
		{
								
			var	id=channelName.replace("+","P");
				id=id.replace("#","");
				id=id.replace(".","D");
				id=id.replace("*","M");
				id=id.replace("-","S");
				id=id.replace("/","Dv");
				id=id.replace("%","Md");
				id=id.replace("@","AD");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :-o </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").removeClass("ignoreHim");
				
		
			
			irc.deopNickOnChannel(nickShow,channelName);
			
		}
		else
		{
									
			var	id=channelName.replace("+","P");
				id=id.replace("#","");
				id=id.replace(".","D");
				id=id.replace("*","M");
				id=id.replace("-","S");
				id=id.replace("/","Dv");
				id=id.replace("%","Md");
				id=id.replace("@","AD");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+o </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").addClass("ignoreHim");
				
		
			
			irc.opNickOnChannel(nickShow,channelName);
		}
	}
}

function voiceDevoiceOper(n)
{
	
	var nickShow=$(".nickSelected .nickName").html();
	var channelName=$("#joinedChannels .active span:first").html();
	
	if(nickShow!=undefined)
	{
	
		if(n==2)
		{
										
			var	id=channelName.replace("+","P");
				id=id.replace("#","");
				id=id.replace(".","D");
				id=id.replace("*","M");
				id=id.replace("-","S");
				id=id.replace("/","Dv");
				id=id.replace("%","Md");
				id=id.replace("@","AD");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :-v </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").removeClass("ignoreHim");
					
					$("li.nickSelected .nick .nickName").attr("data-voice","devoice");
					$("li.nickSelected").css("background","rgb(255, 80, 80)"); 
					$("li.nickSelected").addClass("devoice");
					$("li.nickSelected .nick").css("color","#fff"); 
		
			
			irc.devoiceNickOnChannel(nickShow,channelName);
			
		}
		else
		{
							
			var	id=channelName.replace("+","P");
				id=id.replace("#","");
				id=id.replace(".","D");
				id=id.replace("*","M");
				id=id.replace("-","S");
				id=id.replace("/","Dv");
				id=id.replace("%","Md");
				id=id.replace("@","AD");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+v </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").addClass("ignoreHim");
					
					$("li.nickSelected .nick .nickName").attr("data-voice","voice");
					$("li.nickSelected").removeAttr("style"); 
					$("li.nickSelected").removeClass("devoice");
					$("li.nickSelected .nick").css("color","#000"); 
				
		
			
			irc.voiceNickOnChannel(nickShow,channelName);
		}
	}
}

function banNickIrc()
{
	
	var nickShow=$(".nickSelected .nickName").html();
	var channelName=$("#joinedChannels .active span:first").html();
	
	if(nickShow!=undefined)
	{										
			var	id=channelName.replace("+","P");
				id=id.replace("#","");
				id=id.replace(".","D");
				id=id.replace("*","M");
				id=id.replace("-","S");
				id=id.replace("/","Dv");
				id=id.replace("%","Md");
				id=id.replace("@","AD");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+b </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").removeClass("ignoreHim");
		
			
			irc.banNickOnChannel(nickShow,channelName);
			
		
	}
}

function kickNickIrc()
{
	var nickShow=$(".nickSelected .nickName").html();
	var channelName=$("#joinedChannels .active span:first").html();
	
	if(nickShow!=undefined)
	{										
			var	id=channelName.replace("+","P");
				id=id.replace("#","");
				id=id.replace(".","D");
				id=id.replace("*","M");
				id=id.replace("-","S");
				id=id.replace("/","Dv");
				id=id.replace("%","Md");
				id=id.replace("@","AD");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+k </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").removeClass("ignoreHim");
		
			
			irc.kickNickFromChannel(nickShow,channelName,"");
			
		
	}
}

// Callbacks


var Channels=["#EZZ","#yarisma","#carsaf.nl","#sohbet","#35+","#ask","#gurbet","#radyo"];

irc.onStartConnect = function() {
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
}

irc.onConnected = function(success) {console.log("onConnected " + success);
	irc.joinChannel(Channels);
};
	
irc.onMessage = function(who, where, text) {console.log("onMessage " + who + " " + where + " " + text);

	// Colored text support
	//var colors=irc.messageColors(text);
	//var text=irc.messageText(text);
	//console.log(colors);

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
};

irc.onWhois = function(who, data) {console.log("onWhois " + who + " " + data);

	var d = new Date();
	var n = d.getHours();
	var m = d.getMinutes();

	var nickName=$("li.nickSelected .nick .nickName").text();

	$(".activeMsgWindow .messages").append('<div class="msg whois  nick_416873616e"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#1a2597;">&lt;'+nickName+'&gt;</div><div class="text" style=""><span class="inline-nick" style=";cursor:pointer;"></span> '+data+' </div></div>');

};
	
irc.onJoin = function(who, where) {console.log("onJoin " + who + " " + where);//AhsanKhan1

	who = who.nick;

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

};
	
irc.onPart = function(who, where, message) {console.log("onPart " + who + " " + where + " " + message);

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

};
irc.onQuit = function(who, message) {console.log("onQuit " + who + " " + message);

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

};
	
irc.onTopic = function(channel, topic) {console.log("onTopic " + channel + " " + topic);

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
};
	
irc.onNick = function(old_nick, new_nick) {console.log("onNick " + old_nick + " " + new_nick);

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
	
irc.onSelfNick = function(new_nick) {console.log("onSelfNick " + new_nick);},
irc.onSelfQuit = function() {console.log("onSelfQuit"); window.location=".";},
irc.onError = function(message) {console.log("onError " + message);},
irc.onStatus = function(message) {console.log("onStatus " + message);},
irc.onChannelList = function(channels) {console.log("onChannelList"); console.log(channels);};
	
irc.onNames = function(channel, names) {//joinChannelsConfirmed

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
} // Called after joining a new channel
