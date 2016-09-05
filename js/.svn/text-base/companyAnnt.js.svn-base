var hm = new HashMap();
$(function() {
	//公司公告
	companyAnnt(1, 1);
	$("#companyAnntBtns>a").on("click", function() {
		if(hm.get($(this).attr("data-num") + "-1") === undefined) {
			companyAnnt($(this).attr("data-num"), 1,1);
		} else {
			cantCabllback(hm.get($(this).attr("data-num") + "-1"), hm.get($(this).attr("data-num") + "-pageTotal"), 10, $(this).attr("data-num"),1);
		}

	});
	//公司财报
	FinancialStatements(1);
	$("#finstaBtn>a").on("click", function() {
		FinancialStatements($(this).attr("data-num"));
	});
});

function companyAnnt(announcementType, pageNum,flag) {
	var pageSize = 10; //每页展示的数据条数
	$.ajax({
		type: "post",
		url: url + "/tbuser/viewCompanyAnnouncement.do",
		async: false,
		data: {
			announcementType: announcementType, //公告类型 number
			pageNum: pageNum, //当前页码 number 默认值1
			pageSize: pageSize, //每页条数 number
			stockCode: getUrlParam("stockCode") //股票代码
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
			$(".loadingBox").show();
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				//切换选中类型
				if(hm[announcementType + "-" + pageNum] == undefined) {
					hm.put(announcementType + "-" + pageNum, result.shareStructureList);
					hm.put(announcementType + "-pageTotal", result.pageTotal);
					var shareStructureList = result.shareStructureList;
				}
				if(data.retData != null) {
					cantCabllback(result.shareStructureList, result.pageTotal, pageSize, announcementType,flag);
				}
			} else {
				$(".loadingBox").hide();
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
//修改分页文字
function setPageText() {
	$("#companyAnntPage tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#companyAnntPage tr td").eq(1).find(".l-btn-left ").html("上一页");
	$("#companyAnntPage tr td").eq(3).find(".l-btn-left ").html("下一页");
	$("#companyAnntPage tr td").eq(4).find(".l-btn-left ").html("末页");
}

function FinancialStatements(financialType) {
	$.ajax({
		type: "post",
		url: url + "/tbuser/viewFinancialStatements.do",
		async: true,
		data: {
			financialType: financialType, //公告类型 number
			pageNum: 1, //当前页码 number 默认值1
			pageSize: 99, //每页条数 number
			stockCode: getUrlParam("stockCode") //股票代码
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				//切换选中类型
				$("#finstaBtn>a[data-num='" + financialType + "']").addClass("hover").siblings().removeClass("hover");
				if(data.retData != null) {
					var result = data.retData;
					if(result.shareStructureList == null) { //如果列表为null 提示没有数据
						$("#finstaList").html("暂无数据");
						return false;
					}
					$("#finstaList").empty();
					$.each(result.shareStructureList, function(index, item) {
						var li = $("<li>");
						var a = $("<a href='javascript:;'>");
						var span = $("<span>");
						var i = $("<i>下载</i>");
						var financialName = '';
						if(item.financialName.length > 30) {
							financialName = item.financialName.substring(0, 32);
							a.html(financialName + "...");
						} else {
							a.html(item.financialName);
						}
						span.html(item.financialYear);
						i.on("click", function() {
							download(item.financialStatements, item.financialName);
						})
						li.append(a).append(span).append(i);
						$("#finstaList").append(li);
					});
				}

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

function cantCabllback(list, pageTotal, pageSize, announcementType,flag) {
	$("#companyAnntBtns>a[data-num='" + announcementType + "']").addClass("hover").siblings().removeClass("hover");
	if(list == null) { //如果列表为null 提示没有数据
		$("#companyAnntList").html("暂无数据");
		$('#companyAnntPage').empty();
		$(".loadingBox").hide();
		return false;
	}
	$("#companyAnntList").empty();

	$.each(list, function(index, item) {
		var li = $("<li>");
		var a = $("<a href='javascript:;'>");
		var span = $("<span>");
		var i = $("<i>下载</i>");
		var announcementName = '';
		if(item.announcementName.length > 30) {
			announcementName = item.announcementName.substring(0, 32);
			a.html(announcementName + "...");
		} else {
			a.html(item.announcementName);
		}
		span.html(item.announcementTime);
		i.on("click", function() {
			download(item.announcementUrl, item.announcementName);
		})
		li.append(a).append(span).append(i);
		$("#companyAnntList").append(li);
	});

	//分页
	flag==1?$('#pageBox').html("<div class='pages' id='companyAnntPage"+announcementType+"'></div>"):null;
		$('#companyAnntPage'+announcementType).pagination({
		total: pageTotal,
		pageSize: pageSize,
		layout: ['first', 'prev', 'links', 'next', 'last', 'manual'],
		links: 7,
		beforePageText: '当前',
		afterPageText: '共 {pages} 页',
		displayMsg: "",
		onSelectPage: function(pageNumber, pageSize) {
			var type = $("#companyAnntBtns>a.hover").attr("data-num");
			if(hm.get(type + "-"+pageNumber) === undefined) {
				companyAnnt(type, pageNumber);
			} else {
				cantCabllback(hm.get(type + "-"+pageNumber), hm.get(type + "-pageTotal"), 10, type);
			}
			
		}
	});
	//修改分页文字
	setPageText();
	$(".loadingBox").hide();
}