
$(document).ready(function(){
	
	changeThisTheme();
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
	
	$("#loading-Bar").css("display","block");
	$("#loading-Bar img").css("height","75px");
	$("#loading-Bar img").attr("src","img/themeChange.gif");
	
	setTimeout(function(){ changeThisTheme(); $("#loading-Bar").css("display","none");},2000);
}

function changeThisTheme(){
		
		
		try{
			var theme=getCookie("themeIrcLPS");
			
			if(theme!=""&&theme=="Love")
			{
				  $("#kiwi .panels .messages").css({"background": "#FFF5F6"});
				  
				  $("#kiwi .panels .messages").css({"background-image":"url(img/flowerRed.png)","background-repeat": "no-repeat","background-size": "400px auto","background-position": "right bottom"});
					
				   $('#headingTurkChat').css({background: "-webkit-gradient(linear, left top, left bottom, from(rgb(249, 101, 101)), to(rgb(230, 53, 67)))" });
				   
				   $('#kiwi td button').css({"background": "#EA3F4A"});
				   $('.server_select.initial').css({"background": "rgba(233, 62, 73, 0.05)","border": "1px solid #FF8688"});
					   
				   $(".panel-header1").css({background: "-webkit-gradient(linear, left top, left bottom, from(rgb(249, 101, 101)), to(rgb(222, 28, 43)))" });
				   
				   $("#kiwi .channel_tools").css({"background":"rgba(226, 42, 54, 0.05)"});
					
					$(".TopicName .text").css({"background": "#FF868D"});
					
					$("#kiwi .memberlists .meta").css({"background": "#FF868D","border-bottom":"1px solid #F76169","border-top": "1px solid #F76169","color": "#fff"});
					
					$("#indexImg").css({"background":"url(img/three-hearts.png)","z-index":"100","position":"absolute","bottom":"0px","right":"0px","height":"200px","width":"320px","background-size":"200px auto","background-repeat":"no-repeat","background-size": "230px"});
					
					$("#dropDownOptions").css({"background":"#EFEDF1"});
					$("#dropDownOptions ul").css({"background":"#EFEDF1"});
					$(".TopicName").attr("style","");
					$(".TopicName").css({"border": "2px dotted #D4A516"});

			}
			
			else if(theme!=""&&theme=="Hallo")
			{
				  $("#kiwi .panels .messages").css({"background": "rgba(255, 255, 255, 1)"});
				  
				  $("#kiwi .panels .messages").css({"background-image":"url(img/imgHalloween.png)","background-repeat": "no-repeat","background-size": "215px auto","background-position": "right bottom"});
					
				   $('#headingTurkChat').css({background: "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(255, 244, 103)), to(rgb(249, 173, 28)))" });
				   
				   $('#kiwi td button').css({"background": "rgb(252, 208, 65)"});
				   $('.server_select.initial').css({"background": "#fff","border": "1px solid rgba(0, 0, 0,0.2)","top":"-42px","position": "relative;"});
					   
				   $(".panel-header1").css({background: "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(253, 224, 143)), to(rgb(255, 187, 0)))" });
				   
				   $("#kiwi .channel_tools").css({"background":"rgba(226, 42, 54, 0.05)"});
					
					$(".TopicName .text").css({"background": "#000"});
					
					$(".TopicName").css({"border": "5px solid transparent","-webkit-border-image":"url(img/border.png) 30 stretch","-o-border-image":"url(img/border.png) 30 stretch","border-image": "url(img/border.png) 30 stretch"});
					
					$("#kiwi .memberlists .meta").css({"background": "#FED76B","border-bottom":"1px solid rgb(251, 202, 67)","border-top": "1px solid rgb(251, 202, 67)","color": "#6B6B6B"});
					
					$("#indexImg").css({"background":"url(img/halloween.png)","z-index":"100","position":"relative","bottom":"0px","right":"0px","height":"200px","width":"320px","background-size":"200px auto","background-repeat":"no-repeat","background-size": "320px auto","margin":"0 auto","background-position":"2px"});
					
					$("#dropDownOptions").css({"background":"#EFEDF1"});
					$("#dropDownOptions ul").css({"background":"#EFEDF1"});

			}
			
			else if(theme!=""&&theme=="Happ")
			{
				  $("#kiwi .panels .messages").css({"background": "rgba(255, 255, 255, 1)"});
				  
				  $("#kiwi .panels .messages").css({"background-image":"url(img/happinessImg.png)","background-repeat": "no-repeat","background-size": "215px auto","background-position": "right bottom"});
					
				   $('#headingTurkChat').css({"background": "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(251, 71, 77)), to(rgb(255, 155, 162)))"});
				   
				  /* var meta = $("#headingTurkChat")
meta.css("background-image", "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #333), color-stop(100%, #222))");
meta.css("background-image", "-webkit-linear-gradient(top, #333 0%,#222 100%)");
meta.css("background-image", "-moz-linear-gradient(top, #333 0%,#222 100%)");
meta.css("background-image", "-o-linear-gradient(top, #333 0%,#222 100%)");
meta.css("background-image", "linear-gradient(top, #333 0%,#222 100%)");*/
				   
				   //$('#headingTurkChat').css({background:"transparent linear-gradient(to bottom, rgb(251, 71, 77) 0%, rgb(251, 71, 77) 50%, rgb(255, 155, 162) 51%, rgb(255, 155, 162) 100%) repeat scroll 0% 0% / cover"});
				   
				   $('#kiwi td button').css({"background": "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(63, 139, 202)), to(rgb(125, 137, 239)))"});
				   $('.server_select.initial').css({"background": "#fff","border": "1px solid rgba(0, 0, 0,0.2)","top":"-42px","position": "relative;"});
					   
				   $(".panel-header1").css({background: "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(251, 71, 77)), to(rgb(255, 155, 162)))" });
				   
				   $("#kiwi .channel_tools").css({"background":"rgba(226, 42, 54, 0.05)"});
					
					$(".TopicName .text").css({"background": "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(63, 139, 202)), to(rgb(165, 174, 251)))"});
					
					$(".TopicName").css({"border": "5px solid transparent","-webkit-border-image":"url(img/border.png) 30 stretch","-o-border-image":"url(img/border.png) 30 stretch","border-image": "url(img/border.png) 30 stretch"});
					
					$("#kiwi .memberlists .meta").css({"background": "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(255, 245, 99)), to(rgb(255, 223, 104)))","border-bottom":"1px solid rgb(224, 204, 86)","border-top": "1px solid rgb(243, 234, 105)","color": "rgb(62, 62, 62)"});
					
					$("#indexImg").css({"background":"url(img/balloons.png)","z-index":"100","position":"relative","bottom":"0px","right":"0px","height":"172px","width":"320px","background-repeat":"no-repeat","background-size": "320px auto","margin":"0 auto","background-position":"0px 0px","background-size":"170px auto"});
					
					$("#dropDownOptions").css({"background":"#EFEDF1"});
					$("#dropDownOptions ul").css({"background":"#EFEDF1"});

			}
			
			else{
				DefualtTheme();
				
				if($(".full_screen_icon").hasClass("small_screen_icon")){
					full=0;
					make_FullScreen();
				}
			}
		}
		
		catch(e){
			DefualtTheme();
		}
		
		if(!$(".close_icon1").hasClass("close_icon1_img")&&!$(".active").hasClass("privateMsgTAb")){
			$(".messages").css({"width":"79.9%"});
		}
		
		else{
			$(".messages").css({"width":"98%"});
		}
}

function DefualtTheme(){
	
	$("#kiwi .panels .messages").attr("style","");
				  
	$("#kiwi .panels .messages").attr("style","");;
					
	$('#headingTurkChat').attr("style","");;
				   
		   
	$(".panel-header1").attr("style","");;
				   
	$("#kiwi .channel_tools").attr("style","");;
					
	$(".TopicName .text").css("background","#3087EC");
					
	$("#kiwi .memberlists .meta").attr("style","");
					
	//$("#indexImg").css({"background":"url(img/indexImg2.png)","z-index":"100","position":"absolute","bottom":"0px","right":"0px","height":"200px","width":"320px","background-size":"200px auto","background-repeat":"no-repeat","background-size": "320px"});
	$("#indexImg").css("background","none");
	
	$("#dropDownOptions").attr("style","");
	$("#dropDownOptions ul").attr("style","");
	$(".TopicName").attr("style","");
	$(".TopicName").css({"border": "2px dotted #D4A516"});
}