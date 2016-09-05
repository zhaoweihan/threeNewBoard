$(function(e) {
	$(".ksjs_box ul li").mouseover(function() {
		$(".ksjs_box ul li").not(this).removeClass("hover");
		$(this).addClass("hover");
	}).mouseout(function() {
		$(".ksjs_box ul li").removeClass("hover");
	});

	$(".data_tab_title a").click(function() {
		$(this).addClass("hover").siblings().removeClass("hover");
		$(".dataAnalysisTable").hide();
		var ind = $(this).index();
		$(".ksjs_bb").find(".data_xl_box").hide();
		$(".ksjs_bb").find(".data_xl_box").eq(ind).show();

	});
	$(".shouqi").on("click", function() {
		$(this).parent().slideUp();
	});

	$(".ef").on("click", function() {
		var sortParam = $(this).attr("data-tag");
		if ($(this).hasClass("sort")) {
			if ($(this).children().hasClass("up_s")) {
				$(this).children().removeClass();
				$(this).children().addClass("dow_s");
				changSort(sortParam, -1);
				return false;
			}
			if ($(this).children().hasClass("dow_s")) {
				$(this).children().removeClass();
				$(this).children().addClass("up_s");
				changSort(sortParam, 1);
				return false;
			}

		} else {
			$(this).addClass("sort").siblings().removeClass("sort");
			$(this).children().addClass("up_s");

			changSort(sortParam, 1);
		}

	});
	$('.click3').on('click', function() {
		$('#selectList').slideToggle();
		$('#selectList li').on('click', function() {
			var text = $(this).text();
			$("#selectVal").html(text);
			$('#selectList').slideUp();
		});
	});

	/**找企业点击更多/收起**/
	$(".select_right a").on("click", function() {
		if ($(this).hasClass("gengduo")) {
			$(this).removeClass("gengduo").addClass("shouqi").html("收起∧");
			$(this).parents(".select_body").siblings().find(".shouqi").removeClass().addClass("gengduo").html("更多∨");
			$(this).parents(".select_list").siblings().find(".shouqi").removeClass().addClass("gengduo").html("更多∨");
			$(this).parent().parent().addClass("body_more").siblings().removeClass("body_more");
			$(this).parent().parent().parent().parent().addClass("more_gd");
			e.stopPropagation();

		} else if ($(this).hasClass("shouqi")) {
			$('.body_info').scrollTop(0);
			$(this).removeClass("shouqi").addClass("gengduo").html("更多∨")
			$(this).parent().parent().removeClass("body_more");
			$(this).parent().parent().parent().parent().removeClass("more_gd");
			e.stopPropagation();
		}
	});

	$(".hangye_box a").on("click", function() {
		$(this).addClass("hover").siblings().removeClass("hover");
	});

	/***关注企业**//*
	$(".gz span").on("click", function() {
		if ($(this).hasClass("ygz")) {
			$(this).removeClass("ygz").addClass("wgz");
		} else if ($(this).hasClass("wgz")) {
			$(this).removeClass("wgz").addClass("ygz");
		}
	});*/
	/**全选**/
	$("#selectAll").change(function() {
		var innum = $(".choo").length;
		if ($(this).prop("checked")) {
			$(".choo").prop("checked", true);
		} else {
			$(".choo").prop("checked", false);
		}
	});

});

/**企业详情列表切换tab标题点击效果***/
$(document).ready(function(e){
//	$(".center_title a").on("click",function(){
//		var inx = $(this).index();
//		$(this).addClass("hover").siblings().removeClass("hover");
//	});
})


function selectChckBoxAll(){
	$("#selectAll").change(function() {
		var innum = $(".choo").length;
		if ($(this).prop("checked")) {
			$(".choo").prop("checked", true);
		} else {
			$(".choo").prop("checked", false);
		}
	});
}

/**财务数据页面财务三表鼠标经过同行背景变色**/
$(document).ready(function(){
	$(".center_table ul li span").mouseover(function(){
		a=$(this).index();
		$("li").each(function(){
    $(this).find("span").eq(a).css("background","#e3f1f4").siblings().css("background","");
  });
		
	})
})
