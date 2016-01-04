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
				
				if(str.match(nickShow))
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
				
				if(str.match(nickShow))
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