//找指标
$(function(){
	$(".data-checkbox label").on("click", function(e) {
		var columnTmpe=$(this).text();
		if(columnTmpe!=null && columnTmpe!="" && columnTmpe!="undefined" && $("#"+columnTmpe+"JSTJ")[0]){
			$("#"+columnTmpe+"JSTJ").remove();
		}
		
		changeParam();
	});
	$("#tradingType").on("click", function() {
		changeParam();
	});
	$("#trade2S").hide();
	//行业
	$.ajax({
		type:"post",
//		url:url+"/trading/find.do",
		url:url+"/common/findTrade.do",
		async:false,
		data:{
			tradeGrade:"1"
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var tradeList=result.tradeList;
					for(var i=0;i<tradeList.length;i++){
						var trade=tradeList[i];
						var html='<a href="javascript:void(0);">'+trade.tradeName+'</a>';
						$("#trade1").append(html);
					}
					$("#trade1 a").on("click",function(){
						$("#trade1").find("a").removeClass('hover');
						$(this).addClass("hover");
						var tradeName=$(this).text();
						addTrade(tradeName);
						changeParam();
					});
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	//获取地区
	addCity();
	//解析URL
	backShow();
});
//通过以及行业查找二级行业
function addTrade(tradeName){
	$("#trade2S").show();
	$("#trade2").html("");
	//行业
	$.ajax({
		type:"post",
//		url:url+"/trading/find.do",
		url:"/common/findTrade.do",
		async:false,
		data:{
			tradeGrade:"2",
			parentName:tradeName
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var tradeList=result.tradeList;
					for(var i=0;i<tradeList.length;i++){
						var trade=tradeList[i];
						var html='<a href="javascript:void(0);">'+trade.tradeName+'</a>';
						$("#trade2").append(html);
					}
					$("#trade2 a").on("click",function(){
						$("#trade2").find("a").removeClass('hover');
						$(this).addClass("hover");
						changeParam();
					});
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
/**
 * 区域
 */
function addCity(){
	$.ajax({
		type: "post",
		url: url + "/common/findArea.do",
		async: false,
		data: {
			tradeGrade: ""
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$(data.retData.cityList).each(function(){
					var area = $("<a href='javascript:void(0);' data-value="+this.cityName+" >");
					area.html(this.cityName);
					area.on("click",function(){
						$(this).addClass("hover").siblings().removeClass("hover");
						changeParam();
					})
					$("#city").append(area);
				});
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
/**
 * 获取选中的参数
 */
function changeParam(){
	$("#saveParamTitle").hide();
	//一级行业
	var primaryIndustries=$("#trade1").find("a.hover").text();
	if(primaryIndustries!=null && primaryIndustries!=""){
		if($("#primaryIndustriesJSTJ")[0]){ 
			$("#primaryIndustriesJSTJ").html(primaryIndustries+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="primaryIndustriesJSTJ">'+primaryIndustries+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		} 
	}
	//二级行业
	var secondaryIndustries=$("#trade2").find("a.hover").text();
	if(secondaryIndustries!=null && secondaryIndustries!=""){
		if($("#secondaryIndustriesJSTJ")[0]){ 
			$("#secondaryIndustriesJSTJ").html(secondaryIndustries+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="secondaryIndustriesJSTJ">'+secondaryIndustries+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		} 
	}
	//地区
	var city=$("#city").find("a.hover").text();
	if(city!=null && city!=""){
		if($("#cityJSTJ")[0]){ 
			$("#cityJSTJ").html(city+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="cityJSTJ">'+city+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		} 
	}
	//交易方式
	var tradingType=$("#tradingType").find("label.on").prev().val();
	if(tradingType!=null && tradingType!="" && tradingType!="undefined"){
		if($("#tradingTypeJSTJ")[0]){ 
			$("#tradingTypeJSTJ").html(tradingType+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="tradingTypeJSTJ">'+tradingType+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		} 
	}
	var columns="";
	$(".zb_input").find("label.on").each(function(){
	    var columnTmpe=$(this).next().text();
	    if(columnTmpe!=null && columnTmpe!=""){
	    	columns +=columnTmpe+",";
	    	if($("#"+columnTmpe+"JSTJ")[0]){ 
				$("#"+columnTmpe+"JSTJ").html(columnTmpe+"<i>x</i>");
			}else{
				var jstjStr='<a href="javascript:void(0);" id="'+columnTmpe+'JSTJ">'+columnTmpe+'<i>x</i></a>';
				$("#jstj").prepend(jstjStr);
			}
	    }
	 });
	columns=columns.substring(0,columns.length-1);
	var pageSize=$("#tableBody").attr("data-pageSize");
	//查询数据
	findIndicator(primaryIndustries,secondaryIndustries,city,tradingType,columns,1,pageSize);
	//添加检索条件删除绑定事件
	$("#jstj a i").on("click",function(){
		var id=$(this).parent().attr("id");
		if(id=="primaryIndustriesJSTJ"){
			$("#trade1").find("a").removeClass('hover');
		}else if(id=="secondaryIndustriesJSTJ"){
			$("#trade2").find("a").removeClass('hover');
			$("#trade2").hide();
		}else if(id=="cityJSTJ"){
			$("#city").find("a").removeClass('hover');
		}else if(id=="tradingTypeJSTJ"){
			$("#tradingType").find("label").removeClass('on');
			$("#tradingType").find("label").removeAttr("style");
		}else{
			var columnName=id.substring(0,id.length-4);
			$(".zb_input").find("label.on").each(function(){
			    var columnTmppp=$(this).next().text();
			    if(columnName==columnTmppp){
			    	$(this).prev().removeClass('on');
			    	$(this).removeClass('on');
			    	$(this).next().attr('style',"");
			    }
			 });
		}
		$(this).parent().remove();
		changeParam();
	});
}
/**
 * 清空筛选--清空筛选条件
 */
function clearParam(){
	$("#jstj").find("i").parent().remove();
	//行业
	$("#trade1").find("a").removeClass('hover');
	$("#trade2").find("a").removeClass('hover');
	$("#trade2").hide();
	//交易类型
	$("#city").find("a").removeClass('hover');
	//交易方式
	$("#tradingType").find("label").removeClass('on');
	$("#tradingType").find("label").removeAttr("style");
	//字段
	$(".zb_input").find("label").removeClass('on');
	$(".zb_input").find("label").removeAttr('style');
	var pageSize=$("#tableBody").attr("data-pageSize");
	changeParam();
}

/**
 * 保存查询条件
 */
function saveParam(){
	var searchName="";
	//一级行业
	var primaryIndustries=$("#trade1").find("a.hover").text();
	if(primaryIndustries!=null && primaryIndustries!=""){
		searchName+=primaryIndustries+"+";
	}
	//二级行业
	var secondaryIndustries=$("#trade2").find("a.hover").text();
	if(secondaryIndustries!=null && secondaryIndustries!=""){
		searchName+=secondaryIndustries+"+";
	}
	//地区
	var city=$("#city").find("a.hover").text();
	if(city!=null && city!=""){
		searchName+=city+"+";
	}
	//交易方式
	var tradingType=$("#tradingType").find("label.on").prev().val();
	if(tradingType!=null && tradingType!=""){
		searchName+=tradingType+"+";
	}
	var columns="";
	$(".zb_input").find("label.on").each(function(){
	    var column=$(this).next().text();
	    if(column!=null && column!=""){
	    	columns +=column+",";
	    	
	    }
	 });
	columns=columns.substring(0,columns.length-1);
	searchName+=columns;
	//检索条件
	var searchConditionStr='{"primaryIndustries":'+primaryIndustries+',"secondaryIndustries":'+secondaryIndustries+
						',"city":'+city+',"tradingType":'+tradingType+',"columns":'+columns+'}';
	var param="";
		param+="primaryIndustries="+primaryIndustries+"&";
		param+="secondaryIndustries="+secondaryIndustries+"&";
		param+="city="+city+"&";
		param+="tradingType="+tradingType+"&";
		param+="columns="+columns;
	
		if(searchName==null || searchName=="" ){
			$("#saveParamTitle").show();
			return false;
		}
		$("#savaParam").show();
		$(".tcbackground").show();
//		$("#paramName").show();
		searchName=searchName.substring(0,searchName.length-1)
		$("#savaParam").find("textarea").text(searchName);
		$("#savaParam").find("input").val("找指标:"+searchName);
		$("#savaParam").find("input").on("keyup",function(){
			var paramName=$(this).val();
			if(paramName==null || paramName=="" || paramName=="undefined"){
				$("#paramName").show();
			}else{
				$("#paramName").hide();
			}
		});
		$("#savaParam").find("button.save").on("click",function(){
			var paramName=$("#savaParam").find("input").val();
			if(paramName==null || paramName=="" || paramName=="undefined"){
				$("#paramName").show();
				return false;
			}else{
				saveFindParam(searchConditionStr,param,paramName);
			}
		});
		$("#savaParam").find("button.quxiao").on("click",function(){
			$("#savaParam").hide();
			$(".tcbackground").hide();
			$("#savaParam").find("input").val("");
		});
		$("#savaParam").find("a").on("click",function(){
			$("#savaParam").hide();
			$(".tcbackground").hide();
			$("#savaParam").find("input").val("");
		});
}

/**
 * 保存检索条件
 */
function saveFindParam(searchConditionStr,param,searchName){
	$.ajax({
		type:"post",
		url:url+"/common/addSearchMessage.do",
		async:true,
		data:{
			searchType:5,
			searchCondition:searchConditionStr,
			analysisUrl:"/findIndicators.html?"+param,
			searchName:searchName
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("UU");
			xhr.setRequestHeader("phone");
		},
		success:function(data){
			if (data.retCode==0000) {
				$.zmAlert("添加成功！");
				$("#savaParam").hide();
				$(".tcbackground").hide();
				$("#savaParam").find("input").val("");
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
/**
 * 找指标显示数据
 * @param primaryIndustries   一级行业
 * @param secondaryIndustries 二级行业
 * @param city 地区
 * @param tradingType 交易方式
 * @param columns 指标字段，以','分隔
 */
function findIndicator(primaryIndustries,secondaryIndustries,city,tradingType,columns,pageNum,pageSize){
	$("#tableHead").html("");
	$("#tableBody").html("");
	var columnsTmp=columns.split(",");
	var thead='<tr>';
		thead+='<th scope="col" class="quanxuan"><input type="checkbox" class="qx" id="selectAll" onclick="selectChckBoxAll()"/>全选</th>';
		thead+='<th scope="col" class="gpdm">股票代码</th>';
		thead+='<th scope="col" class="qyjc">企业简称</th>';
		for(var i=0;i<columnsTmp.length;i++){
			if(columnsTmp[i]!=null && columnsTmp[i]!=""){
				thead+='<th scope="col" class="zzc">'+columnsTmp[i]+'</th>';
			}
		}
		thead+='<th scope="col" class="gz">操作</th>';
		thead+='</tr>';
		$("#tableHead").html(thead);
	$.ajax({
		type:"post",
		url:url+"/finance/findIndicator.do",
		async:false,
		data:{
			primaryIndustries:primaryIndustries,
			secondaryIndustries:secondaryIndustries,
			city:city,
			tradingType:tradingType,
			pageNum:pageNum,
			pageSize:pageSize
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var indicatorList=result.rows;
					for(var i=0;i<indicatorList.length;i++){
						var indicator=indicatorList[i];
						var tbody='<tr>';
							tbody+='<td class="quanxuan"><input type="checkbox" name ="keyInfoCheckBox" class="choo" data-stockCode="'+indicator.stockCode+'"/></td>';
							tbody+='<td class="gpdm"><a href="'+url+'/industryResearch.html?stockCode='+indicator.stockCode+'&stockName='+encodeURI(indicator.stockName)+'">'+indicator.stockCode+'</a></td>';
							tbody+='<td class="qyjc"><a href="'+url+'/industryResearch.html?stockCode='+indicator.stockCode+'&stockName='+encodeURI(indicator.stockName)+'">'+indicator.stockName+'</a> </td>';
						for(var j=0;j<columnsTmp.length;j++){
							if(columnsTmp[j]!=null && columnsTmp[j]!=""){
								var field=columnsTmp[j];
								if("营业利润"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.operatingProfit.toFixed(2)+'</td>';
								}else if("营业收入"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.operatingIncome.toFixed(2)+'</td>';
								}else if("营业利润率"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.operatingProfitRatio.toFixed(2)+'</td>';
								}else if("销售收入"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.salesRevenue.toFixed(2)+'</td>';
								}else if("应收账款"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.receivables.toFixed(2)+'</td>';
								}else if("应收账款周转率"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.accountReceivableTurnover.toFixed(2)+'</td>';
								}else if("上期净利润"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.preNetProfit.toFixed(2)+'</td>';
								}else if("本期净利润"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.netProfit.toFixed(2)+'</td>';
								}else if("净利润增长率"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.netProfitRatio.toFixed(2)+'</td>';
								}else if("总资产"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.totalAssets.toFixed(2)+'</td>';
								}else if("总负债"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.totalLiability.toFixed(2)+'</td>';
								}else if("资产负债率"==$.trim(field)){
									tbody+='<td class="zzc">'+indicator.assetLiabilityRatio.toFixed(2)+'</td>';
								}
							}
						}
						if(indicator.attention){
							tbody+='<td class="gz"><span class="ygz" data-stockCode="'+indicator.stockCode+'"></span></td>';
						}else{
							tbody+='<td class="gz"><span class="wgz" data-stockCode="'+indicator.stockCode+'"></span></td>';
						}
							tbody+='</tr>';
						$("#tableBody").append(tbody);
					}
					//绑定关注事件
					$(".gz").on("click", function(e) {
						var stockCode=$(this).children().attr("data-stockCode");
						var calz=$(this).children().attr("class");
						if("ygz"==calz){
							$(this).find("span").removeClass("ygz");
							deleCompany(stockCode);
							$(this).find("span").addClass("wgz");
						}else if("wgz"==calz){
							$(this).find("span").removeClass("wgz");
							addCompany(stockCode);
							$(this).find("span").addClass("ygz");
						}
					});
					var total=result.total,
					pageSize=result.pageSize,
					pages=result.pageCount,
					pageNumber=result.pageNum;
					if(pages>1){
						$('#page').show();
						//分页
						$('#page').pagination({
							total: total,
							pageSize: pageSize,
							layout: ['first', 'prev', 'links', 'next', 'last', 'manual'],
							links: 7,
							beforePageText: '当前',
							afterPageText: '共 {pages} 页',
							displayMsg:"",
							onSelectPage: function(pageNumber, size) {
								findIndicator(primaryIndustries,secondaryIndustries,city,tradingType,columns,pageNumber,size);
							}
						});
						//修改分页文字
						setPageText();
					}
					$("#total").html(total);
					$("#tableBody").attr("data-pageSize",pageSize);
				}else{
					$("#privatePlacement").html('');
					$('#page').hide();
					$("#total").html(0);
					var noHtml='<tr><td colspan="'+(columnsTmp.length+4)+'"  scope="col">暂无数据</td></tr>';
					$("#tableBody").html(noHtml);
				}
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}

//修改分页文字
function setPageText() {
	$("#page tr td").eq(0).find(".l-btn-left ").html("首页");
	$("#page tr td").eq(1).find(".l-btn-left ").html("上一页");
	$("#page tr td").eq(3).find(".l-btn-left ").html("下一页");
	$("#page tr td").eq(4).find(".l-btn-left ").html("末页");
}

/**
 * 导出excel
 */
function exportTable() {
	var keyInfo = "";
	$("input[name='keyInfoCheckBox']").each(function(){
		if($(this).is(':checked')){
			keyInfo += $(this).attr("data-stockCode") + ",";
		}
	})
	if(keyInfo==""){
		$.zmAlert("请选择");
		return false;
	}
	var columns="";
	$(".zb_input").find("label.on").each(function(){
	    var column=$(this).text();
	    columns+=encodeURI(column)+",";
	 });
	columns=columns.substring(0,columns.length-1);
	location.href = url + "/finance/exportIndicator.do?keys="+keyInfo.substring(0, keyInfo.length - 1)+"&columns="+columns;
}

/**
 * 回显示
 */
function backShow(){
	var search=window.location.search;
	if(search!=null && search!="" && search!="undefined"){
		var primaryIndustries=getUrlParam("primaryIndustries");
		if(primaryIndustries!=null && primaryIndustries!="" && primaryIndustries!="undefined"){
			$("#trade1").find("a").each(function(){
				var primaryIndustriesTmp=$(this).text();
				if(primaryIndustries==primaryIndustriesTmp){
					$(this).addClass("hover");
				}
			});
		}
		var secondaryIndustries=getUrlParam("secondaryIndustries");
		if(secondaryIndustries!=null && secondaryIndustries!="" && secondaryIndustries!="undefined"){
			addTrade(primaryIndustries);
			$("#trade2").find("a").each(function(){
				var secondaryIndustriesTmp=$(this).text();
				if(secondaryIndustries==secondaryIndustriesTmp){
					$(this).addClass("hover");
				}
			});
		}
		var city=getUrlParam("city");
		if(city!=null && city!="" && city!="undefined"){
			$("#city").find("a").each(function(){
				var cityTmp=$(this).text();
				if(city==cityTmp){
					$(this).addClass("hover");
				}
			});
		}
		var tradingType=getUrlParam("tradingType");
		if(tradingType!=null && tradingType!="" && tradingType!="undefined"){
			$("#tradingType").find("label").each(function(){
				var tradingTypeTmp=$(this).text();
				if(tradingTypeTmp==tradingType){
					$(this).attr("style","color: rgb(95, 189, 211);");
					$(this).prev().addClass("on");
				}
			});
		}
		var columns=getUrlParam("columns");
		if(columns!=null && columns!="" && columns!="undefined"){
			$(".zb_input").find("label").each(function(){
			    var column=$(this).text();
			    if(columns.indexOf(column)>=0){
			    	$(this).prev().addClass("on");
			    	$(this).attr("style","color: rgb(95, 189, 211);");
			    }
			 });
		}
	}
	changeParam();
}