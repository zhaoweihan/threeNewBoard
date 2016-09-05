//找定增
$(function(){
	$(".data-radio label").on("click", function(e) {
		changeParam();
	});
	$("#tradingType").on("click", function() {
		changeParam();
	});
	//行业
	$.ajax({
		type:"post",
		url:url+"/common/findTrade.do",
		async:false,
		data:{
			tradeGrade:"2"
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
						$("#trade").append(html);
					}
					$("#trade a").on("click",function(){
						$("#trade").find("a").removeClass('hover');
						$(this).addClass("hover");
						changeParam();
					});
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	//解析URL
	backShow();
});

/**
 * 改变搜索条件
 */
function changeParam(){
	$("#saveParamTitle").hide();
	
	//行业
	var profession=$("#trade").find("a.hover").text();
	if(profession!=null && profession!=""){
		
		if($("#professionJSTJ")[0]){ 
			$("#professionJSTJ").html(profession+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="professionJSTJ">'+profession+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		} 
	}
	//交易类型
	var tradingType=$("#tradingType").find("label.on").prev().val();
	if(tradingType!=null && tradingType!=""){
		if($("#tradingTypeJSTJ")[0]){ 
			$("#tradingTypeJSTJ").html(tradingType+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="tradingTypeJSTJ">'+tradingType+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		}
	}
	//时间
	var startDate=$("#starTime").val();
	if(startDate!=null && startDate!=""){
		if($("#startDateJSTJ")[0]){ 
			$("#startDateJSTJ").html(startDate+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="startDateJSTJ">'+startDate+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		}
	}
	var endDate=$("#endTime").val();
	if(endDate!=null && endDate!=""){
		if($("#endDateJSTJ")[0]){
			$("#endDateJSTJ").html(endDate+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="endDateJSTJ">'+endDate+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		}
	}
	//募资金额
	var raiseAmount=$("#raiseAmount").find("label.on").prev().val();
	if(raiseAmount!=null && raiseAmount!=""){
		if($("#raiseAmountJSTJ")[0]){
			$("#raiseAmountJSTJ").html(raiseAmount+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="raiseAmountJSTJ">'+raiseAmount+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		}
	}
	var minRaiseAmount=null;
	var maxRaiseAmount=null;
	if(raiseAmount!=null && raiseAmount!=""){
		if("3000以上"==raiseAmount){
			minRaiseAmount=3000;
		}else{
			var raiseAmountTmp=raiseAmount.split("-");
			minRaiseAmount=raiseAmountTmp[0];
			maxRaiseAmount=raiseAmountTmp[1];
		}
	}
	//市盈率
	var financingRatio=$("#financingRatio").find("label.on").prev().val();
	if(financingRatio!=null && financingRatio!=""){
		if($("#financingRatioJSTJ")[0]){
			$("#financingRatioJSTJ").html(financingRatio+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="financingRatioJSTJ">'+financingRatio+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		}
	}
	var minFinancingRatio=null;
	var maxFinancingRatio=null;
	if(financingRatio!=null && financingRatio!=""){
		if("0以下"==financingRatio){
			maxFinancingRatio=0;
		}else if("50以上"==financingRatio){
			minFinancingRatio=50;
		}else{
			var financingRatioTmp=financingRatio.split("-");
			minFinancingRatio=financingRatioTmp[0];
			maxFinancingRatio=financingRatioTmp[1];
		}
	}
	//溢价率
	var premiumRate=$("#premiumRate").find("label.on").prev().val();
	if(premiumRate!=null && premiumRate!=""){
		if($("#premiumRateJSTJ")[0]){
			$("#premiumRateJSTJ").html(premiumRate+"<i>x</i>");
		}else{
			var jstjStr='<a href="javascript:void(0);" id="premiumRateJSTJ">'+premiumRate+'<i>x</i></a>';
			$("#jstj").prepend(jstjStr);
		}
	}
	var minPremiumRate=null;
	var maxPremiumRate=null;
	if(premiumRate!=null && premiumRate!=""){
		var premiumRateTmp=premiumRate.split("-");
		minPremiumRate=premiumRateTmp[0];
		maxPremiumRate=premiumRateTmp[1];
	}
	var pageSize=$("#privatePlacement").attr("data-pageSize");
	//查询数据
	findPrivatePlacement(profession,tradingType,startDate,endDate,minRaiseAmount,maxRaiseAmount,minFinancingRatio,maxFinancingRatio,minPremiumRate,maxPremiumRate,1,pageSize)
	//添加检索条件删除绑定事件
	$("#jstj a i").on("click",function(){
		var id=$(this).parent().attr("id");
		if(id=="professionJSTJ"){
			$("#trade").find("a").removeClass('hover');
		}else if(id=="tradingTypeJSTJ"){
			$("#tradingType").find("label").removeClass('on');
			$("#tradingType").find("label").removeAttr("style");
		}else if(id=="startDateJSTJ"){
			$("#starTime").val('');
		}else if(id=="endDateJSTJ"){
			$("#endTime").val('');
		}else if(id=="raiseAmountJSTJ"){
			$("#raiseAmount").find("label").removeClass('on');
			$("#raiseAmount").find("label").removeAttr("style");
		}else if(id=="financingRatioJSTJ"){
			$("#financingRatio").find("label").removeClass('on');
			$("#financingRatio").find("label").removeAttr("style");
		}else if(id=="premiumRateJSTJ"){
			$("#premiumRate").find("label").removeClass('on');
			$("#premiumRate").find("label").removeAttr("style");
		}
		$(this).parent().remove();
		changeParam();
	});
}

/**
 * 清空筛选--清空查询条件
 */
function clearParam(){
	$("#jstj").find("i").parent().remove();
	//行业
	$("#trade").find("a").removeClass('hover');
	//交易类型
	$("#tradingType").find("label").removeClass('on');
	$("#tradingType").find("label").removeAttr("style");
	//起止时间
	$("#starTime").val('');
	$("#endTime").val('');
	//募资金额
	$("#raiseAmount").find("label").removeClass('on');
	$("#raiseAmount").find("label").removeAttr("style");
	//市盈率
	$("#financingRatio").find("label").removeClass('on');
	$("#financingRatio").find("label").removeAttr("style");
	//溢价率
	$("#premiumRate").find("label").removeClass('on');
	$("#premiumRate").find("label").removeAttr("style");
	var pageSize=$("#privatePlacement").attr("data-pageSize");
	changeParam();
}

/**
 * 保存查询条件
 */
function saveParam(){
	var searchName="";
	//行业
	var profession=$("#trade").find("a.hover").text();
	if(profession!=null && profession!="" && profession!="undefind"){
		searchName+=profession+"+";
	}
	//交易类型
	var tradingType=$("#tradingType").find("label.on").prev().val();
	if(tradingType!=null && tradingType!="" && tradingType!="undefind"){
		searchName+=tradingType+"+";
	}
	//时间
	var startDate=$("#starTime").val();
	if(startDate!=null && startDate!="" && startDate!="undefind"){
		searchName+=startDate+"+";
		
	}
	var endDate=$("#endTime").val();
	if(endDate!=null && endDate!="" && endDate!="undefind"){
		searchName+=endDate+"+";
	}
	//募资金额
	var raiseAmount=$("#raiseAmount").find("label.on").prev().val();
	var minRaiseAmount=null;
	var maxRaiseAmount=null;
	if(raiseAmount!=null && raiseAmount!="" && raiseAmount!="undefind"){
		searchName+=raiseAmount+"+";
		if("3000以上"==raiseAmount){
			minRaiseAmount=3000;
		}else{
			var raiseAmountTmp=raiseAmount.split("-");
			minRaiseAmount=raiseAmountTmp[0];
			maxRaiseAmount=raiseAmountTmp[1];
		}
	}
	//市盈率
	var financingRatio=$("#financingRatio").find("label.on").prev().val();
	var minFinancingRatio=null;
	var maxFinancingRatio=null;
	if(financingRatio!=null && financingRatio!="" && financingRatio!="undefind"){
		searchName+=financingRatio+"+";
		if("0以下"==financingRatio){
			maxFinancingRatio=0;
		}else if("50以上"==financingRatio){
			minFinancingRatio=50;
		}else{
			var financingRatioTmp=financingRatio.split("-");
			minFinancingRatio=financingRatioTmp[0];
			maxFinancingRatio=financingRatioTmp[1];
		}
	}
	//溢价率
	var premiumRate=$("#premiumRate").find("label.on").prev().val();
	var minPremiumRate=null;
	var maxPremiumRate=null;
	if(premiumRate!=null && premiumRate!="" && premiumRate!="undefind"){
		searchName+=premiumRate+"+";
		var premiumRateTmp=premiumRate.split("-");
		minPremiumRate=premiumRateTmp[0];
		maxPremiumRate=premiumRateTmp[1];
	}
	var param="";
	param+="profession="+profession+"&";
	param+="tradingType="+tradingType+"&";
	param+="startDate="+startDate+"&";
	param+="endDate="+endDate+"&";
	param+="raiseAmount="+raiseAmount+"&";
	param+="financingRatio="+financingRatio+"&";
	param+="premiumRate="+premiumRate;
	//检索条件
	var searchConditionStr='{"profession":'+profession+',"tradingType":'+tradingType+',"minRaiseAmount":'+minRaiseAmount+',"maxRaiseAmount":'+maxRaiseAmount+','+
						'"minFinancingRatio":'+minFinancingRatio+',"maxFinancingRatio":'+maxFinancingRatio+','+
						'"minPremiumRate":'+minPremiumRate+',"maxPremiumRate":'+maxPremiumRate+',}';
	if(searchName==null || searchName=="" ){
		$("#saveParamTitle").show();
		return false;
	}
	$("#savaParam").show();
	$(".tcbackground").show();
//	$("#paramName").show();
	searchName=searchName.substring(0,searchName.length-1)
	$("#savaParam").find("textarea").text(searchName);
	$("#savaParam").find("input").val("找定增:"+searchName);
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
		async:false,
		data:{
			searchType:7,
			searchCondition:searchConditionStr,
			analysisUrl:"/findDefiniteIncrease.html?"+param,
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
	$("#savaParam").hide();
}
/**
  * 导出excel
  */
function exportTable() {
	var keyInfo = "";
	$("[type='checkbox']").each(function(){
		if($(this).attr("checked") == "checked"){
			keyInfo += $(this).attr("data-keyInfo") + ",";
		}
	})
	if(keyInfo==""){
		$.zmAlert("请选择");
		return false;
	}
	location.href = url + "/privatePlacement/export.do?keys="+keyInfo.substring(0, keyInfo.length - 1);
}
/**
 * 查询定增信息 
 * @param profession 行业
 * @param tradingType 交易类型
 * @param startDate 开始时间，格式:"2016-06-20"
 * @param endDate 结束时间，格式:"2016-06-20"
 * @param minRaiseAmount 募资金额(万元)：范围的最小值
 * @param maxRaiseAmount 募资金额(万元)：范围的最大值
 * @param minFinancingRatio 市盈率：范围的最小值
 * @param maxFinancingRatio 市盈率：范围的最大值
 * @param minPremiumRate 溢价率：范围的最小值
 * @param maxPremiumRate 溢价率：范围的最大值
 * @param pageNum 页数
 * @param pageSize 每页的条数
 */
function findPrivatePlacement(profession,tradingType,startDate,endDate,minRaiseAmount,maxRaiseAmount,minFinancingRatio,maxFinancingRatio,minPremiumRate,maxPremiumRate,pageNum,pageSize){
	$.ajax({
		type:"post",
		url:url+"/privatePlacement/find.do",
		async:false,
		data:{
			profession:profession,
			tradingType:tradingType,
			startDate:startDate,
			endDate:endDate,
			minRaiseAmount:minRaiseAmount,
			maxRaiseAmount:maxRaiseAmount,
			minFinancingRatio:minFinancingRatio,
			maxFinancingRatio:maxFinancingRatio,
			minPremiumRate:minPremiumRate,
			maxPremiumRate:maxPremiumRate,
			pageNum:pageNum,
			pageSize:pageSize
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				var html='';
				if(result!=null){
					var privatePlacementList=result.rows;
					for(var i=0;i<privatePlacementList.length;i++){
						var privatePlacement=privatePlacementList[i];
					 	html +='<tr>';
						html +='<td class="quanxuan"><input type="checkbox" class="choo" data-keyInfo="'+privatePlacement.placementDate+'_'+privatePlacement.stockCode+'"/></td>';
						html +='<td class="gpdm"><a href="'+url+'/industryResearch.html?stockCode='+privatePlacement.stockCode+'&stockName='+encodeURI(privatePlacement.enterpriseNameAbbreviation)+'">'+privatePlacement.stockCode+'</a></td>';
						html +='<td class="qyjc"><a href="'+url+'/industryResearch.html?stockCode='+privatePlacement.stockCode+'&stockName='+encodeURI(privatePlacement.enterpriseNameAbbreviation)+'">'+privatePlacement.enterpriseNameAbbreviation+'</a> </td>';
						html +='<td class="ggrq"><a href="'+url+'/industryResearch.html?stockCode='+privatePlacement.stockCode+'&stockName='+encodeURI(privatePlacement.enterpriseNameAbbreviation)+'">'+privatePlacement.placementDate+'</a></td>';
						//最新进度:1:股东大会通过、2:董事会通过、3:停止实施、4:股东大会未通过、5:已完成定向增发（不存在进度）
						if(privatePlacement.schedule==1){
							html +='<td class="zxjd">股东大会通过</td>';
						}else if(privatePlacement.schedule==2){
							html +='<td class="zxjd">董事会通过</td>';
						}else if(privatePlacement.schedule==3){
							html +='<td class="zxjd">停止实施</td>';
						}else if(privatePlacement.schedule==4){
							html +='<td class="zxjd">股东大会未通过</td>';
						}else if(privatePlacement.schedule==5){
							html +='<td class="zxjd">已完成</td>';
						}else{
							html +='<td class="zxjd"></td>';
						}
						html +='<td class="fxjy">'+privatePlacement.privatePrice.toFixed(2)+'</td>';
						html +='<td class="fxlwg">'+privatePlacement.privateNum.toFixed(2)+'</td>';
						html +='<td  class="mjzjwy red">'+privatePlacement.raisePrice.toFixed(2)+'</td>';
						html +='<td class="rzsyl red">'+privatePlacement.financingRatio.toFixed(2)+'</td>';
						if(privatePlacement.premiumRate==null || privatePlacement.premiumRate=="" || privatePlacement.premiumRate=="undefined"){
							html +='<td  class="yjl red">0.0</td>';
						}else{
							html +='<td  class="yjl red">'+privatePlacement.premiumRate.toFixed(2)+'</td>';
						}
						//发行对象-
						html +='<td  class="fxdx"><a href="javascript:void(0);">发行对象</a>'+getPurchaserHtml(privatePlacement.purchaser,privatePlacement.schedule)+'</td>';//
						var noticeList=privatePlacement.noticeList;
						if(noticeList==null || noticeList=="" ||noticeList=="null"){
							html +='<td class="xiaz"><span></span></td>';
						}else{
							html +='<td class="xiaz">';
//							for(var m=0;m<noticeList.length;m++){
//								html +='<span class="pdf" onclick="download(\''+noticeList[m].noticeUrl+'\',\''+noticeList[m].noticeName+'\')"></span>';
//							}
							html +='<span class="pdf" onclick="download(\''+noticeList[0].noticeUrl+'\',\''+noticeList[0].noticeName+'\')"></span>';
							html +='</td>';
						}
						if(privatePlacement.attention){
							html +='<td class="gz"><span class="ygz"  data-stockCode="'+privatePlacement.stockCode+'"></span></td>';
						}else{
							html +='<td class="gz"><span class="wgz"  data-stockCode="'+privatePlacement.stockCode+'"></span></td>';
						}
						html +='</tr>';
					}
					$("#privatePlacement").html(html);
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
					//绑定显示发行对象事件
					$(".fxdx").find("a").on("click", function() {
						$(this).next().attr("style","");
					});
					$(".chaktx_title").find("a").on("click", function() {
						$(this).parent().parent().attr("style","display:none");
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
								findPrivatePlacement(profession,tradingType,startDate,endDate,minRaiseAmount,maxRaiseAmount,minFinancingRatio,maxFinancingRatio,minPremiumRate,maxPremiumRate,pageNumber,size)
							}
						});
						//修改分页文字
						setPageText();
					}
					$("#total").html(total);
					$("#privatePlacement").attr("data-pageSize",pageSize);
				}else{
					$("#privatePlacement").html('');
					$('#page').hide();
					$("#total").html(0);
					var noHtml='<tr><td colspan="13"  scope="col">暂无数据</td></tr>';
					$("#privatePlacement").html(noHtml);
				}
			} else{
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
	//var w=$("#page table").width();
	//$("#page table").css("margin-left",-w/2);
}
/**
 * 回显示
 */
function backShow(){
	var search=window.location.search;
	if(search!=null && search!="" && search!="undefined"){
		search=search.substring(1,search.length);
		var profession=getUrlParam("profession");
		if(profession!=null && profession!="" && profession!="undefined"){
			$("#trade").find("a").each(function(){
				var professionTmp=$(this).text();
				if(profession==professionTmp){
					$(this).addClass("hover");
				}
			});
		}
		var tradingType=getUrlParam("tradingType");
		if(tradingType!=null && tradingType!="" && tradingType!="undefined"){
			$("#tradingType").find("label").each(function(){
				var tradingTypeTmp=$(this).text();
				if(tradingType.indexOf(tradingTypeTmp)>=0){
					$(this).attr("style","color: rgb(95, 189, 211);");
					$(this).prev().addClass("on");
				}
			});
		}
//		var startDate=getUrlParam("startDate");
//		if(startDate!=null && startDate!="" && startDate!="undefined"){
//			$("#starTime").val(startDate);
//		}
//		var endDate=getUrlParam("endDate");
//		if(endDate!=null && endDate!="" && endDate!="undefined"){
//			$("#endTime").val(endDate);
//		}
		var raiseAmount=getUrlParam("raiseAmount");
		if(raiseAmount!=null && raiseAmount!="" && raiseAmount!="undefined"){
			$("#raiseAmount").find("label").each(function(){
				var raiseAmountTmp=$(this).prev().val();
				if(raiseAmountTmp==raiseAmount){
					$(this).addClass("on");
					$(this).next().attr("style","color: rgb(95, 189, 211);");
				}
			});
		}
		var financingRatio=getUrlParam("financingRatio");
		if(financingRatio!=null && financingRatio!="" && financingRatio!="undefined"){
			$("#financingRatio").find("label").each(function(){
				var financingRatioTmp=$(this).prev().val();
				if(financingRatioTmp==financingRatio){
					$(this).addClass("on");
					$(this).next().attr("style","color: rgb(95, 189, 211);");
				}
			});
		}
		var premiumRate=getUrlParam("premiumRate");
		if(premiumRate!=null && premiumRate!="" && premiumRate!="undefined"){
			$("#premiumRate").find("label.on").prev().val()
			$("#premiumRate").find("label").each(function(){
				var premiumRateTmp=$(this).prev().val();
				if(premiumRateTmp==premiumRate){
					$(this).addClass("on");
					$(this).next().attr("style","color: rgb(95, 189, 211);");
				}
			});
		}
	}
	changeParam();
}
/**
 * 发行对象
 * @param purchaser
 * @param type
 * @returns {String}
 */
function getPurchaserHtml(purchaser,type){
	//<!--查看对象弹窗 star-->
	var duixiangHtml='<div class="chaktx" style="display:none">';
		duixiangHtml+='<div class="chaktx_title"><span>发行对象</span><a href="javascript:void(0);">X</a></div>';
		duixiangHtml+='<div class="chaktx_table">';
		duixiangHtml+='<table width="100%" border="1">';
		duixiangHtml+='<tr>';
		duixiangHtml+='<th scope="col" class="tc_fxdx">发行对象</th>';
		duixiangHtml+='<th scope="col" class="tc_rgjg">认购价格(元)</th>';
		duixiangHtml+='<th scope="col" class="tc_rgsl">认购数量(万股)</th>';
		duixiangHtml+='<th scope="col" class="tc_rgje">认购金额(万元)</th>';
		duixiangHtml+='<th scope="col" class="tc_cgqx">持股期限(月)</th>';
		duixiangHtml+='</tr>';
		if(type==5){
			var objList=jQuery.parseJSON(purchaser);
			for(var i=0;i<objList.length;i++){
				var obj=objList[i];
				duixiangHtml+='<tr>';
				duixiangHtml+='<th scope="col" class="tc_fxdx">'+obj.ORGNAME+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgjg">'+obj.F005N_STK236+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgsl">'+obj.F001N_STK236+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgje">'+(obj.F005N_STK236*obj.F001N_STK236).toFixed(2)+'</th>';
				duixiangHtml+='<th scope="col" class="tc_cgqx">'+obj.F004N_STK236+'</th>';
				duixiangHtml+='</tr>';
			}
		}else{
			var str=purchaser.split("、");
			for(var i=0;i<str.length;i++){
				duixiangHtml+='<tr>';
				duixiangHtml+='<th scope="col" class="tc_fxdx">'+str[i]+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgjg">--</th>';
				duixiangHtml+='<th scope="col" class="tc_rgsl">--</th>';
				duixiangHtml+='<th scope="col" class="tc_rgje">--</th>';
				duixiangHtml+='<th scope="col" class="tc_cgqx">--</th>';
				duixiangHtml+='</tr>';
			}
		}
		duixiangHtml+='</table>';
		duixiangHtml+=' </div>';
		duixiangHtml+='</div>';
//		$("#duixiangHtml").html(duixiangHtml);
	return duixiangHtml;
}
