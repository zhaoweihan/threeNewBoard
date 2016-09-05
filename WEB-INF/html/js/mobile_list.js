var hm = new HashMap();
var listPage = 1;
$(function() {
	$('.ui-refresh').refresh({
		ready: function() {
			geyList(10);
		},
		load: function(dir, type) {
			geyList(10, this);
		}

	});
});
//获取列表
function geyList(pageSize, me) {
	$.ajax({
		type: "post",
		url: "/bdata-web/admin/pageTag.do",
		async: true,
		data: {
			pageNum: listPage,
			pageSize: pageSize
		},
		success: function(data) {
			if (data.rows.length <= 0) {
				return false;
			}
			$.each(data.rows, function(index, item) {
				if (hm.get(item.tag) != 1) { //排重
					var li = $("<li>");
					var a = $("<a>");
					var em = $("<em>");
					var span = $("<span>");
					a.attr("href", "javascript:;");
					em.html(Number(data.pageNum - 1) * 10 + index + 1);
					span.html("2016-06-13");
					a.append(em);
					a.append(span);
					li.append(a);
					$("#newsList").append(li);
					hm.put(item.tag, 1);
				}
			});
			listPage == 1 ? null : me.afterDataLoading();
			listPage++;
		}
	});
}