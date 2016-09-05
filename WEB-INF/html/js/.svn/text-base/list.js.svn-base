$(function() {
	geyList(1, 10);
});
//修改分页文字
function setPageText() {
	$("#page tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#page tr td").eq(1).find(".l-btn-left ").html("上一页");
	$("#page tr td").eq(3).find(".l-btn-left ").html("下一页");
	$("#page tr td").eq(4).find(".l-btn-left ").html("末页");
	var w=$("#page table").width();
	$("#page table").css("margin-left",-w/2);
	
}
//获取列表
function geyList(pageNum, pageSize) {
	$.ajax({
		type: "post",
		url: "/bdata/admin/pageTag.do",
		async: false,
		data: {
			pageNum: pageNum,
			pageSize: pageSize
		},
		success: function(data) {
			$(".list_box").html('');
			$.each(data.rows, function(index, item) {
					var div = $("<div>");
					var a = $("<a>");
					var p = $("<p>");
					var h2 = $("<h2>");
					var a2 = $("<a>");
					var p2=$("<p>");
					a.attr("href", "javascript:;");
					a2.attr("href", "javascript:;").html('阅读全文');
					h2.html('卖馄饨阿姨3000元入市赚500万 称炒股不能盲目');
					p.html('在最近热播的炒股类节目中，走出了一位闻名全国的“馄饨阿姨”，靠着卖馄饨积攒的3000元入市，积累了近... ');
					p2.html(item.tag);
					div.addClass("list_info clr");
					a.html(h2);
					p.append(a2);
					div.append(a);
					div.append(p);
					div.append(p2);
					$(".list_box").append(div);
			});
			//分页
			$('#page').pagination({
				total: data.pageCount,
				pageSize: pageSize,
				layout: ['first', 'prev', 'links', 'next', 'last', 'manual'],
				links: 7,
				beforePageText: '当前',
				afterPageText: '共 {pages} 页',
				displayMsg:"",
				onSelectPage: function(pageNumber, pageSize) {
					geyList(pageNumber, pageSize);
				}
			});
			//修改分页文字
			setPageText();
		}
	});
}