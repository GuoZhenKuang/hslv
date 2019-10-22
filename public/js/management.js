// JavaScript Document
$(document).ready(function(){
	/*目录树的收缩*/
	$("#left span").each(function(){
		$(this).click(function(){
			if($(this).siblings("ul").is(':hidden')){
				$(this).siblings("ul").show();
			}else{
				$(this).siblings("ul").hide();
			}
		});
	});
	/*main的初始化*/
	var csh=function(){
		var width=$(window).width()-220;
		var width2=$(window).width()-200;
		var height=$(window).height()-150;
		$("main").css("width",width);
		$("main").css("height",height);
		$("#header").css("width",width2);	
	};
	csh();
	$(window).resize(function(){
		csh();
	});
	/*单击后状态变化*/
	$(".file").click(function(){
		var text='后台管理系统 · '+$(this).text()+'部分';
		$("#header p").text(text);
		claercss();
		$(this).css("color","#64b3f4");
	});
	var claercss=function(){
		$(".clear").each(function(){
			$(this).css("color","white");
		});
	};
	/**/
	$("#datauser").click(function(){
		ty();
		$("#user").show();
	});
	$("#dataview").click(function(){
		ty();
		$("#view").show();
	});
	$("#dataarticle").click(function(){
		ty();
		$("#article").show();
	});
	$("#datacomment").click(function(){
		ty();
		$("#comment").show();
	});	
	$(".glyphicon-tasks").click(function(){
		ty();
	});
	$(".glyphicon-user").click(function(){
		ty();
	});	
	$("#datapower").click(function(){
		ty();
		$("#power").show();
	});		
	
	var ty=function(){
		$("iframe").each(function(){
			$(this).hide();
		});
	};
});		