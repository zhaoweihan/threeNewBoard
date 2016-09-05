$(function(){
	var rightMenu = '<div class="fudnav">';
	rightMenu += '<ul>';
	rightMenu += '<li class="zqy"><a href="findEnterprise.html" title="找企业" id="right_zqy">找企业<b></b></a></li>';
	rightMenu += '<li class="zhy"><a href="findIndustry.html" title="找行业" id="right_zhy">找行业<b></b></a></li>';
	rightMenu += '<li class="zgd"><a href="findShareholder.html" title="找股东" id="right_zgd">找股东<b></b></a></li>';
	rightMenu += '<li class="zdz"><a href="findDefiniteIncrease.html" title="找定增" id="right_zdz">找定增<b></b></a></li>';
	rightMenu += '<li class="zcb"><a href="findEarnings.html" title="找财报" id="right_zcb">找财报<b></b></a></li>';
	rightMenu += '<li class="zzb"><a href="findIndicators.html" title="找指标" id="right_zzb">找指标</a></li>';
	rightMenu += '</ul>';
	rightMenu += '<div class="back_top" style="display:none;"><a href="javascript:;">回顶部</a></div>';
	
	rightMenu += '</div>';
	$("body").append(rightMenu);
	
	var title = $(document).attr("title");
	if(title=="找企业"){
		$("#right_zqy").addClass("hover");
	}
	if(title=="找行业"){
		$("#right_zhy").addClass("hover");
	}
	if(title=="找股东"){
		$("#right_zgd").addClass("hover");
	}
	if(title=="找定增"){
		$("#right_zdz").addClass("hover");
	}
	if(title=="找财报"){
		$("#right_zcb").addClass("hover");
	}
	if(title=="找指标"){
		$("#right_zzb").addClass("hover");
	}
	$(window).on("scroll",function(){
		if ($(this).scrollTop()>100) {
			$(".back_top").show();
		}else{
			$(".back_top").hide();
		}
	})
	var backTopKey=0;
	$(".back_top").on("click",function(){
		if (backTopKey==0) {
			backTopKey=1;
			$("html,body").animate({scrollTop:0},300,function(){
				backTopKey=0;
			});
		}
		
	});
});