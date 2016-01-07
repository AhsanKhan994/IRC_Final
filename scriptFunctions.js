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
		
		if($(".activeMsgWindow").hasClass("isOperator")){
			$(".kickOut").css("display","inherit");
			$(".mute").css("display","inherit");
		}
		
		else{
			$(".kickOut").css("display","none");
			$(".mute").css("display","none");
		}	
	}
}

function sendMessage(toSnd,Msg,color,fg,bg,commandd)
{
	toSnd=toSnd.replace("+","").replace("@","");
	
	
	if(commandd==0)
	{
		irc.message(toSnd,color+Msg);
	
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
		channelName=channelName.replace("`","CM");
	
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();
		
		$('#textInput').val('');
		
		var msgID=channelName+"MsgArea";
		
		bg=irc.colorIrc2html(bg);
		fg=irc.colorIrc2html(fg);
		
		$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time" style="line-height: 1.3;">['+n+':'+m+']</div><div class="nick" style="color:#37971a;line-height: 1.3;">&lt;'+userName+'&gt;</div><div class="text" style="line-height: 1.3;"><span style=" background:'+bg+';color:'+fg+';">'+Msg+'</span></div></div>');
		
		
		//$("#"+msgID+ " .messages").animate({ scrollTop: $(document).height() }, "fast");
		
		$("#"+msgID+ " .messages")[0].scrollTop=$("#"+msgID+ " .messages")[0].scrollHeight;
	
	}
	
	else
	{
		irc.message(toSnd,Msg);
	}
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
	$(".panels .panel:last").addClass("activeMsgWindow");
	
	
		if($(".activeMsgWindow").hasClass("isOperator")){
			$(".kickOut").css("display","inherit");
			$(".mute").css("display","inherit");
		}
		
		else{
			$(".kickOut").css("display","none");
			$(".mute").css("display","none");
		}
	
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
		id=id.replace("`","CM");
		
	$("#"+id+"Tab").remove();
	$("#"+id+"MsgArea").remove();
	$("#"+id+"Persons").remove();
	
	$("#joinedChannels li").last().removeClass("alert_activity");
	$("#joinedChannels li").last().addClass("active");
	$("#joinedChannels li:last .fa.fa-nonexistant").css("display","inline");
	
	//showThisTab("EZZ");
	$(".panels .panel:last").css("display","block");
	$(".panels .panel").last().css("display","block");	
	$(".panels .panel:last").addClass("activeMsgWindow");
	
	
		if($(".activeMsgWindow").hasClass("isOperator")){
			$(".kickOut").css("display","inherit");
			$(".mute").css("display","inherit");
		}
		
		else{
			$(".kickOut").css("display","none");
			$(".mute").css("display","none");
		}
	
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
		id=id.replace("`","CM");

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
	var channel=$("#joinChan .inp").val();

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
	var nickNameOrg=$("li.nickSelected .nick .nickName").text().replace(/(?:\r\n|\r|\n)/g, '').replace("+","").replace("@","");
		
			var nickName=nickNameOrg.replace("#","");
			nickName=nickName.replace("+","P");
			nickName=nickName.replace(".","D");
			nickName=nickName.replace("*","M");
			nickName=nickName.replace("-","S");
			nickName=nickName.replace("/","Dv");
			nickName=nickName.replace("%","Md");
			nickName=nickName.replace("@","AD");
			nickName=nickName.replace("`","CM");
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
			$(".panels .panel").removeClass("activeMsgWindow");
		

			
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
				
<<<<<<< HEAD
				if(str==nickShow)
=======
				if(str == nickShow)
>>>>>>> origin/master
				{
					//$(this).html(new_nick);
					
					var id=$(this).closest(".PersonsArea").attr("id");
					id=id.replace("Persons","");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">Your are not ignoring</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					$(this).closest(".mode").removeClass("ignoreHim");
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
				}
			});
			
			irc.unmuteNick(nickShow);
			
		}
		else
		{
			$(".nickName").map(function(i,d){
				
				var str=$(this).html();
				str=str.replace(" ","");
				
<<<<<<< HEAD
				if(str==nickShow)
=======
				if(str == nickShow)
>>>>>>> origin/master
				{
					//$(this).html(new_nick);
					
					var id=$(this).closest(".PersonsArea").attr("id");
					id=id.replace("Persons","");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">Your are ignoring</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					$(this).closest(".mode").addClass("ignoreHim");
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
				}
			});
			
			irc.muteNick(nickShow);
		}
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
				id=id.replace("`","CM");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :-o </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").removeClass("ignoreHim");
					
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
				
		
			
			irc.deopNickOnChannel(nickShow.replace("@","").replace("+",""),channelName);
			
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
				id=id.replace("`","CM");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+o </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").addClass("ignoreHim");
					
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
				
		
			
			irc.opNickOnChannel(nickShow.replace("@","").replace("+",""),channelName);
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
				id=id.replace("`","CM");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :-v </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").removeClass("ignoreHim");
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
					
					$("li.nickSelected .nick .nickName").attr("data-voice","devoice");
					//$("li.nickSelected").css("background","rgb(255, 80, 80)"); 
					$("li.nickSelected").addClass("devoice");
					//$("li.nickSelected .nick").css("color","#fff"); 
		
			
			irc.devoiceNickOnChannel(nickShow.replace("@","").replace("+",""),channelName);
			
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
				id=id.replace("`","CM");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+v </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					//$(this).closest(".mode").addClass("ignoreHim");
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
					
					$("li.nickSelected .nick .nickName").attr("data-voice","voice");
					$("li.nickSelected").removeAttr("style"); 
					$("li.nickSelected").removeClass("devoice");
					$("li.nickSelected .nick").css("color","#000"); 				
		
			
			irc.voiceNickOnChannel(nickShow.replace("@","").replace("+",""),channelName);
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
				id=id.replace("`","CM");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+b </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
					
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
				id=id.replace("`","CM");
					
					var d = new Date();
					var n = d.getHours();
					var m = d.getMinutes();
					
					$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ MODE '+channelName+'</div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">  :+k </div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+nickShow+'</div></div><br>');
					
					$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
					
					//$(this).closest(".mode").removeClass("ignoreHim");
		
			
			irc.kickNickFromChannel(nickShow,channelName,"");
			
		
	}
}

<<<<<<< HEAD
var Channels=["#EZZ","#yarisma","#sohbet"];//,"#carsaf.nl","#35+","#ask","#gurbet","#radyo"];
=======
// Callbacks


var Channels=["#EZZ","#yarisma","#carsaf.nl","#sohbet","#35+","#ask","#gurbet","#radyo"];
>>>>>>> origin/master

irc.onStartConnect = function() {
	$("#myNick").html(userName.charAt(0).toUpperCase() + userName.slice(1));

<<<<<<< HEAD
		$(".kickOut").css("display","none");
		$(".mute").css("display","none");
	
=======
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
>>>>>>> origin/master
}

irc.onConnected = function(success) {console.log("onConnected " + success);
	irc.joinChannel(Channels);
<<<<<<< HEAD
	//userName=new_nick;
		$("#myNick").html(userName.charAt(0).toUpperCase() + userName.slice(1));
=======
>>>>>>> origin/master
};
	
irc.onMessage = function(who, where, text) {console.log("onMessage " + who + " " + where + " " + text);

	// Colored text support
	//var colors=irc.messageColors(text);
	//var text=irc.messageText(text);
	//console.log(colors);
<<<<<<< HEAD
	
	var colors=irc.messageColors(text);
	text=irc.messageText(text);
=======
>>>>>>> origin/master

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

<<<<<<< HEAD
	var text2="";
	var endPoint;
	//alert(colors[0]['bg']);
	
	if(text!="" && where.match(/#/g))
	{
		console.log(colors);
		
		try
		{
			for(var i=0;i<colors.length&&colors[i]['start']<(text.length-1);i++){
				
				if(colors.length==i+1)
				{
					endPoint=text.length-1;
				}
				else
				{
					endPoint=colors[i+1]['start'];
				}
				
				
					//if(typeof colors[i]['bg']!==undefined && typeof colors[i]['fg']!==undefined){
						text2+="<span style='display:inline;background:"+colors[i]['bg']+";color:"+colors[i]['fg']+";'>"+text.substring(colors[i]['start'], endPoint)+"</span>";
					//}
					//else if(typeof colors[i]['bg']!==undefined){
						//text="<span style='background:"+colors[0]['bg']+";'>"+text.substring(colors[i]['start'], 5)+"</span>";
					//}
					//else if(typeof colors[i]['fg']!==undefined){
						//text="<span style='color:"+colors[0]['fg']+";'>"+text.substring(colors[i]['start'], 5)+"</span>";
					//}
				
			}
		}

		catch(e){
			 console.log("Color Err: ",e);
		}
		
=======
	if(text!="" && where.match(/#/g))
	{
>>>>>>> origin/master
		var	channelName=where.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("#","");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
<<<<<<< HEAD
		channelName=channelName.replace("`","CM");
=======
>>>>>>> origin/master

		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();

		//$('#textInput').val('');

		var msgID=channelName+"MsgArea";
<<<<<<< HEAD
		
		if(colors.length<1){text2=text;};

		$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time" style="line-height: 1.3;">['+n+':'+m+']</div><div class="nick" style="color:#20A0B5;line-height: 1.3;">&lt;'+who+'&gt;</div><div class="text" style="line-height: 1.3;">'+text2+'</div></div>');
=======


		$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#20A0B5;">&lt;'+who+'&gt;</div><div class="text" style="">'+text+'</div></div>');
>>>>>>> origin/master

		//$("#"+msgID+ " .messages").animate({ scrollTop: $(this).scrollHeight }, "fast");

		$("#"+msgID+ " .messages")[0].scrollTop=$("#"+msgID+ " .messages")[0].scrollHeight;
	}

	else if(text!="")//if private message
	{
<<<<<<< HEAD
		console.log(colors);
		
		try
		{
			for(var i=0;i<colors.length&&colors[i]['start']<(text.length-1);i++){
				
				if(colors.length==i+1)
				{
					endPoint=text.length-1;
				}
				else
				{
					endPoint=colors[i+1]['start'];
				}
				
				
					//if(typeof colors[i]['bg']!==undefined && typeof colors[i]['fg']!==undefined){
						text2+="<span style='display:inline;background:"+colors[i]['bg']+";color:"+colors[i]['fg']+";'>"+text.substring(colors[i]['start'], endPoint)+"</span>";
					//}
					//else if(typeof colors[i]['bg']!==undefined){
						//text="<span style='background:"+colors[0]['bg']+";'>"+text.substring(colors[i]['start'], 5)+"</span>";
					//}
					//else if(typeof colors[i]['fg']!==undefined){
						//text="<span style='color:"+colors[0]['fg']+";'>"+text.substring(colors[i]['start'], 5)+"</span>";
					//}
				
			}
		}

		catch(e){
			 console.log("Color Err: ",e);
		}
		
=======
>>>>>>> origin/master
		var	channelName=who.replace("+","P");
		channelName=channelName.replace(".","D");
		channelName=channelName.replace("#","");
		channelName=channelName.replace("*","M");
		channelName=channelName.replace("-","S");
		channelName=channelName.replace("/","Dv");
		channelName=channelName.replace("%","Md");
		channelName=channelName.replace("@","AD");
<<<<<<< HEAD
		channelName=channelName.replace("`","CM");
=======
>>>>>>> origin/master

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

<<<<<<< HEAD
		if(colors.length<1){text2=text;};
		
		$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#20A0B5;">&lt;'+who+'&gt;</div><div class="text" style="">'+text2+'</div></div>');
=======

		$("#"+msgID+" .messages").append('<div class="msg privmsg"><div class="time">['+n+':'+m+']</div><div class="nick" style="color:#20A0B5;">&lt;'+who+'&gt;</div><div class="text" style="">'+text+'</div></div>');
>>>>>>> origin/master

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
<<<<<<< HEAD
	$(".activeMsgWindow .messages")[0].scrollTop=$(".activeMsgWindow .messages")[0].scrollHeight;
=======
>>>>>>> origin/master

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
<<<<<<< HEAD
		channelName=channelName.replace("`","CM");
=======
>>>>>>> origin/master
	channelName=channelName.replace(/(?:\r\n|\r|\n)/g, '')

		var d = new Date();
	var n = d.getHours();
	var m = d.getMinutes();
	//alert(who);
	var rightBar="";

	if(who.match(/@/g))
	{
<<<<<<< HEAD
		rightBar='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+who.replace("@","")+'</span></a></li>';
=======
		rightBar='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+who+'</span></a></li>';
>>>>>>> origin/master
		$("#"+channelName+"Persons ul").prepend(rightBar);
	}

	else if(who.match(/\+/g))
	{
<<<<<<< HEAD
		rightBar='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+who.replace("+","")+'</span></a></li>';
=======
		rightBar='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+who+'</span></a></li>';
>>>>>>> origin/master
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

<<<<<<< HEAD
		$("#"+channelName+"Persons .meta").html(user);
=======
		$("#"+channelName+"Persons .meta").html(user+" Users");
>>>>>>> origin/master
	}


	//console.log("#"+channelName+"MsgArea .messages");
	$("#"+channelName+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ '+who+' </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">has joined</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+where+'</div></div><br>');
<<<<<<< HEAD
	
	if($("#"+channelName+"MsgArea .messages").length!=0){
		$("#"+channelName+"MsgArea .messages")[0].scrollTop=$("#"+channelName+"MsgArea .messages")[0].scrollHeight;
	}
=======

>>>>>>> origin/master
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
<<<<<<< HEAD
		channelName=channelName.replace("`","CM");
=======
>>>>>>> origin/master
	channelName=channelName.replace(/(?:\r\n|\r|\n)/g, '')

		var d = new Date();
	var n = d.getHours();
	var m = d.getMinutes();

	$("#"+channelName+"Persons ul li").map(function(i,d){

		var str=$("a .nickName",this).html();
		str=str.replace(" ","");

<<<<<<< HEAD
		if(str==who)
=======
		if(str.match(who))
>>>>>>> origin/master
		{
			//decrease number of users after leaving user
			if($("#"+channelName+"Persons .meta")[0])
			{
				var user=$("#"+channelName+"Persons .meta").html();
				user=Number(user.replace("Users",""));
				user--;

				$("#"+channelName+"OnlineUsers").html(user);

<<<<<<< HEAD
				$("#"+channelName+"Persons .meta").html(user);
=======
				$("#"+channelName+"Persons .meta").html(user+" Users");
>>>>>>> origin/master
			}

			$(this).remove();

			if($("#"+who+"MsgArea").length!=0)
			{
				$("#"+who+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has leaved this channel [</div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;">'+where+']</div></div><br>');
<<<<<<< HEAD
				$("#"+who+"MsgArea .messages")[0].scrollTop=$("#"+who+"MsgArea .messages")[0].scrollHeight;
=======
>>>>>>> origin/master
			}
		}
	});




<<<<<<< HEAD
	if($("#"+channelName+"MsgArea .messages").length!=0){
		//console.log("#"+channelName+"MsgArea .messages");
		$("#"+channelName+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has leaved this channel [</div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;">'+where+']</div></div><br>');
		$("#"+channelName+"MsgArea .messages")[0].scrollTop=$("#"+channelName+"MsgArea .messages")[0].scrollHeight;
	}
=======

	//console.log("#"+channelName+"MsgArea .messages");
	$("#"+channelName+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has leaved this channel [</div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;">'+where+']</div></div><br>');

>>>>>>> origin/master
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

<<<<<<< HEAD
		if(str==who)
=======
		if(str.match(who))
>>>>>>> origin/master
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

<<<<<<< HEAD
			$(".meta",t).html(user);
=======
			$(".meta",t).html(user+" Users");
>>>>>>> origin/master


			$(this).remove();

			$("#"+id).append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has quit (Connection Closed)  </div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;"></div></div><br>');
<<<<<<< HEAD
			
			$("#"+id)[0].scrollTop=$("#"+id)[0].scrollHeight;
=======
>>>>>>> origin/master

			if($("#"+who+"MsgArea").length!=0 && chckI==0)
			{
				chckI++;

				$("#"+who+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">← '+who+' </div><div class="nick" style="color:font-weight: bold;color: #B30000;text-transform: lowercase;">has quit (Connection Closed)  </div><div class="time" style="font-weight: bold;color: #B30000;font-size: 14px;width: auto;padding-left: 0px;"></div></div><br>');
<<<<<<< HEAD
				$("#"+who+"MsgArea .messages")[0].scrollTop=$("#"+who+"MsgArea .messages")[0].scrollHeight;
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
		channelName=channelName.replace("`","CM");

		var msgID=channelName+"MsgArea";
		
		var colors=irc.messageColors(topic);
		text=irc.messageText(topic);

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
		
		var text2="";
		var endPoint;
	
		try
		{
			for(var i=0;i<colors.length&&colors[i]['start']<(text.length-1);i++){
				
				if(colors.length==i+1)
				{
					endPoint=text.length-1;
				}
				else
				{
					endPoint=colors[i+1]['start'];
				}
				
				
					//if(typeof colors[i]['bg']!==undefined && typeof colors[i]['fg']!==undefined){
						text2+="<span style='display:inline;background:"+colors[i]['bg']+";color:"+colors[i]['fg']+";'>"+text.substring(colors[i]['start'], endPoint)+"</span>";
					//}
					//else if(typeof colors[i]['bg']!==undefined){
						//text="<span style='background:"+colors[0]['bg']+";'>"+text.substring(colors[i]['start'], 5)+"</span>";
					//}
					//else if(typeof colors[i]['fg']!==undefined){
						//text="<span style='color:"+colors[0]['fg']+";'>"+text.substring(colors[i]['start'], 5)+"</span>";
					//}
				
			}
		}

		catch(e){
			 console.log("Color Err: ",e);
		}
		
		if(colors.length<1){text2=text;};

		$("#"+msgID+" .messages").append('<div class="msg privmsg" style="border:2px dotted #D4A516;"><div class="time" style="color: #FFED00;font-weight: bold;font-size: 16px;line-height: 1.3;">Topic</div><div class="nick" style="color:#FFFFFF;line-height: 1.3;">&lt;'+channel+'&gt;</div><div class="text" style="background: #3087EC;color:#fff;line-height: 1.3;">'+text2+'</div></div>');
=======

		var msgID=channelName+"MsgArea";



		$("#"+msgID+" .messages").append('<div class="msg privmsg" style="border:2px dotted #D4A516;"><div class="time" style="color: #FFED00;font-weight: bold;font-size: 16px;">Topic</div><div class="nick" style="color:#FFFFFF;">&lt;'+channel+'&gt;</div><div class="text" style="background: #3087EC;color:#fff;">'+topic+'</div></div>');
>>>>>>> origin/master
	},1000);
};
	
irc.onNick = function(old_nick, new_nick) {console.log("onNick " + old_nick + " " + new_nick);

	//var nickName=$(".nick").html();
<<<<<<< HEAD
	if(userName==old_nick){ //check for if my name has changed
=======
	if(userName.match(old_nick)){ //check for if my name has changed
>>>>>>> origin/master
		userName=new_nick;
		$("#myNick").html(userName.charAt(0).toUpperCase() + userName.slice(1));
	}

	if($("#"+old_nick+"Tab").length!=0)
	{
		var d = new Date();
		var n = d.getHours();
		var m = d.getMinutes();

		$("#"+old_nick+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ '+old_nick+' </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">is known as</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+new_nick+'</div></div><br>' + '<div class="time" style="border: 2px dotted #B30000;font-weight: bold;padding-right: 5px;color: #B30000;width: auto;font-size: 14px;">Due to change of his name you cannot send him message from this window.Kindly close this window.Thanks</div>');
<<<<<<< HEAD
		
		$("#"+old_nick+"MsgArea .messages")[0].scrollTop=$("#"+old_nick+"MsgArea .messages")[0].scrollHeight;
=======
>>>>>>> origin/master
	}

	$(".nickName").map(function(i,d){

		var str=$(this).html();
<<<<<<< HEAD
		str=str.replace(" ","").replace("@","").replace("+","");

		if(str==old_nick)
=======
		str=str.replace(" ","");

		if(str.match(old_nick))
>>>>>>> origin/master
		{
			$(this).html(new_nick);

			var id=$(this).closest(".PersonsArea").attr("id");
			id=id.replace("Persons","");

			var d = new Date();
			var n = d.getHours();
			var m = d.getMinutes();

			$("#"+id+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #FD723B;width: auto;font-size: 14px;">→ '+old_nick+' </div><div class="nick" style="color:font-weight: bold;color: #FD723B;text-transform: lowercase;">is known as</div><div class="time" style="font-weight: bold;color: #FD723B;font-size: 14px;width: auto;padding-left: 0px;">'+new_nick+'</div></div><br>');
<<<<<<< HEAD
			
			$("#"+id+"MsgArea .messages")[0].scrollTop=$("#"+id+"MsgArea .messages")[0].scrollHeight;
=======
>>>>>>> origin/master

		}
	});
},
<<<<<<< HEAD

irc.onOp= function(channel, nick) {console.log("onOp " + channel + " " + nick);
		
		nick=nick.replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
		
		var myNck=$("#myNick").html().replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
		//alert(myNck + " " + nick);
		if(myNck==nick){
			$("#myNick").html(nick);
			userName=nick;
		}
			
			$(channel+"Persons .nickName").map(function(i,d){

			var str=$(this).html();
			str=str.replace(" ","");

			if(str==nick)
			{
				$(this).prev(".prefix").remove();
				$(this).before('<span class="prefix">@</span>');
				$(this).html(nick);
				//alert('Operator');
				
				if(myNck==nick)
				{
					if($(channel+"MsgArea").hasClass("activeMsgWindow"))
					{
						$(".kickOut").css("display","inherit");
						$(".mute").css("display","inherit");
					}
					$(channel+"MsgArea").addClass("isOperator");
				}
				
				$(this).closest(".mode").addClass("o").prependTo(channel+"Persons ul");
				
				
				
				var d = new Date();
				var n = d.getHours();
				var m = d.getMinutes();

				$(channel+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #9C2C00;width: auto;font-size: 14px;">→ '+nick+' </div><div class="nick" style="color:font-weight: bold;color: #9C2C00;text-transform: lowercase;">is set as Operator</div><div class="time" style="font-weight: bold;color: #9C2C00;font-size: 14px;width: auto;padding-left: 0px;">(+o)</div></div><br>');
				
				$(channel+"MsgArea .messages")[0].scrollTop=$(channel+"MsgArea .messages")[0].scrollHeight;

			}
		});
		
	
},
	
irc.onDeop= function(channel, nick) {console.log("onDeop " + channel + " " + nick);
	
	nick=nick.replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
	
	//alert(myNck + " " + nick);
	
	var myNck=$("#myNick").html().replace("@","").replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
		
		if(myNck==nick){
			$("#myNick").html(nick);
			userName=nick;
		}
			
			$(channel+"Persons .nickName").map(function(i,d){

			var str=$(this).html();
			str=str.replace(" ","");

			if(str==nick)
			{
				$(this).prev(".prefix").remove();
				$(this).html(nick);
					//alert('deop');
				$(this).closest(".mode").removeClass("o").appendTo(channel+"Persons ul");;
				
				if(myNck==nick)
				{
					if($(channel+"MsgArea").hasClass("activeMsgWindow"))
					{
						$(".kickOut").css("display","none");
						$(".mute").css("display","none");
					}
					$(channel+"MsgArea").removeClass("isOperator");
				}
				
				var d = new Date();
				var n = d.getHours();
				var m = d.getMinutes();

				$(channel+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #545454;width: auto;font-size: 14px;">→ '+nick+' </div><div class="nick" style="color:font-weight: bold;color: #545454;text-transform: lowercase;">is removed from Operator (Deoperator)</div><div class="time" style="font-weight: bold;color: #545454;font-size: 14px;width: auto;padding-left: 0px;">(-o)</div></div><br>');
				
				$(channel+"MsgArea .messages")[0].scrollTop=$(channel+"MsgArea .messages")[0].scrollHeight;

			}
		});
	
},
	
irc.onVoice= function(channel, nick) {console.log("onVoice " + channel + " " + nick);

	nick=nick.replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
		
	$(channel+"Persons .nickName").map(function(i,d){

			var str=$(this).html().replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
			str=str.replace(" ","");

			if(str==nick)
			{
				$(this).prev(".prefix").remove();
				$(this).before('<span class="prefix">+</span>');
				//alert('voice');
				
				$(this).html(nick);

				var d = new Date();
				var n = d.getHours();
				var m = d.getMinutes();
			
				$(this).closest(".mode").addClass("v");

				$(channel+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #9C2C00;width: auto;font-size: 14px;">→ '+nick+' </div><div class="nick" style="color:font-weight: bold;color: #9C2C00;text-transform: lowercase;">has Voiced Now</div><div class="time" style="font-weight: bold;color: #9C2C00;font-size: 14px;width: auto;padding-left: 0px;">(+v)</div></div><br>');
				
				$(channel+"MsgArea .messages")[0].scrollTop=$(channel+"MsgArea .messages")[0].scrollHeight;

			}
		});

},

irc.onDevoice= function(channel, nick) {console.log("onDevoice " + channel + " " + nick);

	nick=nick.replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
		
	$(channel+"Persons .nickName").map(function(i,d){

			var str=$(this).html().replace(" ","").replace(/(?:\r\n|\r|\n)/g, '');
			str=str.replace(" ","");

			if(str==nick)
			{
				$(this).prev(".prefix").remove();
				$(this).html(nick.replace('+',''));
				
				$(this).closest(".mode").removeClass("v");
	//alert('devoice');
				var d = new Date();
				var n = d.getHours();
				var m = d.getMinutes();

				$(channel+"MsgArea .messages").append('<div class="msg privmsg" style="clear: both;position: absolute;"><div class="time">['+n+':'+m+']</div><div class="time" style="font-weight: bold;padding-right: 5px;color: #545454;width: auto;font-size: 14px;">→ '+nick+' </div><div class="nick" style="color:font-weight: bold;color: #545454;text-transform: lowercase;">has Devoiced Now</div><div class="time" style="font-weight: bold;color: #545454;font-size: 14px;width: auto;padding-left: 0px;">(-v)</div></div><br>');
				
				$(channel+"MsgArea .messages")[0].scrollTop=$(channel+"MsgArea .messages")[0].scrollHeight;

			}
		});
},
=======
>>>>>>> origin/master
	
irc.onSelfNick = function(new_nick) {console.log("onSelfNick " + new_nick);},
irc.onSelfQuit = function() {console.log("onSelfQuit"); window.location=".";},
irc.onError = function(message) {console.log("onError " + message);},
irc.onStatus = function(message) {console.log("onStatus " + message);},
<<<<<<< HEAD
irc.onChannelList = function(channels) {console.log("onChannelList"); console.log(channels);},
=======
irc.onChannelList = function(channels) {console.log("onChannelList"); console.log(channels);};
>>>>>>> origin/master
	
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
<<<<<<< HEAD
		channelName=channelName.replace("`","CM");
=======
>>>>>>> origin/master

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

<<<<<<< HEAD
			$("#joinedChannels").append("<li id='"+channelName+"Tab' onclick="+"showThisTab('"+channelName+"',event)"+" class='active'><span>"+ channel+"</span><span id='"+channelName+"OnlineUsers' class='numOfClients' style='background:rgba(9, 191, 57, 0.75);border-radius: 1;display:none;color: #fff;border: 1px solid #DAEBF6;padding-right: 4px;padding-left: 4px;margin-right: -2px;position: relative;left: 0px;height: 18px;'>"+names1.length+"</span><div class='activity'>2</div><span id='close' class='part fa fa-nonexistant'  onclick="+"closeThisTab('"+channelName+"','"+channel+"')"+"></span></li>");

		$(".panels .panel_container.container1").append('<div id="'+channelName+'MsgArea" class="panel activeMsgWindow" style="display: block;"><div class="messages" style="width: 79.9%; border-right-style: none;"></div></div>');

		rightBar1='<div id="'+channelName+'Persons" class="active PersonsArea"><div class="activeChannel">'+channel+'</div><div class="meta">'+names1.length+'</div><ul>';
=======
			$("#joinedChannels").append("<li id='"+channelName+"Tab' onclick="+"showThisTab('"+channelName+"',event)"+" class='active'><span>"+ channel+"</span><span id='"+channelName+"OnlineUsers' class='numOfClients' style='background:rgba(9, 191, 57, 0.75);border-radius: 1;color: #fff;border: 1px solid #DAEBF6;padding-right: 4px;padding-left: 4px;margin-right: -2px;position: relative;left: 0px;height: 18px;'>"+names1.length+"</span><div class='activity'>2</div><span id='close' class='part fa fa-nonexistant'  onclick="+"closeThisTab('"+channelName+"','"+channel+"')"+"></span></li>");

		$(".panels .panel_container.container1").append('<div id="'+channelName+'MsgArea" class="panel activeMsgWindow" style="display: block;"><div class="messages" style="width: 79.9%; border-right-style: none;"></div></div>');

		rightBar1='<div id="'+channelName+'Persons" class="active PersonsArea"><div class="activeChannel">'+channel+'</div><div class="meta">'+names1.length+' Users</div><ul>';
>>>>>>> origin/master

		for(var i=0;i<names1.length;i++)
		{
			if(names1[i].match(/@/g))
			{
<<<<<<< HEAD
				rightBar1+='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i].replace("@","")+'</span></a></li>';
=======
				rightBar1+='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i]+'</span></a></li>';
>>>>>>> origin/master
			}

			else if(names1[i].match(/\+/g))
			{
<<<<<<< HEAD
				rightBar2+='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+names1[i].replace("+","")+'</span></a></li>';
=======
				rightBar2+='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+names1[i]+'</span></a></li>';
>>>>>>> origin/master
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
<<<<<<< HEAD
				rightBar1+='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i].replace("@","")+'</span></a></li>';
=======
				rightBar1+='<li class="mode o"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i]+'</span></a></li>';
>>>>>>> origin/master
			}

			else if(names1[i].match(/\+/g))
			{
<<<<<<< HEAD
				rightBar2+='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+names1[i].replace("+","")+'</span></a></li>';
=======
				rightBar2+='<li class="mode v"><a class="nick"><span class="prefix">+</span><span class="nickName">'+names1[i]+'</span></a></li>';
>>>>>>> origin/master
			}

			else
			{
				rightBar3+='<li class="mode"><a class="nick"><span class="prefix">@</span><span class="nickName">'+names1[i]+'</span></a></li>';
			}
		}

		var num_users=Number($("#"+channelName+"OnlineUsers").html());
		num_users+=names1.length;
		$("#"+channelName+"OnlineUsers").html(num_users);
<<<<<<< HEAD
		$("#"+channelName+"Persons .meta").html(num_users);
=======
		$("#"+channelName+"Persons .meta").html(num_users+" Users");
>>>>>>> origin/master

		rightBar2=rightBar2+rightBar3;

		$("#"+channelName+"Persons ul").prepend(rightBar1);
		$("#"+channelName+"Persons ul").append(rightBar2);
	}
} // Called after joining a new channel
