//财务数据
var fieldRankList = [];
$(function() {
	findAssetDebt();
	fieldRank();
	findFiveAbility();
	findDuPontAnalysis();
	$("select[name='fieldRankSl']").on("change", function() {
		findDuPontAnalysis();
		fieldRank();
		findFiveAbility();
	});
	
	$(".center_title a").on("click",function(){
		$(".center_title").find("a").removeClass("hover");
		$(this).addClass("hover");
		var index=$(this).attr("data-index");
		if(index==0){
			findAssetDebt();
		}else if(index==1){
			findBenefit();
		}else if(index==2){
			findCashFlow();
		}
	});
});

/**
 * 获取资产负债信息
 */
function findAssetDebt(){
	$.ajax({
		type:"post",
		url:url+"/finance/findAssetDebt.do",
		async:true,
		data:{
			stockCode:getUrlParam("stockCode")
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var html=findAssetDebtTitle();
					for(var i=0;i<result.length;i++){
						if(i>=4){
							break;
						}
						var assetDebt=result[i];
						html+=findAssetDebtData(assetDebt);
					}
					$("#dataTable").html(html);
				}
				var field=window.location.hash;
				if(field=="#field"){
					var fieldTop=$("#field").offset().top;
					$("html,body").stop().animate({
						"scrollTop":fieldTop
					},300);
				}else if(field=="#dupone"){
					var duponeTop=$("#dupone").offset().top;
					$("html,body").stop().animate({
						"scrollTop":duponeTop
					},300);
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}

/**
 * 获取利润信息
 */
function findBenefit(){
	$.ajax({
		type:"post",
		url:url+"/finance/findBenefit.do",
		async:true,
		data:{
			stockCode:getUrlParam("stockCode")
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var html=findBenefitTitle();
					for(var i=0;i<result.length;i++){
						if(i>=4){
							break;
						}
						var benefit=result[i];
						html+=findBenefitData(benefit);
					}
					$("#dataTable").html(html);
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
/**
 * 获取现金流量信息
 */
function findCashFlow(){
	$.ajax({
		type:"post",
		url:url+"/finance/findCashFlow.do",
		async:true,
		data:{
			stockCode:getUrlParam("stockCode")
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var html=findCashFlowTitle();
					for(var i=0;i<result.length;i++){
						if(i>=4){
							break;
						}
						var cashFlow=result[i];
						html+=findCashFlowData(cashFlow);
					}
					$("#dataTable").html(html);
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
/**
 * 杜邦分析
 */
function findDuPontAnalysis(){
	$.ajax({
		type:"post",
		url:url+"/finance/findDuPontAnalysis.do",
		async:false,
		data:{
			stockCode:getUrlParam("stockCode"),
			date: $("select[name='fieldRankSl']").val()
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var duPontAnalysis=result;
					var html=findDuPontAnalysisHtml(duPontAnalysis);
					$("#duPontAnalysisData").html(html);
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
//行业地位分析
function fieldRank() {
	$.ajax({
		type: "post",
		url: url + "/trade/findTradeContrast.do",
		async: true,
		data: {
			stockCode: getUrlParam("stockCode"),
			date: $("select[name='fieldRankSl']").val()
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if (data.retCode == 0000) {
				if (data.retData.length != 0) {
					var result = data.retData;
					$("#fieldRankTable tbody").empty();
					$("#industry").html(result[0].industry); //行业分类
					$("#pageCount").html(result[0].pageCount); //此行业下企业数量
					$.each(result[0].list, function(index, item) {
						item.earningsPerShare == null ? item.earningsPerShare = '无' : null;
						item.netAssetValuePerShare == null ? item.netAssetValuePerShare = '无' : null;
						item.cashFlowPerShare == null ? item.cashFlowPerShare = '无' : null;
						item.netProfit == null ? item.netProfit = '无' : null;
						item.businessIncome == null ? item.businessIncome = '无' : null;
						item.totalAssets == null ? item.totalAssets = '无' : null;
						item.returnNetAssets == null ? item.returnNetAssets = '无' : null;
						item.shareholderEquityRatio == null ? item.shareholderEquityRatio = '无' : null;
						item.salesGrossMargin == null ? item.salesGrossMargin = '无' : null;
						item.totalShareCapital == null ? item.totalShareCapital = '无' : null;
						var tr = '<tr>';
						tr += '<td>' + (index + 1) + '</td>'; //序号
						tr += '<td>' + item.stockCode + '</td>'; //股票代码
						tr += '<td>' + item.name + '</td>'; //企业简称
						tr += '<td>' + item.earningsPerShare + '</td>'; //每股收益
						tr += '<td>' + item.netAssetValuePerShare + '</td>'; //每股净资产
						tr += '<td>' + item.cashFlowPerShare + '</td>'; //每股现金流
						tr += '<td>' + item.netProfit + '</td>'; //净利润
						tr += '<td>' + item.businessIncome + '</td>'; //营业收入
						tr += '<td>' + item.totalAssets + '</td>'; //总资产
						tr += '<td>' + item.returnNetAssets + '</td>'; //净资产收益率
						tr += '<td>' + item.shareholderEquityRatio + '</td>'; //股东权益比率
						tr += '<td>' + item.salesGrossMargin + '</td>'; //销售毛利率
						tr += '<td>' + item.totalShareCapital + '</td>'; //总股本
						tr += '</tr>';
						$("#fieldRankTable tbody").append(tr);
					});
					$("#fieldRankBtns li").first().addClass("on").siblings().removeClass("on");
					fieldRankList = result[0].list;
					fieldRankData("每股收益");
					$("#fieldRankBtns li").off("click");
					$("#fieldRankBtns li").on("click", function() {
						if (!$(this).hasClass("on")) {
							fieldRankData($(this).text());
							$(this).addClass("on").siblings().removeClass("on");
						}

					});

				} else {
					$("#fieldRankChart").html("");
					$("#fieldRankTable tbody").html("<tr><td colspan='13'>暂无数据</td></tr>");
				}

			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
/**
 * 五能力查询
 */
function findFiveAbility(){
	var date=$("[name='fieldRankSl']").val();
	$.ajax({
		type:"post",
		url:url+"/finance/findFiveAbility.do",
		async:true,
		data:{
			stockCode:getUrlParam("stockCode"),
			date:date
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					var html=findFiveAbilityHtml(result);
					$("#fiveAbility").html(html);
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}


function fieldRankData(name) {
	var xAxis = [];
	var data = [];
	var startValue = 0;

	switch (name) {
		case "每股收益":
			fieldRankList.sort(function(a, b) {
				return b.earningsPerShare - a.earningsPerShare;
			});
			break;
		case "每股净资产":
			fieldRankList.sort(function(a, b) {
				return b.netAssetValuePerShare - a.netAssetValuePerShare;
			});
			break;
		case "每股现金流":
			fieldRankList.sort(function(a, b) {
				return b.cashFlowPerShare - a.cashFlowPerShare;
			});
			break;
		case "净利润":
			fieldRankList.sort(function(a, b) {
				return b.netProfit - a.netProfit;
			});
			break;
		case "营业收入":
			fieldRankList.sort(function(a, b) {
				return b.businessIncome - a.businessIncome;
			});
			break;
		case "总资产":
			fieldRankList.sort(function(a, b) {
				return b.totalAssets - a.totalAssets;
			});
			break;
		case "净资产收益率":
			fieldRankList.sort(function(a, b) {
				return b.returnNetAssets - a.returnNetAssets;
			});
			break;
		case "股东权益比率":
			fieldRankList.sort(function(a, b) {
				return b.shareholderEquityRatio - a.shareholderEquityRatio;
			});
			break;
		case "销售毛利率":
			fieldRankList.sort(function(a, b) {
				return b.salesGrossMargin - a.salesGrossMargin;
			});
			break;
		case "总股本":
			fieldRankList.sort(function(a, b) {
				return b.totalShareCapital - a.totalShareCapital;
			});
			break;
		default:
			break;
	}
	$.each(fieldRankList, function(index, item) {
		xAxis.push(item.name);
		if (item.stockCode == getUrlParam("stockCode")) {
			startValue = index;
		}

		switch (name) {
			case "每股收益":
				data.push(item.earningsPerShare);

				break;
			case "每股净资产":
				data.push(item.netAssetValuePerShare);
				break;
			case "每股现金流":
				data.push(item.cashFlowPerShare);
				break;
			case "净利润":
				data.push(item.netProfit);
				break;
			case "营业收入":
				data.push(item.businessIncome);
				break;
			case "总资产":
				data.push(item.totalAssets);
				break;
			case "净资产收益率":
				data.push(item.returnNetAssets);
				break;
			case "股东权益比率":
				data.push(item.shareholderEquityRatio);
				break;
			case "销售毛利率":
				data.push(item.salesGrossMargin);
				break;
			case "总股本":
				data.push(item.totalShareCapital);
				break;
			default:
				break;
		}
	});
	fieldRankChart(xAxis, name, data, startValue);
}
//行业地位分析数据图表
function fieldRankChart(xAxis, name, data, startValue) {
	var end = 7;
	if (data.length > 170&&data.length <=500) {
		end = 30;
	} else if (100 < data.length && data.length <= 170) {
		end = 13;
	} else if (40 < data.length && data.length <= 100) {
		end = 12;
	} else if (data.length <= 40) {
		end = 5;
	}else if (data.length > 500) {
		end = 170;
	}
	
	var itemIndex=0;
	$.each(xAxis, function(i, item) {
		if (item==decodeURI(getUrlParam("stockName"))) {
			itemIndex=i;
		}
	});
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('fieldRankChart'));
	var option = {
		title: {
			text: "行业地位分析"
		},
		dataZoom: [{
			type: "slider",
			show: true,
			xAxisIndex: 0,
			startValue: startValue - 2,
			endValue: startValue + 2 + (Math.ceil(data.length / end))
				//			backgroundColor: "#CFEBF2",
				//			dataBackground:{
				//				areaStyle:{
				//					 color:"#406ac1"
				//				}
				//			}
		}],
		yAxis: [{
			type: "value",
			data: []
		}],
		xAxis: [{
			type: 'category',
			data: xAxis
		}],
		series: [{
			name: name,
			type: 'bar',
			data: data,
			label: {
				normal: {
					show: true,
					position: "top",
					formatter: function(params) {
						return "第"+(params.dataIndex+1)+"名";
					}
				}
			},
			itemStyle:{
				normal:{
					color:function(params){
						if (params.dataIndex==itemIndex) {
							return "#5FBDD3";
						}else{
							return "#D53A35"; 
						}
					}
				}
			}
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

/**
 * 资产负载字段
 */
function findAssetDebtTitle(){
	var assetDebtTitle='<li>';
		assetDebtTitle+='<span>科目(万元)/年度</span>';
		assetDebtTitle+='<span title="货币资金">货币资金</span>';
		assetDebtTitle+='<span title="应收票据">应收票据</span>';
		assetDebtTitle+='<span title="应收账款">应收账款</span>';
		assetDebtTitle+='<span title="预付账款">预付账款</span>';
		assetDebtTitle+='<span title="其他应收款">其他应收款</span>';
		assetDebtTitle+='<span title="存货">存货</span>';
		assetDebtTitle+='<span title="其他流动资产">其他流动资产</span>';
		assetDebtTitle+='<span title="流动资产合计">流动资产合计</span>';
		assetDebtTitle+='<span title="可供出售金融资产">可供出售金融资产</span>';
		assetDebtTitle+='<span title="长期股权投资">长期股权投资</span>';
		assetDebtTitle+='<span title="固定资产">固定资产</span>';
		assetDebtTitle+='<span title="在建工程">在建工程</span>';
		assetDebtTitle+='<span title="无形资产">无形资产</span>';
		assetDebtTitle+='<span title="商誉">商誉</span>';
		assetDebtTitle+='<span title="长期待摊费用">长期待摊费用</span>';
		assetDebtTitle+='<span title="递延所得税资产">递延所得税资产</span>';
		assetDebtTitle+='<span title="非流动资产合计">非流动资产合计</span>';
		assetDebtTitle+='<span title="资产总计">资产总计</span>';
		assetDebtTitle+='<span title="应付账款">应付账款</span>';
		assetDebtTitle+='<span title="预收账款">预收账款</span>';
		assetDebtTitle+='<span title="应交税费">应交税费</span>';
		assetDebtTitle+='<span title="其他应付款">其他应付款</span>';
		assetDebtTitle+='<span title="其他流动负债">其他流动负债</span>';
		assetDebtTitle+='<span title="流动负债合计">流动负债合计</span>';
		assetDebtTitle+='<span title="负债合计">负债合计</span>';
		assetDebtTitle+='<span title="股本(万股)">股本(万股)</span>';
		assetDebtTitle+='<span title="资本公积金">资本公积金</span>';
		assetDebtTitle+='<span title="盈余公积金">盈余公积金</span>';
		assetDebtTitle+='<span title="未分配利润">未分配利润</span>';
		assetDebtTitle+='<span title="归属于母公司股东权益合计">归属于母公司股东权益合计</span>';
		assetDebtTitle+='<span title="少数股东权益">少数股东权益</span>';
		assetDebtTitle+='<span title="股东权益合计">股东权益合计</span>';
		assetDebtTitle+='<span title="负债和股东权益总计">负债和股东权益总计</span>';
		assetDebtTitle+='</li>';
	return assetDebtTitle;
}
/**
 * 资产负载数据
 */
function findAssetDebtData(assetDebt){
	var assetDebtData='<li>';
		assetDebtData+='<span>'+assetDebt.keyInfo.split("_")[0]+'</span>';
		assetDebtData+='<span>'+(assetDebt.monetaryCapital==null?0.0:assetDebt.monetaryCapital)+'</span>';
		assetDebtData+='<span>'+(assetDebt.notesReceivable==null?0.0:assetDebt.notesReceivable)+'</span>';
		assetDebtData+='<span>'+(assetDebt.receivables==null?0.0:assetDebt.receivables)+'</span>';
		assetDebtData+='<span>'+(assetDebt.advanceMoney==null?0.0:assetDebt.advanceMoney)+'</span>';
		assetDebtData+='<span>'+(assetDebt.otherReceivables==null?0.0:assetDebt.otherReceivables)+'</span>';
		assetDebtData+='<span>'+(assetDebt.inventory==null?0.0:assetDebt.inventory)+'</span>';
		assetDebtData+='<span>'+(assetDebt.otherCurrentAssets==null?0.0:assetDebt.otherCurrentAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalCurrentAssets==null?0.0:assetDebt.totalCurrentAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.availableForAaleFinancialAssets==null?0.0:assetDebt.availableForAaleFinancialAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.longTermEquityInvestment==null?0.0:assetDebt.longTermEquityInvestment)+'</span>';
		assetDebtData+='<span>'+(assetDebt.fixedAssets==null?0.0:assetDebt.fixedAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.processConstruction==null?0.0:assetDebt.processConstruction)+'</span>';
		assetDebtData+='<span>'+(assetDebt.intangibleAssets==null?0.0:assetDebt.intangibleAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.goodWill==null?0.0:assetDebt.goodWill)+'</span>';
		assetDebtData+='<span>'+(assetDebt.longTermUnamortizedExpenses==null?0.0:assetDebt.longTermUnamortizedExpenses)+'</span>';
		assetDebtData+='<span>'+(assetDebt.deferredTaxAssets==null?0.0:assetDebt.deferredTaxAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalNonCurrentAssets==null?0.0:assetDebt.totalNonCurrentAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalAssets==null?0.0:assetDebt.totalAssets)+'</span>';
		assetDebtData+='<span>'+(assetDebt.accountsPayable==null?0.0:assetDebt.accountsPayable)+'</span>';
		assetDebtData+='<span>'+(assetDebt.depositReceived==null?0.0:assetDebt.depositReceived)+'</span>';
		assetDebtData+='<span>'+(assetDebt.taxPayable==null?0.0:assetDebt.taxPayable)+'</span>';
		assetDebtData+='<span>'+(assetDebt.otherPayables==null?0.0:assetDebt.otherPayables)+'</span>';
		assetDebtData+='<span>'+(assetDebt.otherCurrentLiability==null?0.0:assetDebt.otherCurrentLiability)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalCurrentLiability==null?0.0:assetDebt.totalCurrentLiability)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalLiability==null?0.0:assetDebt.totalLiability)+'</span>';
		assetDebtData+='<span>'+(assetDebt.capitalStock==null?0.0:assetDebt.capitalStock)+'</span>';
		assetDebtData+='<span>'+(assetDebt.capitalReserve==null?0.0:assetDebt.capitalReserve)+'</span>';
		assetDebtData+='<span>'+(assetDebt.surplusAccumulationFund==null?0.0:assetDebt.surplusAccumulationFund)+'</span>';
		assetDebtData+='<span>'+(assetDebt.undistributedProfit==null?0.0:assetDebt.undistributedProfit)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalParentAhareholdersAttributable==null?0.0:assetDebt.totalParentAhareholdersAttributable)+'</span>';
		assetDebtData+='<span>'+(assetDebt.minorityEquity==null?0.0:assetDebt.minorityEquity)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalShareholderEquity==null?0.0:assetDebt.totalShareholderEquity)+'</span>';
		assetDebtData+='<span>'+(assetDebt.totalLiabilitiesAndStockholders==null?0.0:assetDebt.totalLiabilitiesAndStockholders)+'</span>';
		assetDebtData+='</li>';
	return assetDebtData;
}

/**
 * 利润-字段
 */
function findBenefitTitle(){
	var benefitTitle='<li>';
		benefitTitle+='<span>科目(万元)/年度</span>';
		benefitTitle+='<span title="净利润">净利润</span>';
		benefitTitle+='<span title="扣非净利润">扣非净利润</span>';
		benefitTitle+='<span title="营业总收入">营业总收入</span>';
		benefitTitle+='<span title="营业收入">营业收入</span>';
		benefitTitle+='<span title="营业总成本">营业总成本</span>';
		benefitTitle+='<span title="营业成本">营业成本</span>';
		benefitTitle+='<span title="营业利润">营业利润</span>';
		benefitTitle+='<span title="投资收益">投资收益</span>';
		benefitTitle+='<span title="资产减值损失">资产减值损失</span>';
		benefitTitle+='<span title="管理费用">管理费用</span>';
		benefitTitle+='<span title="销售费用">销售费用</span>';
		benefitTitle+='<span title="财务费用">财务费用</span>';
		benefitTitle+='<span title="营业外收入">营业外收入</span>';
		benefitTitle+='<span title="营业外支出">营业外支出</span>';
		benefitTitle+='<span title="营业税金及附加">营业税金及附加</span>';
		benefitTitle+='<span title="利润总额">利润总额</span>';
		benefitTitle+='<span title="所得税">所得税</span>';
		benefitTitle+='<span title="综合收益总额">综合收益总额</span>';
		benefitTitle+='<span title="归属于母公司股东的综合收益总额">归属于母公司股东的综合收益总额</span>';
		benefitTitle+='<span title="归属于少数股东的综合收益总额">归属于少数股东的综合收益总额</span>';
		benefitTitle+='</li>';
	return benefitTitle
}

/**
 * 利润数据
 */
function findBenefitData(benefit){
	var benefitData='<li>';
		benefitData+='<span>'+benefit.keyInfo.split("_")[0]+'</span>';
		benefitData+='<span>'+(benefit.netProfit==null?0.0:benefit.netProfit)+'</span>';
		benefitData+='<span>'+(benefit.nonNetProfit==null?0.0:benefit.nonNetProfit)+'</span>';
		benefitData+='<span>'+(benefit.totalOperatingIncome==null?0.0:benefit.totalOperatingIncome)+'</span>';
		benefitData+='<span>'+(benefit.operatingIncome==null?0.0:benefit.operatingIncome)+'</span>';
		benefitData+='<span>'+(benefit.totalOperatingCost==null?0.0:benefit.totalOperatingCost)+'</span>';
		benefitData+='<span>'+(benefit.operatingCost==null?0.0:benefit.operatingCost)+'</span>';
		benefitData+='<span>'+(benefit.operatingProfit==null?0.0:benefit.operatingProfit)+'</span>';
		benefitData+='<span>'+(benefit.investmentIncome==null?0.0:benefit.investmentIncome)+'</span>';
		benefitData+='<span>'+(benefit.assetsImpairmentLoss==null?0.0:benefit.assetsImpairmentLoss)+'</span>';
		benefitData+='<span>'+(benefit.administrativeCost==null?0.0:benefit.administrativeCost)+'</span>';
		benefitData+='<span>'+(benefit.salesExpense==null?0.0:benefit.salesExpense)+'</span>';
		benefitData+='<span>'+(benefit.financialCost==null?0.0:benefit.financialCost)+'</span>';
		benefitData+='<span>'+(benefit.nonBusinessIncome==null?0.0:benefit.nonBusinessIncome)+'</span>';
		benefitData+='<span>'+(benefit.nonBusinessExpenditure==null?0.0:benefit.nonBusinessExpenditure)+'</span>';
		benefitData+='<span>'+(benefit.businessTariffAndAnnex==null?0.0:benefit.businessTariffAndAnnex)+'</span>';
		benefitData+='<span>'+(benefit.totalProfit==null?0.0:benefit.totalProfit)+'</span>';
		benefitData+='<span>'+(benefit.incomeTax==null?0.0:benefit.incomeTax)+'</span>';
		benefitData+='<span>'+(benefit.totalComprehensiveIncome==null?0.0:benefit.totalComprehensiveIncome)+'</span>';
		benefitData+='<span>'+(benefit.parentShareholdersTotalAmount==null?0.0:benefit.parentShareholdersTotalAmount)+'</span>';
		benefitData+='<span>'+(benefit.minorityShareholdersTotalAmount==null?0.0:benefit.minorityShareholdersTotalAmount)+'</span>';
		benefitData+='</li>';
	return benefitData
}

/**
 * 现金流量-字段
 */
function findCashFlowTitle(){
	var cashFlowTitle='<li>';
		cashFlowTitle+='<span>科目(万元)/年度</span>';
		cashFlowTitle+='<span title="销售商品、提供劳务收到的现金">销售商品、提供劳务收到的现金</span>';
		cashFlowTitle+='<span title="收到的税费与返还">收到的税费与返还</span>';
		cashFlowTitle+='<span title="支付的各项税费">支付的各项税费</span>';
		cashFlowTitle+='<span title="支付给职工以及为职工支付的现金">支付给职工以及为职工支付的现金</span>';
		cashFlowTitle+='<span title="经营现金流入">经营现金流入</span>';
		cashFlowTitle+='<span title="经营现金流出">经营现金流出</span>';
		cashFlowTitle+='<span title="经营现金流量净额">经营现金流量净额</span>';
		cashFlowTitle+='<span title="购建固定资产和其他支付的现金">购建固定资产和其他支付的现金</span>';
		cashFlowTitle+='<span title="投资支付的现金">投资支付的现金</span>';
		cashFlowTitle+='<span title="支付其他与投资的现金">支付其他与投资的现金</span>';
		cashFlowTitle+='<span title="投资现金流入">投资现金流入</span>';
		cashFlowTitle+='<span title="投资现金流出">投资现金流出</span>';
		cashFlowTitle+='<span title="投资现金流量净额">投资现金流量净额</span>';
		cashFlowTitle+='<span title="吸收投资收到现金">吸收投资收到现金</span>';
		cashFlowTitle+='<span title="其中子公司吸收现金">其中子公司吸收现金</span>';
		cashFlowTitle+='<span title="取得借款的现金">取得借款的现金</span>';
		cashFlowTitle+='<span title="收到其他与筹资的现金">收到其他与筹资的现金</span>';
		cashFlowTitle+='<span title="偿还债务支付现金">偿还债务支付现金</span>';
		cashFlowTitle+='<span title="分配股利、利润或偿付利息支付的现金">分配股利、利润或偿付利息支付的现金</span>';
		cashFlowTitle+='<span title="支付其他与筹资的现金">支付其他与筹资的现金</span>';
		cashFlowTitle+='<span title="筹资现金流入">筹资现金流入</span>';
		cashFlowTitle+='<span title="筹资现金流出">筹资现金流出</span>';
		cashFlowTitle+='<span title="筹资现金流量净额">筹资现金流量净额</span>';
		cashFlowTitle+='<span title="汇率变动对现金的影响">汇率变动对现金的影响</span>';
		cashFlowTitle+='<span title="现金及现金等价物净增加额">现金及现金等价物净增加额</span>';
		cashFlowTitle+='</li>';
	return cashFlowTitle
}

/**
 * 现金流量数据
 */
function findCashFlowData(cashFlow){
	var cashFlowData='<li>';
		cashFlowData+='<span>'+cashFlow.keyInfo.split("_")[0]+'</span>';
		cashFlowData+='<span>'+(cashFlow.sellingAndlaborCash==null?0.0:cashFlow.sellingAndlaborCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.receiptAndReturnTax==null?0.0:cashFlow.receiptAndReturnTax)+'</span>';
		cashFlowData+='<span>'+(cashFlow.paymentsTax==null?0.0:cashFlow.paymentsTax)+'</span>';
		cashFlowData+='<span>'+(cashFlow.workerPayAndworkerCash==null?0.0:cashFlow.workerPayAndworkerCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.operatingCashInFlows==null?0.0:cashFlow.operatingCashInFlows)+'</span>';
		cashFlowData+='<span>'+(cashFlow.operatingCashFlow==null?0.0:cashFlow.operatingCashFlow)+'</span>';
		cashFlowData+='<span>'+(cashFlow.netOperatingCashFlow==null?0.0:cashFlow.netOperatingCashFlow)+'</span>';
		cashFlowData+='<span>'+(cashFlow.fixedAssetsAndOtherPaymentCash==null?0.0:cashFlow.fixedAssetsAndOtherPaymentCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.investmentPayment==null?0.0:cashFlow.investmentPayment)+'</span>';
		cashFlowData+='<span>'+(cashFlow.otherInvestmentCash==null?0.0:cashFlow.otherInvestmentCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.investmentCashInFlows==null?0.0:cashFlow.investmentCashInFlows)+'</span>';
		cashFlowData+='<span>'+(cashFlow.investmentCashFlow==null?0.0:cashFlow.investmentCashFlow)+'</span>';
		cashFlowData+='<span>'+(cashFlow.investmentNetCashFlow==null?0.0:cashFlow.investmentNetCashFlow)+'</span>';
		cashFlowData+='<span>'+(cashFlow.absorbInvestmentCash==null?0.0:cashFlow.absorbInvestmentCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.subsidiaryAbsorbCash==null?0.0:cashFlow.subsidiaryAbsorbCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.borrowCash==null?0.0:cashFlow.borrowCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.financingCash==null?0.0:cashFlow.financingCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.repayDebtCash==null?0.0:cashFlow.repayDebtCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.allocationPayCash==null?0.0:cashFlow.allocationPayCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.payFinancingCash==null?0.0:cashFlow.payFinancingCash)+'</span>';
		cashFlowData+='<span>'+(cashFlow.raiseCashInflows==null?0.0:cashFlow.raiseCashInflows)+'</span>';
		cashFlowData+='<span>'+(cashFlow.raiseCashFlows==null?0.0:cashFlow.raiseCashFlows)+'</span>';
		cashFlowData+='<span>'+(cashFlow.financingNetCashFlow==null?0.0:cashFlow.financingNetCashFlow)+'</span>';
		cashFlowData+='<span>'+(cashFlow.exchangeRateChanges==null?0.0:cashFlow.exchangeRateChanges)+'</span>';
		cashFlowData+='<span>'+(cashFlow.netIncreaseAndEquivalentsCash==null?0.0:cashFlow.netIncreaseAndEquivalentsCash)+'</span>';
		cashFlowData+='</li>';
	return cashFlowData
}

/**
 * 五能力数据
 * @param fiveAbility
 */
function findFiveAbilityHtml(fiveAbility){
	var fiveAbilityHtml='<h2>短期偿债能力</h2>';
		fiveAbilityHtml+='<ul>';
		fiveAbilityHtml+='<li><span>流动比率:</span><p>'+fiveAbility.liquidityRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>速动比率:</span><p>'+fiveAbility.quickRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>现金资产比率:</span><p>'+fiveAbility.cashAssetsRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='</ul>';
		
		fiveAbilityHtml+='<h2>长期偿债能力</h2>';
		fiveAbilityHtml+='<ul>';
		fiveAbilityHtml+='<li><span>资产负债率:</span><p>'+fiveAbility.assetLiabilityRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>产权比率:</span><p>'+fiveAbility.equityRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>利息偿付倍数:</span><p>'+fiveAbility.interestCover.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='</ul>';


		fiveAbilityHtml+='<h2>运营能力</h2>';
		fiveAbilityHtml+='<ul>';
		fiveAbilityHtml+='<li><span>应收账款周转率:</span><p>'+fiveAbility.accountReceivableTurnover.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>存货周转率:</span><p>'+fiveAbility.stockTurnoverRate.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>流动资产周转率:</span><p>'+fiveAbility.liquidAssetsVelocity.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>固定资产周转率:</span><p>'+fiveAbility.fixedAssetsTurnover.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>总资产周转率:</span><p>'+fiveAbility.totalCapitalTurnover.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='</ul>';
		
		fiveAbilityHtml+='<h2>盈利能力</h2>';
		fiveAbilityHtml+='<ul>';
		fiveAbilityHtml+='<li><span>营业利润率:</span><p>'+fiveAbility.operatingProfitRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>成本费用利润率:</span><p>'+fiveAbility.costProfitsRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>盈余现金保障倍数:</span><p>'+fiveAbility.surplusCashCover.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>总资产报酬率:</span><p>'+fiveAbility.totalAssetsRate.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>净资产收益率:</span><p>'+fiveAbility.equityReturn.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>资本收益率:</span><p>'+fiveAbility.capitalReturn+'</p></li>';
		fiveAbilityHtml+='<li><span>市盈率:</span><p>'+fiveAbility.priceEarningRatio.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='</ul>';
		
		fiveAbilityHtml+='<h2>发展能力</h2>';
		fiveAbilityHtml+='<ul>';
		fiveAbilityHtml+='<li><span>营业收入增长率:</span><p>'+fiveAbility.businessRevenueIncreaseRate.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>资本保值增值率:</span><p>'+fiveAbility.hedgingProliferatingRatios.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>资本积累率:</span><p>'+fiveAbility.capitalAccumulationRate.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>总资产增长率:</span><p>'+fiveAbility.totalAssetsGrowthRate.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>营业利润增长率:</span><p>'+fiveAbility.operatingProfitGrowth.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>营业收入三年平均增长率:</span><p>'+fiveAbility.threeYearsBusinessIncomeAverageGrowthRate.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='<li><span>三年资本平均增长率:</span><p>'+fiveAbility.threeYearsCapitalAverageGrowth.toFixed(2)+'%</p></li>';
		fiveAbilityHtml+='</ul>';
	return fiveAbilityHtml;
}
/**
 * 杜邦分析页面代码
 * @param duPontAnalysis
 * @returns {String}
 */
function findDuPontAnalysisHtml(duPontAnalysis){
	var duPontAnalysisHtml='<ul>';
		duPontAnalysisHtml+='<li class="clearfix jzcsy">';
		duPontAnalysisHtml+='<div class="dbfx_dbox">';
		duPontAnalysisHtml+='<div class="list_box clearfix">';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>净资产收益率</span><b>'+duPontAnalysis.netAssetsIncomeRate.toFixed(2)+'%</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</li>';
		
		duPontAnalysisHtml+='<li class="clearfix shuline h_01"></li>';
		duPontAnalysisHtml+='<li class="clearfix line01">';
		duPontAnalysisHtml+='<div class="shuxian first"></div>';
		duPontAnalysisHtml+='<div class="shuxian last"></div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix fist_li">';
		duPontAnalysisHtml+='<div class="dbfx_dbox ">';
		duPontAnalysisHtml+='<div class="list_box clearfix w860">';
		duPontAnalysisHtml+='<div class="db_fuhao1"><em>1÷(1-</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>资产负债率</span><b>'+duPontAnalysis.assetLiabilityRatio.toFixed(2)+'%</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao"><em>)=</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>权益乘数</span><b>'+duPontAnalysis.equityMultiplier.toFixed(2)+'%</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao4"><em>X</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>总资产收益率</span><b>'+duPontAnalysis.totalAssetsRatio.toFixed(2)+'%</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';								
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix shuline h_02"></li>';
		duPontAnalysisHtml+='<li class="clearfix shuline h_03"></li>';
		duPontAnalysisHtml+='<li class="clearfix shuline h_04"></li>';
		duPontAnalysisHtml+='<li class="clearfix line02">';
		duPontAnalysisHtml+='<div class="shuxian first"></div>';
		duPontAnalysisHtml+='<div class="shuxian last"></div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix line03">';
		duPontAnalysisHtml+='<div class="shuxian first"></div>';
		duPontAnalysisHtml+='<div class="shuxian last"></div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix line04">';
		duPontAnalysisHtml+='<div class="shuxian first"></div>';
		duPontAnalysisHtml+='<div class="shuxian last"></div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix">';
		duPontAnalysisHtml+='<div class="dbfx_dbox ">';
		duPontAnalysisHtml+='<div class="list_box clearfix w860">';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>负债总额/万</span><b>'+duPontAnalysis.totalLiability.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao2"><em>÷</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>资产总额/万</span><b>'+duPontAnalysis.totalAssets.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao3"><em>÷</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>所有者权益总额/万</span><b>'+duPontAnalysis.totalShareholderEquity.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao3"><em></em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>销售净利率</span><b>'+duPontAnalysis.netProfitSalesRatio.toFixed(2)+'%</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao3"><em>X</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>总资产周转率</span><b>'+duPontAnalysis.totalCapitalTurnover.toFixed(2)+'%</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';								
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix shuline h_05"></li>';
		duPontAnalysisHtml+='<li class="clearfix shuline h_06"></li>';
		duPontAnalysisHtml+='<li class="clearfix shuline h_07"></li>';
		duPontAnalysisHtml+='<li class="clearfix line05">';
		duPontAnalysisHtml+='<div class="shuxian first"></div>';
		duPontAnalysisHtml+='<div class="shuxian last"></div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix line06">';
		duPontAnalysisHtml+='<div class="shuxian first"></div>';
		duPontAnalysisHtml+='<div class="shuxian last"></div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix line07">';
		duPontAnalysisHtml+='<div class="shuxian first"></div>';
		duPontAnalysisHtml+='<div class="shuxian last"></div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix">';
		duPontAnalysisHtml+='<div class="dbfx_dbox ">';
		duPontAnalysisHtml+='<div class="list_box clearfix">';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>流动负债/万</span><b>'+duPontAnalysis.totalCurrentLiability.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao5"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		var totalNonCurrentLiabilities=0.0;
		if(duPontAnalysis.totalNonCurrentLiabilities!=null && duPontAnalysis.totalNonCurrentLiabilities!="" && duPontAnalysis.totalNonCurrentLiabilities!="null"){
			totalNonCurrentLiabilities=duPontAnalysis.totalNonCurrentLiabilities;
		}
		duPontAnalysisHtml+='<span>非流动负债/万</span><b>'+totalNonCurrentLiabilities.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao5"><em></em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>流动资产/万</span><b>'+duPontAnalysis.totalCurrentAssets.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao5"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>非流动资产/万</span><b>'+duPontAnalysis.totalNonCurrentAssets.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao5"><em></em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>净利润/万</span><b>'+duPontAnalysis.netProfit.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao5"><em>÷</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>营业总收入/万</span><b>'+duPontAnalysis.totalOperatingIncome.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';									
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix shuli3">';
		duPontAnalysisHtml+='<div class="dbfx_dbox ">';
		duPontAnalysisHtml+='<div class="list_box clearfix">';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>货币资金/万</span><b>'+duPontAnalysis.monetaryCapital.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>应收账款/万</span><b>'+duPontAnalysis.receivables.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>存货/万</span><b>'+duPontAnalysis.inventory.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';									
		duPontAnalysisHtml+='</div>';	
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix line08"></li>';
		duPontAnalysisHtml+='<li class="clearfix shuli4">';
		duPontAnalysisHtml+='<div class="dbfx_dbox ">';
		duPontAnalysisHtml+='<div class="list_box clearfix">';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>营业总收入/万</span><b>'+duPontAnalysis.totalOperatingIncome.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>总成本/万</span><b>'+duPontAnalysis.totalCost.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>其他利润/万</span><b>'+duPontAnalysis.otherProfit.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>所得税/万</span><b>'+duPontAnalysis.incomeTax.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';								
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='<li class="clearfix line09"></li>';
		duPontAnalysisHtml+='<li class="clearfix line11"></li>';
		duPontAnalysisHtml+='<li class="clearfix line10"></li>';
		duPontAnalysisHtml+='<li class="clearfix shuli5">';
		duPontAnalysisHtml+='<div class="dbfx_dbox ">';
		duPontAnalysisHtml+='<div class="list_box clearfix">';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>营业成本/万</span><b>'+duPontAnalysis.operatingCost.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>销售费用/万</span><b>'+duPontAnalysis.salesExpense.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>管理费用/万</span><b>'+duPontAnalysis.administrativeCost.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='<div class="db_fuhao6"><em>+</em></div>';
		duPontAnalysisHtml+='<div class="dblist">';
		duPontAnalysisHtml+='<span>财务费用/万</span><b>'+duPontAnalysis.financialCost.toFixed(2)+'</b>';
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</div>';									
		duPontAnalysisHtml+='</div>';
		duPontAnalysisHtml+='</li>';
		duPontAnalysisHtml+='</ul>';
	return duPontAnalysisHtml;
}
