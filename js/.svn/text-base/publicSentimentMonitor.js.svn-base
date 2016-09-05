if (getUrlParam("stockCode") == null || getUrlParam("stockCode") == undefined) {
	//window.location.href='home.html';
}
$(function() {
	risk();
	meeting(1);
});

//风险因素
function risk() {
	$.ajax({
		type: "post",
		url: url + "/tbuser/viewCompanyAnnouncement.do",
		async: true,
		data: {
			announcementType: 1, //公告类型 number
			pageNum: 1, //当前页码 number 默认值1
			pageSize: 99, //每页条数 number
			stockCode: getUrlParam("430002") //股票代码
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if (data.retCode == 0000) {
				//切换选中类型
				if (data.retData != null) {
					var result = data.retData;
					if (result.shareStructureList == null) { //如果列表为null 提示没有数据
						$("#finstaList").html("暂无数据");
						return false;
					}
					$("#finstaList").empty();
					$.each(result.shareStructureList, function(index, item) {
						var li = $("<li>");
						var a = $("<a href='javascript:;'>");
						var span = $("<span>");
						var i = $("<i>下载</i>");
						var announcementName='';
						if (item.announcementName.length>30) {
							announcementName=item.announcementName.substring(0,32);
							 a.html(announcementName+"...");
						}else{
							a.html(item.announcementName);
						}
						span.html(item.announcementTime);
						i.on("click", function() {
							download(item.announcementUrl,item.announcementName);
						})
						li.append(a).append(span).append(i);
						$("#finstaList").append(li);
					});
				}

			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}

//会议决议
function meeting(pageNum) {
	var pageSize = 10; //每页展示的数据条数
	$.ajax({
		type: "post",
		url: url + "/tbuser/viewCompanyAnnouncement.do",
		async: true,
		data: {
			announcementType: 8, //公告类型 number
			pageNum: pageNum, //当前页码 number 默认值1
			pageSize: pageSize, //每页条数 number
			stockCode: getUrlParam("stockCode") //股票代码
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if (data.retCode == 0000) {
				//切换选中类型
				if (data.retData != null) {
					var result = data.retData;
					if (result.shareStructureList == null) { //如果列表为null 提示没有数据
						$("#meetingList").html("暂无数据");
						return false;
					}
					$("#meetingList").empty();
					$.each(result.shareStructureList, function(index, item) {
						var li = $("<li>");
						var a = $("<a href='javascript:;'>");
						var span = $("<span>");
						var i = $("<i>下载</i>");
						var announcementName='';
						if (item.announcementName.length>30) {
							 announcementName=item.announcementName.substring(0,32);
							 a.html(announcementName+"...");
						}else{
							a.html(item.announcementName);
						}
						span.html(item.announcementTime);
						i.on("click", function() {
							window.location.href = item.announcementUrl;
						})
						li.append(a).append(span).append(i);
						$("#meetingList").append(li);
					});
					//console.log(data.pageTotal);
					//分页
					$('#meetingPage').pagination({
						total: result.pageTotal,
						pageSize: pageSize,
						layout: ['first', 'prev', 'links', 'next', 'last', 'manual'],
						links: 7,
						beforePageText: '当前',
						afterPageText: '共 {pages} 页',
						displayMsg: "",
						onSelectPage: function(pageNumber, pageSize) {
							meeting(pageNumber);
						}
					});
					//修改分页文字
					setPageText();
				}
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
//修改分页文字
function setPageText() {
	$("#meetingPage tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#meetingPage tr td").eq(1).find(".l-btn-left ").html("上一页");
	$("#meetingPage tr td").eq(3).find(".l-btn-left ").html("下一页");
	$("#meetingPage tr td").eq(4).find(".l-btn-left ").html("末页");
}