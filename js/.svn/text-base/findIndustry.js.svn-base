$(function(){
	
	$("#trade2").hide();

	//导出表格选中信息
	$("#exportTable").click(function(){
		var stockCodes = "";
		$("[type='checkbox']").each(function(){
			if($(this).attr("checked") == "checked"){
				stockCodes += $(this).parent().next().text() + ",";
			}
		})
		location.href = url + "/export/exportCompanyMsg.do?stockCodes="+stockCodes.substring(0, stockCodes.length - 1);
	})
	
	//查询行业信息
	commonFindTrade(1,"hangye1","hangye2","","condition","hangye2","area","tc","","findIndustry");
	
	//查询全部列表
	getIndustryList(1,20,"");
	
	//进行我的检索条件回显
	if(	decodeURI(getUrlParam("primaryIndustries")) != "null" || getUrlParam("secondaryIndustries") != "null"){
		if(decodeURI(getUrlParam("primaryIndustries")) != "null"){
			$("#hangye1 a").each(function(){
				if(this.dataset.value == decodeURI(getUrlParam("primaryIndustries"))){
					$(this).addClass("hover");
					findTrade2("hangye2", this.dataset.value, "condition", "hangye2", "area", "tc", "", "findIndustry");
				}
			})
		}
		if(decodeURI(getUrlParam("secondaryIndustries")) != "null"){
			$("#hangye2 a").each(function(){
				if(this.dataset.value == decodeURI(getUrlParam("secondaryIndustries"))){
					$(this).addClass("hover");
				}
			});
		}
		retrieveCondition("condition", "hangye2", "area", "tc", "", "findIndustry");
	}
	
	//清空查询条件
	$("#emptyCondition").click(function(){
		$("#condition").empty();
		$("#hangye1 a").each(function(){
			$(this).removeClass("hover");
		})
		$("#hangye2 a").each(function(){
			$(this).removeClass("hover");
		})
		$("#trade2").hide();
		getIndustryList(1,20,"");
	})
	
	//点击保存弹出弹框
	$("#showConditionWindow").click(function(){
		//拼出显示检索条件
		var searchConditionStr = "";
		var searchName = "";
		$($("#condition").children()).each(function(){
			if(this.dataset.type == "trade1" || this.dataset.type == "trade2"){
				if(this.dataset.type == "trade2"){
					searchConditionStr += "二级行业：" + this.dataset.value + '\n';
					searchName += this.dataset.value + "+";
				}else{
					searchConditionStr += "一级行业：" + this.dataset.value + '\n';
					searchName += this.dataset.value + "+";
				}
			}
		})
		if(searchConditionStr != ""){
			$("#conditionContent").text(searchConditionStr);
			$("#conditionName").val("找行业：" + searchName.substring(0, searchName.length - 1));
			$("#defindName").hide();
			$("html,body").css("overflow","hidden");
			$(".tcbackground").show();
			$(".qrdele").show();
		}else{
			$("#choiceCondition").show();
		}
	})
	
	//点击取消弹框
	$("[name='cancel']").click(function(){
		$("html,body").css("overflow","auto");
		$(".tcbackground").hide();
		$(".qrdele").hide();
	})
	
	//保存筛选条件
	$("#saveCondition").click(function(){
		//拼出检索条件
		var searchConditionStr = '{';
		var searchUrl = "findIndustry.html?";
		$($("#condition").children()).each(function(){
			if(this.dataset.type == "trade1" || this.dataset.type == "trade2"){
				if(this.dataset.type == "trade2"){
					searchConditionStr += '"secondaryIndustries":' + this.dataset.value + ',';
					searchUrl += "secondaryIndustries=" + encodeURI(this.dataset.value) + '&';
				}else{
					searchConditionStr += '"primaryIndustries":' + this.dataset.value + ',';
					searchUrl += "primaryIndustries=" + encodeURI(this.dataset.value) + '&';
				}
			}
		})
		searchConditionStr = searchConditionStr.substring(0, searchConditionStr.length - 1);
		searchConditionStr += "}";
		$.ajax({
			type:"post",
			url: url + "/common/addSearchMessage.do",
			async:true,
			data:{
				searchType:2,
				searchCondition:searchConditionStr,
				analysisUrl:searchUrl.substring(0, searchUrl.length - 1),
				searchName:$("#conditionName").val()
			},
			beforeSend:function(xhr){
				xhr.setRequestHeader("UU");
				xhr.setRequestHeader("phone");
			},
			success:function(data){
				if (data.retCode!=0000) {
					errorAlert(data.retCode,data.retMsg);
				}else{
					$.zmAlert("添加成功！");
					$(".tcbackground").hide();
					$(".qrdele").hide();
				}
			}
		});
	})
})

function checkConditionName(){
	if($("#conditionName").val().length > 0){
		$("#defindName").hide();
	}else{
		$("#defindName").show();
	}
}

//删除单个条件
function delOne(data,type){
	
	if(type == "trade1"){
		$("#hangye1 a").each(function(){
			$(this).removeClass("hover");
		})
	}
	if(type == "trade2"){
		$("#hangye2 a").each(function(){
			$(this).removeClass("hover");
		})
	}
	$(data).parent().remove();
	getIndustryList(1,20,getIndustryCondition());
}

//获取查询条件
function getIndustryCondition(){
	var datas = "";
	$($("#condition").children()).each(function(){
		if(this.dataset.type == "trade1" || this.dataset.type == "trade2"){
			if(this.dataset.type == "trade2"){
				datas += "&secondaryIndustries=" + this.dataset.value;
			}else{
				datas += "&primaryIndustries=" + this.dataset.value;
			}
		}
	})
	return datas;
}

//获取列表
//datas样例：datas="aaa=bbb&ccc=ddd"
function getIndustryList(pageNum, pageSize,datas) {

	if(datas == null && !datas.length > 0){
		datas = "";
	}
	
	$.ajax({
		type: "post",
		url: url + "/enterprise/findList.do",
		async: false,
		data: "pageNum="+pageNum+"&pageSize="+pageSize+datas,
		success: function(data) {
			if(data.retCode == 0000){
				$("#listBox").html('');
				if(data.retData.enterpriseList != null){
					$.each(data.retData.enterpriseList, function(index, item) {
							var tr = $("<tr>");
							var td1 = $("<td class='quanxuan'>");
							var td2 = $("<td class='gpdm'>");
							var td3 = $("<td class='qyjc'>");
							var td4 = $("<td class='jyfs'>");
							var td5 = $("<td class='sshy'>");
							var td6 = $("<td class='diqu'>");
							var td7 = $("<td class='gz'>");
							td1.html("<input type='checkbox' class='choo'/>");
							td2.html("<a href='"+url+"/industryResearch.html?stockCode="+item.stockCode+"&stockName="+encodeURI(item.companyForShort)+"'>"+item.stockCode+"</a>");
							td3.html("<a href='"+url+"/industryResearch.html?stockCode="+item.stockCode+"&stockName="+encodeURI(item.companyForShort)+"'>"+item.companyForShort+"</a>");
							td4.html(item.dealType);
							td5.html(item.industry);
							td6.html(item.territory);
							td7.html("<span class='wgz'></span>");
							td7.on("click",function(){
								var cla=$(this).children().attr("class");
								if(cla=='wgz'){
									$(this).children().removeClass("wgz").addClass("ygz");
									addCompany(item.stockCode);
								}else{
									$(this).children().removeClass("ygz").addClass("wgz");
									deleCompany(item.stockCode);
								}
							})
							tr.append(td1);
							tr.append(td2);
							tr.append(td3);
							tr.append(td4);
							tr.append(td5);
							tr.append(td6);
							tr.append(td7);
							$("#listBox").append(tr);
					});
					//分页
					$('#page').pagination({
						total: data.retData.pageTotal,
						pageSize: pageSize,
						layout: ['first', 'prev', 'links', 'next', 'last','manual'],
						links: 7,
						displayMsg:"",
						beforePageText: '当前',
						afterPageText: '共 {pages} 页',
						onSelectPage: function(pageNumber, pageSize) {
							getIndustryList(pageNumber, pageSize,getIndustryCondition());
						}
					});
					
				}else{
					var tr = $("<tr>");
					var td = $("<td colspan='7'  scope='col'>");
					td.html("暂无数据。");
					tr.append(td);
					$("#listBox").append(tr);
					$("#page").empty();
				}
				if(data.retData.pageTotal == null){
					$("#countNum").html("0");
				}else{
					$("#countNum").html(data.retData.pageTotal);
				}
				//修改分页文字
				setPageText();
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
function setPageText() {
	$("#page tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#page tr td").eq(1).find(".l-btn-left ").html("上一页");
	$("#page tr td").eq(3).find(".l-btn-left ").html("下一页");
	$("#page tr td").eq(4).find(".l-btn-left ").html("末页");
	var w=$("#page table").width();
	$("#page table").css("margin-left",-w/2);
	
}