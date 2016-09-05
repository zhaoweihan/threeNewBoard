$(function() {
	
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
	
	//查询自然人信息
	$.ajax({
		type: "post",
		url: url + "/common/findDataList.do",
		async: true,
		data: {
			dataType: 1
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$("#personList").empty();
				$(data.retData.list).each(function(){
					var hangye = $("<a href='#' >");
					var name = this.personName;
					hangye.html(name);
					hangye.on("click",function(){
						$(this).addClass("hover").siblings().removeClass("hover");
						getCompanyName(name);
					})
					$("#personList").append(hangye);
				})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	//查询机构信息
	$.ajax({
		type: "post",
		url: url + "/common/findDataList.do",
		async: true,
		data: {
			dataType: 2
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$("#shareList").empty();
				$(data.retData.list).each(function(){
					var hangye = $("<a href='#' >");
					var name = this.shareName;
					hangye.html(name);
					hangye.on("click",function(){
						$(this).addClass("hover").siblings().removeClass("hover");
						getCompanyName(name);
					})
					$("#shareList").append(hangye);
				})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	//查询企业机构
	$.ajax({
		type: "post",
		url: url + "/common/findDataList.do",
		async: true,
		data: {
			dataType: 3
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$("#organizationList").empty();
				$(data.retData.list).each(function(){
					var hangye = $("<a href='javascript:void(0)'>");
					var name = this.organizationName;
					hangye.html(name);
					hangye.on("click",function(){
						$(this).addClass("hover").siblings().removeClass("hover");
						getCompanyName(name);
					})
					$("#organizationList").append(hangye);
				})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	//查询所有股东信息
	getEnterpriseList(1, 20,null);
	
	//进行我的检索条件回显
	if(	decodeURI(getUrlParam("companyName")) != "null"){
		var shareName=decodeURI(getUrlParam("companyName"));
		pitchOn(shareName);
		//清空内容
		$("#condition").empty();
		var p1 = $("<a href='javascript:void(0)'></a>");
		var hidd = "<input type='hidden' id='companyName' value='"+decodeURI(getUrlParam("companyName"))+"'>";
		p1.html(decodeURI(getUrlParam("companyName")) + "<i onclick='deleCondition();'>x</i>");
		p1.append(hidd);
		$("#condition").append(p1);
		geyList(1, 20,"&companyName="+decodeURI(getUrlParam("companyName")));
	}
	
	//清空查询信息
	$("#deleCondition").click(function(){
		$("#condition").empty();
		$("#personList").children().removeClass("hover");
		$("#shareList").children().removeClass("hover");
		$("#organizationList").children().removeClass("hover");
		geyList(1,20,null);
	})
	
	//点击保存弹出弹框
	$("#showConditionWindow").click(function(){
		//拼出显示检索条件
		var conditionStr = "";
		conditionStr = $($("#condition").children().children().last()).val();
		if(conditionStr != "" && conditionStr != undefined){
			$("#conditionContent").text(conditionStr);
			$("#conditionName").val("找股东：" + conditionStr);
			$("#defindName").hide();
			$(".tcbackground").show();
			$(".qrdele").show();
		}else{
			$("#choiceCondition").show();
		}
	})
	
	//点击取消弹框
	$("[name='cancel']").click(function(){
		$(".tcbackground").hide();
		$(".qrdele").hide();
	})
	
	$("#shareName").autocomplete({
		minLength: 1,
		source: function(request, response) {
			findDataShare(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			$("#shareName").val(item.name);
			searchShare();
		}
	});
});
//选中股东状态
function pitchOn(shareName){
	$("#organizationList a").each(function(){
		if($(this).html() == shareName){
			$(this).addClass("hover");
		}
	});
	$("#shareList a").each(function(){
		if($(this).html() == shareName){
			$(this).addClass("hover");
		}
	});
	$("#personList a").each(function(){
		if($(this).html() == shareName){
			$(this).addClass("hover");
		}
	});
}

function checkConditionName(){
	if($("#conditionName").val().length > 0){
		$("#defindName").hide();
	}else{
		$("#defindName").show();
	}
}

function addSearch(){
	var datas=$("#companyName").val();
	var searchCondition="{\"companyName\":"+datas+"}";
	var analysisUrl="/findShareholder.html?companyName="+encodeURI($($("#condition").children().children().last()).val());
	var searchType="3";
	var searchName = $("#conditionName").val();
	$.ajax({
		type: "post",
		url: url + "/common/addSearchMessage.do",
		async: true,
		data: "searchCondition="+searchCondition+"&analysisUrl="+analysisUrl+"&searchType="+searchType+"&searchName="+searchName,
		beforeSend:function(xhr){
			xhr.setRequestHeader("UU");
			xhr.setRequestHeader("phone");
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$.zmAlert("添加成功！");
				$(".tcbackground").hide();
				$(".qrdele").hide();
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}

/**
 * 清空查询信息
 */
function deleCondition(){
	$("#condition").empty();
	$("#personList").children().removeClass("hover");
	$("#shareList").children().removeClass("hover");
	$("#organizationList").children().removeClass("hover");
	geyList(1,20,null);
}

/**
 * 点击查询信息
 * @param companyName
 */
function getCompanyName(companyName){
	//清除选中状态
	$("#personList").children().removeClass("hover");
	$("#shareList").children().removeClass("hover");
	$("#organizationList").children().removeClass("hover");
	//清空内容
	$("#condition").empty();
	var p1 = $("<a href='javascript:void(0)'></a>");
	var hidd = "<input type='hidden' id='companyName' value='"+companyName+"'>";
	p1.html(companyName + "<i onclick='deleCondition();'>x</i>");
	p1.append(hidd);
	$("#condition").append(p1);
	$("#choiceCondition").hide();
	geyList(1, 20,"&companyName="+companyName);
}


//获取列表
//datas样例：datas="aaa=bbb&ccc=ddd"
function geyList(pageNum, pageSize,datas) {
	if(datas == null || !datas.length > 0){
		datas = "";
	}
	$.ajax({
		type: "post",
		url: url + "/share/findList.do",
		async: false,
		data: "pageNum="+pageNum+"&pageSize="+pageSize+datas,
		success: function(data) {
			$("#listBox").html('');
			$("#countNum").html(data.retData.pageTotal);
			$.each(data.retData.shareholderList, function(index, item) {
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
					var datas=$("#companyName").val();
					if(datas==null || datas==''){
						datas="";
					}else{
						datas="&companyName="+datas;
					}
					geyList(pageNumber, pageSize,datas);
				}
			});
			//修改分页文字
			setPageText();
		}
	});
}
//datas样例：datas="aaa=bbb&ccc=ddd"
function getEnterpriseList(pageNum, pageSize,datas) {
	if(datas == null || !datas.length > 0){
		datas = "";
	}
	$.ajax({
		type: "post",
		url: url + "/enterprise/findList.do",
		async: false,
		data: "pageNum="+pageNum+"&pageSize="+pageSize+datas,
		success: function(data) {
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
						getEnterpriseList(pageNumber, pageSize);
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

function showDiv(){
	$(".chakgd").show();
	$(".tcbackground").show();
	$("body").css("overflow","hidden");
	$("html").css("overflow","hidden");
}

function hideDiv(){
	$(".chakgd").hide();
	$(".tcbackground").hide();
	$("body").css("overflow","auto");
	$("html").css("overflow","auto");
}

function searchShare(){
	var shareName=$("#shareName").val();
	getCompanyName(shareName);
	hideDiv();
	pitchOn(shareName);
}

//搜索信息不全
function findDataShare(request,response) {
	$.ajax({
		type: "post",
		url: url + "/share/findDataShare.do",
		async: false,
		data: {
			shareName: request.term
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if (data.retCode == 0000) {
				if (data.retData == null) {
					return false;
				}
				var arr = [];
				$.each(data.retData, function(i, item) {
					var obj = {
						label: item,
						value: item,
						name: item
					}
					arr.push(obj);
				});
				searchList=arr;
				response(arr);
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}

function exportExcel(tableid) //读取表格中每个单元到EXCEL中 
{ 
    var curTbl = document.getElementById(tableid); 
     var oXL = new ActiveXObject("Excel.Application"); 
     //创建AX对象excel 
     var oWB = oXL.Workbooks.Add(); 
     //获取workbook对象 
    var oSheet = oWB.ActiveSheet; 
    //激活当前sheet 
     var Lenr = curTbl.rows.length; 
     //取得表格行数 
     for (i = 0; i < Lenr; i++) 
     { 
         var Lenc = curTbl.rows(i).cells.length; 
         //取得每行的列数 
         for (j = 0; j < Lenc; j++) 
         { 
             oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText; 
             //赋值 
         } 
     } 
     oXL.Visible = true; 
     //设置excel可见属性 
     var fname = oXL.Application.GetSaveAsFilename("将table导出到excel.xls", "Excel Spreadsheets (*.xls), *.xls");
     oWB.SaveAs(fname);
     oWB.Close();
     oXL.Quit();
}
