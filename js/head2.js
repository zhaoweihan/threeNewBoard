$(function() {

	var header2 = '<div class="head_2">';
	header2 += '<div class="head_2_box">';
	header2 += '<div class="head_2_left"><a href="home.html"><img src="images/logo2.png" alt="圣康研究院" /></a></div>';
	header2 += '<div class="head_2_center">';
	header2 += '<input type="text" id="searchStockDetail" placeholder="请输入股票代码/企业简称"/>';
	header2 += '<a href="javascript:;" id="searchTop">搜索</a> </div>';
	header2 += '<div class="head_2_right"><span ><img src="images/user_tx.jpg" width="40" height="40" id="headImg" /></span><a href="userInformation.html" class="username" id="userName"></a><a href="javascript:;" class="exit" id="dropOut">退出</a></div>';
	header2 += '</div></div>';
	$("body").prepend(header2);
	/*搜索*/
	$("#searchStockDetail").autocomplete({
		minLength: 2,
		source: function(request, response) {
			autocomplete(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			window.location.href = 'industryResearch.html?stockCode=' + item.code + '&stockName=' + encodeURI(item.name);
		}
	});
	/**
	 * 添加回车事件
	 */
	$("#searchStockDetail").keydown(function(e) {
		if(e.keyCode==13){
			$("#searchTop").click();
		}
	});
	$("#searchTop").on("click", function() {
		if ($("#searchStockDetail").val() != "") {
			if (searchList.length != 0) {
				$.each(searchList, function(index, flag) {
					if ($.trim($("#searchStockDetail").val()) == flag.name || $.trim($("#searchStockDetail").val()) == flag.code) {
						window.location.href = 'industryResearch.html?stockCode=' + flag.code + '&stockName=' + encodeURI(flag.name);
					} else {
						index == searchList.length - 1 ? $.zmAlert("请输入正确的检索信息") : null;
					}
				});
			} else {
				$.zmAlert("请输入正确的检索信息");
			}

		} else {
			$.zmAlert("请输入要检索的信息");
		}
	});
	//点击退出
	$("#dropOut").on("click", dropOut);
	//判断是否有用户名
	if ($.cookie("userName") != undefined&&$.cookie("userName") != null&&$.cookie("userName") != "") {
		$("#userName").html($.cookie("userName"));
	} else {
		$("#userName").html($.cookie("phone").slice(0, 3) + "****" + $.cookie("phone").slice(7, 11));
	}
	if ($.cookie("headImg") != undefined&&$.cookie("headImg") != null&&$.cookie("headImg") != ""&&$.cookie("headImg") != "null") {
		$("#headImg").attr("src", $.cookie("headImg"));
	} else {
		$("#headImg").attr("src", "images/deault_head.png");
	}
});