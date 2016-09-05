//初始化加载
$(function() {
		getFollowentEriprise(1,"");
});

//按条件查询
$("#search").click(function(){
	getFollowentEriprise(1,serchFollowent());
});

//获取查询条件
function serchFollowent(){
	var datas = "";
	if($("#cd").val() != ""){
		datas = datas + $("#cd").val();
	}
	return datas;
}

//回车触发查询
$("#cd").keydown(function(e) {
	if(e.keyCode==13){
		$("#search").click();
	}
});

// 获取列表
function getFollowentEriprise(pageNum,datas) {
	var pageSize = 10; //每页展示的数据条数
	if(datas!=null && datas.length>0){
		conditions = datas;
	}else{
		conditions="";
	}
	$.ajax({
		type: "post",
		url: url + "/tbuser/viewTbUserCompany.do",
		async: false,
		data:{
			pageNum:pageNum,
			pageSize:pageSize,
			condition:conditions
		},
 		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			$("#listBox").html('');
			if(data.retData.enterpriseDataList != null){
				$.each(data.retData.enterpriseDataList, function(index, item) {
						var tr = $("<tr>");
						var td1 = $("<td class='gzgpdm'>");
						var td2 = $("<td class='gzqyjc'>");
						var td3 = $("<td class='gzjyfs'>");
						var td4 = $("<td class='gzsshy'>");
						var td5 = $("<td class='gzdq'>");
						var td6 = $("<td class='gz'>");
						td1.html("<a href='/industryResearch.html?stockCode="+item.stockCode+"&stockName="+encodeURI(item.companyForShort)+"'>"+item.stockCode+"</a>");
						td2.html("<a href='/industryResearch.html?stockCode="+item.stockCode+"&stockName="+encodeURI(item.companyForShort)+"'>"+item.companyForShort+"</a>");
						td3.html(item.dealType);
						td4.html(item.industry);
						td5.html(item.territory);
						td6.html("<span class='ygz' title='点击取消关注' ></span>");
						td6.on("click", function(){
								deleCompany(item.stockCode);
								$(this).parent().remove();
						});
						tr.append(td1);
						tr.append(td2);
						tr.append(td3);
						tr.append(td4);
						tr.append(td5);
						tr.append(td6);
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
						getFollowentEriprise(pageNumber, pageSize,serchFollowent());
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

