//初始化加载
$(function() {
	getFollowentEriprise(1,"");
});

function delList(){
	var ids = "";
	$("[type='checkbox']").each(function(){
		if($(this).attr("checked") == "checked"){
			ids += $($(this).parent().next().children()).val() + ",";
		}
	})
	$.ajax({
		type: "post",
		url: url + "/tbuser/delUserAnalysis.do",
		async: false,
		data:{
			ids:ids.substring(0, ids.length - 1)
		},
		success: function(data) {
			if(data.retCode == "0000"){
			   getFollowentEriprise(1,"");
			}
		}
	});
}


// 获取列表
function getFollowentEriprise(pageNum) {
	var pageSize = 10; //每页展示的数据条数
	$.ajax({
		type: "post",
		url: url + "/tbuser/viewsUserAnalysis.do",
		async: false,
		data:{
			pageNum:pageNum,
			pageSize:pageSize,
		},
 		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			$("#listBox").html('');
			if(data.retData.tbUserAnalysisList != null){
				$.each(data.retData.tbUserAnalysisList, function(index, item) {
						var tr = $("<tr>");
						var td0 = $("<td class='fx_quanxuan'>");
						var td1 = $("<td class='fx_xuhao'>");
						var td2 = $("<td class='fx_fxsj'>");
						var td3 = $("<td class='fx_fxlx'>");
						var td4 = $("<td class='fx_fxqy'>");
						var td5 = $("<td class='fx_fxjl'>");
						td0.html("<input type='checkbox' class='choo'/>");
						td1.html(index+1+"<input type='hidden' value="+item.id+" class='choo'/>");
						td2.html(item.createTime);
						td3.html(item.analysisTypel);
						td4.html(item.analysisCompany);
						td5.html("<a href='"+item.analysisUrl+"'>查看</a>");
						tr.append(td0);
						tr.append(td1);
						tr.append(td2);
						tr.append(td3);
						tr.append(td4);
						tr.append(td5);
						$("#listBox").append(tr);
				});
			// 分页
				$('#page').pagination({
					total: data.retData.pageTotal,
					pageSize: pageSize,
					layout: ['first', 'prev', 'links', 'next', 'last','manual'],
					links: 7,
					displayMsg:"",
					beforePageText: '当前',
					afterPageText: '共 {pages} 页',
					onSelectPage: function(pageNumber, pageSize) {
						getFollowentEriprise(pageNumber, pageSize);
					}
				});
			}else{
				var tr = $("<tr>");
				var td = $("<td colspan='7'  scope='col'>");
				td.html("暂无数据");
				tr.append(td);
				$("#listBox").html(tr);
				$("#page").empty();
			}
			// 修改分页文字
			setPageText();
		}
	});
}
function setPageText() {
	$("#page tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#page tr td").eq(1).find(".l-btn-left ").html("上一页");
	$("#page tr td").eq(3).find(".l-btn-left ").html("下一页");
	$("#page tr td").eq(4).find(".l-btn-left ").html("末页");
}

