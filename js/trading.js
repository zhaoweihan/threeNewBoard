var fieldRankList = [];
var n = 0; //热词切换 标记
var hotList = [];
$(function() {
	//热词
	hotWord();
	$("#searchCompany").val('');
	/**
	 * 添加回车事件
	 */
	$("#searchCompany").keydown(function(e) {
		if(e.keyCode==13){
			$("#searchHome").click();
		}
	});
	$("#searchHome").on("click", function() {
		if($("#searchCompany").val() != "") {
			var val = $.trim($("#searchCompany").val());
			if(searchList.length != 0) {
				$.each(searchList, function(index, flag) {
					if(val == flag.name || val == flag.code) {
						window.location.href = 'industryResearch.html?stockCode=' + flag.code + '&stockName=' + encodeURI(flag.name);
					} else {
						index == searchList.length - 1 ? $.zmAlert("请输入正确的检索信息") : null;
					}
				});
			} else {
				$.zmAlert("请输入正确的检索信息");
			}

		} else {
			$.zmAlert("请输入要检索的信息");
		}
	});
	$(".search_hyh a").on("click", function() {
		n == 0 ? n = 1 : n = 0;
		showHotWword();
	});
	//判断cookie里是否有用户名
	if($.cookie("userName") != undefined && $.cookie("userName") != null && $.cookie("userName") != "") {
		$("#userName").html($.cookie("userName"));
	} else {
		$("#userName").html($.cookie("phone").slice(0, 3) + "****" + $.cookie("phone").slice(7, 11));
	}
	//首页退出按钮
	$("#dropOut").on('click', dropOut);
	var isShowTrading = true;
	//首页滚动条
	$(window).scroll(function() {
		if($(this).scrollTop() >= 1250) {
			if(isShowTrading) {
				isShowTrading = false;
				findTrading(1, "tradingAmount", -1, 1, 12);
				myInvestigation();
			}
		}
	});
	$(".tj_gs a").on("click", function() {
		$(this).parent(".tj_gs").remove();
	});
	//首页顶部搜索
	$("#searchCompany").autocomplete({
		minLength: 2,
		source: function(request, response) {
			autocomplete(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			window.location.href = 'industryResearch.html?stockCode=' + item.code + '&stockName=' + encodeURI(item.name);
		}
	});
	/**
	 * 添加回车事件
	 */
	$("#searchStock").keydown(function(e) {
		if(e.keyCode==13){
			$("#addCompany").click();
			$("#searchStock").blur();
		}
	});
	//首页对标搜索
	$("#searchStock").autocomplete({
		minLength: 2,
		source: function(request, response) {
			autocomplete(request, response);
		},
		delay: 500,
		select: function(event, ui) {
			var item = ui.item;
			$("#searchName").val(item.name);
			$("#searchCode").val(item.code);
		}
	});

	//添加企业
	$("#addCompany").on("click", function() {
		if(searchList.length != 0) {
			$.each(searchList, function(index, item) {
				if($("#searchStock").val() == item.code || $("#searchStock").val() == item.name||$("#searchStock").val()==(item.name+"（"+item.code+"）")) {
					$("#searchName").val(item.name);
					$("#searchCode").val(item.code);
					return false;
				} else {
					index == searchList.length - 1 ? $.zmAlert("请输入正确的检索信息") : null;
				}
			});
		} else {
			$.zmAlert("请输入正确的检索信息");
		}
		if($("#searchName").val() != "" && $("#searchCode").val() != "" && $("li.tj_gs").size() < 3) {
			var name = $("#searchName").val();
			var code = $("#searchCode").val();
			if($("li.tj_gs").size() > 0) {
				var key = 1
				$("li.tj_gs").each(function(index, item) {
					if($(item).attr("data-num") == code) {
						$.zmAlert("您已经选择了这个企业了");
						key = 2
						return false;
					}
				});
				if(key == 2) {
					$("#searchStock").val("").focus();
					return false;
				}
			}
			var li = $("<li class='tj_gs'>");
			li.attr("data-num", code).attr("data-name", name);
			var span = $("<span>");
			span.html(name + " " + code);
			var a = $("<a href='javascript:;'>");
			var img = $("<img src='images/cha.jpg' width='37' height='38'>");
			a.html(img);
			li.append(span);
			li.append(a);
			a.on("click", function() {
				$(this).parent(".tj_gs").remove();
			});
			$("#companyList").append(li);
			$("#searchStock").val("").focus();
			$("#searchName").val("");
			$("#searchCode").val("");
		} else if($("#searchName").val() == "" || $("#searchCode").val() == "") {
			$.zmAlert("请输入正确的检索信息");
		} else if($("li.tj_gs").size() >= 3) {
			$.zmAlert("最多选取三家企业进行比较");
		}
	});

	//生成财务对标图表数据
	$("#cwfx").on("click", function() {
		chartsData("bar");
	});
	//五能力图标分析
	$("#fiveChartBtn").on("click", function() {
		fivePower();
	});
	//行业地位分析
	$("#fieldRank").on("click", function() {
		fieldRank();
	});
	//杜邦分析
	$("#startDuPont").on("click", function() {
		findDuPontAnalysis();
	});

});

/**
 * 交易行情类型切换
 * @param tradingType
 */
function changeTrding(tradingType) {
	$("#tradingTable").html("");
	if(tradingType == -1) {
		$("#quotation_tab").children().eq(0).attr("class", "");
		$("#quotation_tab").children().eq(1).attr("class", "");
		$("#quotation_tab").children().eq(2).attr("class", "hover");
	} else if(tradingType == 1) {
		$("#quotation_tab").children().eq(0).attr("class", "hover");
		$("#quotation_tab").children().eq(1).attr("class", "");
		$("#quotation_tab").children().eq(2).attr("class", "");
	} else if(tradingType == 2) {
		$("#quotation_tab").children().eq(0).attr("class", "");
		$("#quotation_tab").children().eq(1).attr("class", "hover");
		$("#quotation_tab").children().eq(2).attr("class", "");
	}
	findTrading(tradingType, "tradingAmount", -1, null, 12);
}
/**
 * 排序方式
 * @param sortParam 排序字段
 * @param sortType 排序方式：1(升序)<or>-1(降序)
 */
function changSort(sortParam, sortType) {
	var tradingType_index = $("#quotation_tab").find("a.hover").index();
	var tradingType = $("#quotation_tab").children().eq(tradingType_index).attr("data-tag");
	$("#tradingTable").html("");
	findTrading(tradingType, sortParam, sortType, null, 12);
}
/**
 * 更多
 */
function moreTradingDate() {
	var tradingType_index = $("#quotation_tab").find("a.hover").index();
	var tradingType = $("#quotation_tab").children().eq(tradingType_index).attr("data-tag");
	var sort_index = $("#tradingTableTr").find("th.sort").index();
	var sortParam = $("#tradingTableTr").children().eq(sort_index).children().attr("data-tag");
	var sortTypeClass = $("#tradingTableTr").children().eq(sort_index).children().attr("class");
	var sortType = -1;
	if(sortTypeClass == "up_s") {
		sortType = 1;
	}
	var pageNum = $("#more").attr("data-pageNum");
	var pageSize = $("#more").attr("data-pageSize");
	var pageTotal = $("#more").attr("data-pageTotal");
	pageNum = Number(pageNum) + 1;
	if(pageNum > pageTotal) {
		return false;
	}
	findTrading(tradingType, sortParam, sortType, pageNum, pageSize)
}
/**
 * 交易行情数据
 * @param tradingType 交易类型
 * @param sortParam 排序字段
 * @param sortType 排序方式：1(升序)<or>-1(降序)
 * @param pageNum 页数
 * @param pageSize 每页的条数
 */
function findTrading(tradingType, sortParam, sortType, pageNum, pageSize) {
	$.ajax({
		type: "post",
		url: url + "/trading/find.do",
		async: false,
		data: {
			tradingType: tradingType,
			sortParam: sortParam,
			sortType: sortType,
			pageNum: pageNum,
			pageSize: pageSize
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData
				if(result != null) {
					$("#more").attr("data-pageNum", result.pageNum);
					$("#more").attr("data-pageSize", result.pageSize);
					$("#more").attr("data-pageTotal", result.pageCount);
					var tradingList = result.rows;
					var html = '';
					for(var i = 0; i < tradingList.length; i++) {
						var trading = tradingList[i];
						html += '<tr>';
						html += '<td class="daima"><a href="javascript:void(0);">' + trading.stockCode + '</a></td>';
						html += '<td class="mingcheng"><a href="javascript:void(0);">' + trading.stockName + '</a></td>';
						var newPrice = "--";
						if(trading.newPrice != null) {
							newPrice = trading.newPrice;
						}
						html += '<td class="zxj black">' + newPrice + '</td>';
						var changeAmount = "--";
						if(trading.changeAmount != null) {
							changeAmount = trading.changeAmount;
						}
						html += '<td class="zde black">' + changeAmount + '</td>';
						var priceChangeRatio = "--";
						if(trading.priceChangeRatio != null) {
							priceChangeRatio = trading.priceChangeRatio;
						}
						html += '<td class="zdf black">' + priceChangeRatio + '</td>';
						var openPrice = "--";
						if(trading.openPrice != null) {
							openPrice = trading.openPrice;
						}
						html += '<td class="jk">' + openPrice + '</td>';
						var highPrice = "--";
						if(trading.highPrice != null) {
							highPrice = trading.highPrice;
						}
						html += '<td class="zuigao">' + highPrice + '</td>';
						var lowPrice = "--";
						if(trading.lowPrice != null) {
							lowPrice = trading.lowPrice;
						}
						html += '<td class="zuidi">' + lowPrice + '</td>';
						var tradingVolume = "--";
						if(trading.tradingVolume != null) {
							tradingVolume = trading.tradingVolume;
						}
						html += '<td class="cjlwg">' + (tradingVolume / 10000).toFixed(2) + '</td>';
						var tradingAmount = "--";
						if(trading.tradingAmount != null) {
							tradingAmount = trading.tradingAmount;
						}
						html += '<td class="cjjew black">' + (tradingAmount / 10000).toFixed(2) + '</td>';
						html += '</tr>';
					}
					$("#tradingTable").append(html);
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

function chartsData(type) {
	var series = []; //财务对标图表数据参数
	var stockCodes = [];
	var stockName = [];
	$("li.tj_gs").each(function() { //遍历股票代码
		stockCodes.push($(this).attr("data-num"));
		stockName.push($(this).attr("data-name"));
	});
	if(stockCodes.length == 0) { //判断是否选择了至少一个公司
		$.zmAlert("请选择至少一家公司");
		return false;
	}
	var stockCodeStr = stockCodes.join(","); //股票代码
	var scale = $("input[name='scaleBk']:checked").val();
	var operate = $("input[name='operateBk']:checked").val();
	var other = $("input[name='otherBk']:checked").val();
	if(scale == undefined && operate == undefined && other == undefined) {
		$.zmAlert("只少选择一项进行比对");
		return false;
	}
	scale == undefined ? scale = "" : scale = scale;
	operate == undefined ? operate = "" : operate = "," + operate;
	other == undefined ? other = "" : other = "," + other;
	var target = scale + operate + other;
	var s = $("input[name='timeBk']");
	var timeBk = new Array();
	$.each(s, function(index, flag) {
		if($(flag).is(":checked")) {
			timeBk.push($(flag).val());
		}
	});
	if(timeBk.length == 0) {
		$.zmAlert("至少选择一个时间节点");
		return false;
	}
	var timeBkStr = timeBk.join(",");
	$.ajax({
		type: "post",
		url: url + "/finance/findIndicators.do",
		async: true,
		data: {
			date: timeBk[0],
			stockCodes: stockCodeStr,
			target: target,
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				if(result != null) {
					targets = target.split(",");
					var ld = []; //图标顶端标注数据
					$.each(targets, function(index, item) {
						//用input 的 name 匹配展示的项目类别
						var name = targets[index].substring(0, targets[index].length - 2);
						var nameDetail = $("label[data-name='" + targets[index] + "']").text();
						ld.push(nameDetail); //插入标注数据
						//拼出 数据图表要用的 series
						switch(name) {
							case "scale":
								var d1 = [];
								$.each(result, function(i, flag) {
									flag.scale == null ? flag.scale = 0 : null;
									d1.push(flag.scale);
								});
								var obj1 = {
									name: nameDetail,
									type: type,
									data: d1,
									barMaxWidth: "60",
									label: {
										normal: {
											show: true,
											position: 'top'
										}
									}
								};
								series.push(obj1);
								break;
							case "operate":
								var d2 = [];
								$.each(result, function(i, flag) {
									flag.operate == null ? flag.operate = 0 : null;
									d2.push(flag.operate);
								});
								var obj2 = {
									name: nameDetail,
									type: type,
									barMaxWidth: "60",
									data: d2,
									label: {
										normal: {
											show: true,
											position: 'top'
										}
									}
								};
								series.push(obj2);
								break;
							case "other":
								var d3 = [];
								$.each(result, function(i, flag) {
									flag.other == null ? flag.other = 0 : null;
									d3.push(flag.other);
								});
								var obj3 = {
									name: nameDetail,
									barMaxWidth: "60",
									type: type,
									data: d3,
									label: {
										normal: {
											show: true,
											position: 'top'
										}
									}
								};
								series.push(obj3);
								break;
							default:

								break;
						}
					});
					$(".chartBtn").first().addClass("on").siblings().removeClass("on");
					$(".dataAnalysisTable[data-num='1']").slideDown(function() {
						showCharts(series, "财务指标对标", stockName, ld, "");
					});
					$("#columnChart").on("click", function() { //柱形图
						$(this).addClass("on").siblings(".chartBtn").removeClass("on");
						$.each(series, function(i, item) {
							series[i].label.normal.position = "top";
						});
						showCharts(series, "财务指标对标", stockName, ld, "");
					});
					$("#barChart").on("click", function() { //条形图
						$(this).addClass("on").siblings(".chartBtn").removeClass("on");
						$.each(series, function(i, item) {
							series[i].label.normal.position = "right";
						});
						showCharts(series, "财务指标对标", "", ld, stockName);
					});
					$("#lineChart").off("click");
					//折线图
					$("#lineChart").on("click", function() {
						lineCharts();
					});
				} else {
					$(".dataAnalysisTable[data-num='1']").slideDown(function() {
						$("#chartsData").html("暂无数据");
					});
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

function showCharts(series, title, xAxis, ld, yAxis) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('chartsData'));

	// 指定图表的配置项和数据
	var option = {
		title: {
			text: title
		},
		tooltip: {},
		legend: {
			data: ld,
			align: 'auto'
		},
		xAxis: {
			data: xAxis
		},
		yAxis: {
			data: yAxis
		},
		series: series
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
//折线图
function lineCharts() {
	var series = [];
	var stockCodes = [];
	var stockName = [];
	$("li.tj_gs").each(function() { //遍历股票代码
		stockCodes.push($(this).attr("data-num"));
		stockName.push($(this).attr("data-name"));
	});
	if(stockCodes.length == 0) { //判断是否选择了至少一个公司
		$.zmAlert("请选择至少一家公司");
		return false;
	}
	var stockCodeStr = stockCodes.join(","); //股票代码
	var scale = $("input[name='scaleBk']:checked").val();
	var operate = $("input[name='operateBk']:checked").val();
	var other = $("input[name='otherBk']:checked").val();
	if(scale == undefined && operate == undefined && other == undefined) {
		$.zmAlert("只少选择一项进行比对");
		return false;
	}
	scale == undefined ? scale = "" : scale = scale;
	operate == undefined ? operate = "" : operate = "," + operate;
	other == undefined ? other = "" : other = "," + other;
	var target = scale + operate + other;
	var targetList = target.split(",");
	if(targetList[0] == "") {
		targetList.shift();
	}
	var s = $("input[name='timeBk']");
	var timeBk = new Array();
	$.each(s, function(index, flag) {
		if($(flag).is(":checked")) {
			timeBk.push($(flag).val());
		}
	});
	if(timeBk.length == 0) {
		$.zmAlert("至少选择一个时间节点");
		return false;
	}
	var timeBkStr = timeBk.join(",");
	$.ajax({
		type: "post",
		url: url + "/finance/findIndicatorsCurve.do",
		async: true,
		data: {
			date: timeBkStr,
			stockCodes: stockCodeStr,
			target: target,
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				$(".chartBtn").last().addClass("on").siblings().removeClass("on");
				if(data.retData != null) {
					var result = data.retData;
					var sl = stockCodes.length * targetList.length;
					var ogj = {};
					$.each(result, function(index, flag) {
						if(typeof(flag[0]) == "number" && flag[0] < 999999999) {
							var indexTmp = index.split("_");
							var aaa = "";
							var nameCode = "";
							for(var i = 0; i < stockCodes.length; i++) {
								if(indexTmp[0] == stockCodes[i]) {
									nameCode = stockName[i];
								}
							}
							if(indexTmp[1] == "other") {
								aaa = nameCode + "_其他指标"
							} else if(indexTmp[1] == "operate") {
								aaa = nameCode + "_经营指标"
							} else if(indexTmp[1] == "scale") {
								aaa = nameCode + "_规模指标"
							}

							ogj = {
								name: aaa,
								type: 'line',
								data: flag
							}
							series.push(ogj);
						}

					});

					showlineCharts(result.dateFomrt, series);
				} else {
					$("#chartsData").html("暂无数据");
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

function showlineCharts(xAxis, series) {
	var myChart = echarts.init(document.getElementById('chartsData'));
	// 指定图表的配置项和数据
	var option = {
		title: {
			text: '财务指标对标'
		},
		tooltip: {
			trigger: 'axis'
		},
		dataZoom: [{
			type: "slider",
			show: true,
			yAxisIndex: 0
		}],
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: true,
			data: xAxis //['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		},
		yAxis: {
			type: 'value'
		},
		series: series
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}

function fivePower() {
	//股票代码
	var stockCodes = [];
	var stockCodeStr = '';
	var companyName = [];
	var dates = $("input[name='fiveTime']:checked").val();
	$("li.tj_gs").each(function() { //遍历股票代码
		stockCodes.push($(this).attr("data-num"));
	});
	stockCodeStr = stockCodes.join(",");
	if(stockCodes.length == 0) { //判断是否选择了至少一个公司
		$.zmAlert("请选择至少一家公司");
		return false;
	}
	if($("input[name='fiveName']:checked").val() == undefined) { //判断是否选择了一种能力
		$.zmAlert("请至少选择一种能力进行比对");
		return false;
	}
	if(dates == undefined) {
		$.zmAlert("请选择时间节点");
		return false;
	}
	//判断是那种能力比对
	var fiveName = $("input[name='fiveName']:checked").val();
	var nextUrl = '';
	var text = '';
	var indicator = []; //雷达图 坐标轴刻度
	switch(Number(fiveName)) {
		case 1: //短期偿债能力
			indicator = [{
				name: "流动比率"
			}, {
				name: "速动比率"
			}, {
				name: "现金资产比率"
			}];
			text = '短期偿债能力';
			nextUrl = '/finance/findShortTerm.do';
			break;
		case 2: //长期偿债能力
			indicator = [{
				name: "资产负债率"
			}, {
				name: "产权比率"
			}, {
				name: "利息偿付倍数"
			}];
			text = '长期偿债能力';
			nextUrl = '/finance/findLongTerm.do';
			break;
		case 3: //运营能力
			indicator = [{
				name: "流动资产周转率"
			}, {
				name: "应收账款周转率"
			}, {
				name: "存货周转率"
			}, {
				name: "总资产周转率"
			}, {
				name: "固定资产周转率"
			}];
			text = '运营能力';
			nextUrl = '/finance/findOperation.do';
			break;
		case 4: //盈利能力
			indicator = [{
				name: "营业利润率"
			}, {
				name: "成本费用利润率"
			}, {
				name: "盈余现金保障倍数"
			}, {
				name: "总资产报酬率"
			}, {
				name: "净资产收益率"
			}, {
				name: "资本收益率"
			}, {
				name: "市盈率"
			}];
			text = '盈利能力';
			nextUrl = '/finance/findProfit.do';
			break;
		case 5: //发展能力
			indicator = [{
				name: "营业收入增长率"
			}, {
				name: "资本保值增值率"
			}, {
				name: "资本积累率"
			}, {
				name: "总资产增长率"
			}, {
				name: "营业利润增长率"
			}, {
				name: "营业收入三年平均增长率"
			}, {
				name: "资本三年平均增长率"
			}];
			text = '发展能力';
			nextUrl = '/finance/findProgress.do';
			break;
	}
	$.ajax({
		type: "post",
		url: url + nextUrl,
		async: true,
		data: {
			date: dates, //"2015-12-31" ,
			stockCodes: stockCodeStr
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				$(".dataAnalysisTable[data-num='2']").slideDown(function() {
					//fiveRadarCallback(data);
					fiveTableCallback(data, fiveName);

				});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});

}
//五能力表格方法
function fiveTableCallback(data, fiveName) {
	if(data.retData != null && data.retData[0] != null) {
		var result = data.retData;
		$("#fivePowerTable thead tr").html("<th>企业简称</th>");
		$("#fivePowerTable tbody").empty();
		$.each(result, function(index, flag) {
			if(flag != null) {
				var itemName = [];
				var itemVal = [];
				var th = $("<th>");
				th.html(flag.stockName);
				$("#fivePowerTable thead tr").append(th);
				switch(Number(fiveName)) {
					case 1:
						itemVal = [flag.liquidityRatio, flag.quickRatio, flag.cashAssetsRatio];
						itemName = ['流动比率', '速动比率', '现金资金比率'];
						break;
					case 2:
						itemVal = [flag.assetLiabilityRatio, flag.equityRatio, flag.interestCover];
						itemName = ['资产负债率', '产权比率', '利息偿付倍数'];
						break;
					case 3:
						itemVal = [flag.liquidAssetsVelocity, flag.accountReceivableTurnover, flag.stockTurnoverRate, flag.totalCapitalTurnover, flag.fixedAssetsTurnover];
						itemName = ['流动资产周转率', '应收账款周转率', '存货周转率', '总资产周转率', '固定资产周转率'];
						break;
					case 4:
						itemVal = [flag.operatingProfitRatio, flag.costProfitsRatio, flag.surplusCashCover, flag.totalAssetsRate, flag.equityReturn, flag.capitalReturn, flag.priceEarningRatio];
						itemName = ['营业利润率', '成本费用利润率', '盈余现金保障倍数', '总资产报酬率', '净资产收益率', '资本收益率', '市盈率'];
						break;
					case 5:
						itemVal = [flag.businessRevenueIncreaseRate, flag.hedgingProliferatingRatios, flag.capitalAccumulationRate, flag.totalAssetsGrowthRate, flag.operatingProfitGrowth, flag.threeYearsBusinessIncomeAverageGrowthRate, flag.threeYearsCapitalAverageGrowth];
						itemName = ['营业收入增长率', '资本保值增值率', '资本积累率', '总资产增长率', '营业利润增长率', '营业收入三年平均增长率', '资本三年平均增长率'];
						break;
				}
				if(index == 0) {
					$.each(itemName, function(i, item) {
						if(typeof(itemVal[i]) == "number") {
							itemVal[i] = itemVal[i].toFixed(2);
						}
						itemVal[i] == null ? itemVal[i] = "无" : null;
						var tr = '<tr>';
						tr += '<td>' + itemName[i] + '</td>';
						tr += '<td>' + itemVal[i] + '</td>';
						tr += '</tr>';
						$("#fivePowerTable tbody").append(tr);
					});
				} else {
					$.each(itemVal, function(i, item) {
						if(typeof(itemVal[i]) == "number") {
							itemVal[i] = itemVal[i].toFixed(2);
						}
						itemVal[i] == null ? itemVal[i] = "无" : null;
						var td = '<td>' + itemVal[i] + '</td>';
						$("#fivePowerTable tbody tr").eq(i).append(td);
					});
				}
			}
		});
	} else {
		$("#fivePowerTable tbody").html("<tr><td colspan='2'>暂无数据</td></tr>");
	}

}
//五能力雷达图方法
function fiveRadarCallback(data, fiveName) {
	if(data.retData != null) {
		var result = data.retData;
		var fiveData = []; //图标参数配置项数组
		$.each(result, function(index, flag) {
			if(flag != null) {
				var values = []; //存放各项数据的数组
				var fobj = {};
				switch(Number(fiveName)) {
					case 1: //短期偿债能力
						values.push(flag.liquidityRatio); //流动比率
						values.push(flag.quickRatio); //速动比率
						values.push(flag.cashAssetsRatio); //现金资金比率

						break;
					case 2: //长期偿债能力
						values.push(flag.assetLiabilityRatio); //资产负债率
						values.push(flag.equityRatio); //产权比率
						values.push(flag.interestCover); //利息偿付倍数
						break;
					case 3: //运营能力
						values.push(flag.liquidAssetsVelocity); //流动资产周转率
						values.push(flag.accountReceivableTurnover); //应收账款周转率
						values.push(flag.stockTurnoverRate); //存货周转率
						values.push(flag.totalCapitalTurnover); //总资产周转率
						values.push(flag.fixedAssetsTurnover); //固定资产周转率
						break;
					case 4: //盈利能力
						values.push(flag.operatingProfitRatio); //营业利润率
						values.push(flag.costProfitsRatio); //成本费用利润率
						values.push(flag.surplusCashCover); //盈余现金保障倍数
						values.push(flag.totalAssetsRate); //总资产报酬率
						values.push(flag.equityReturn); //净资产收益率
						values.push(flag.capitalReturn); //资本收益率
						values.push(flag.priceEarningRatio); //市盈率
						break;
					case 5: //发展能力
						values.push(flag.businessRevenueIncreaseRate); //营业收入增长率
						values.push(flag.hedgingProliferatingRatios); //资本保值增值率
						values.push(flag.capitalAccumulationRate); //资本积累率
						values.push(flag.totalAssetsGrowthRate); //总资产增长率
						values.push(flag.operatingProfitGrowth); //营业利润增长率
						values.push(flag.threeYearsBusinessIncomeAverageGrowthRate); //营业收入三年平均增长率
						values.push(flag.threeYearsCapitalAverageGrowth); //资本三年平均增长率
						break;
				}
				fobj = {
					value: values,
					name: flag.stockName //公司简称
				}
				fiveData.push(fobj);
				companyName.push(flag.stockName); //公司简称
			}
		});
		showFiveCharts(text, companyName, indicator, fiveData);
	}
}
//五能力展示数据图表
function showFiveCharts(text, legend, indicator, data) {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('fivePower'));

	// 指定图表的配置项和数据
	var option = {
		title: {
			text: text,
			left: '50'
		},
		tooltip: {},
		legend: {
			show: true,
			right: '50',
			data: legend
		},
		radar: {
			// shape: 'circle',
			indicator: indicator
		},
		series: [{
			name: '五能力对比',
			type: 'radar',
			// areaStyle: {normal: {}},
			data: data
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
//行业地位分析
function fieldRank() {
	var stockCodes = [];
	$("li.tj_gs").each(function() { //遍历股票代码
		stockCodes.push($(this).attr("data-num"));
	});
	$.ajax({
		type: "post",
		url: url + "/trade/findTradeContrast.do",
		async: true,
		data: {
			stockCode: stockCodes[0],
			date: $("input[name='fieldRank']:checked").val()
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
			$(".loadingBox").show();
		},
		success: function(data) {
			if(data.retCode == 0000) {
				if(data.retData.length != 0) {
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
					$(".dataAnalysisTable[data-num='3']").slideDown(function() {
						$("#fieldRankBtns li").first().addClass("on").siblings().removeClass("on");
						fieldRankList = result[0].list;
						fieldRankData("每股收益");
						$("#fieldRankBtns li").on("click", function() {
							if(!$(this).hasClass("on")) {
								fieldRankData($(this).text());
								$(this).addClass("on").siblings().removeClass("on");
							}

						});
					});

				} else {
					$("#fieldRankTable tbody").html("<tr><td colspan='13'>暂无数据</td></tr>");
				}
				$(".loadingBox").fadeOut();
			} else {
				$(".loadingBox").fadeOut();
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

function fieldRankData(name) {
	var xAxis = [];
	var data = [];
	var startValue = 0;

	switch(name) {
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
		if(item.stockCode == $("li.tj_gs").first().attr("data-num")) {
			startValue = index;
		}
		switch(name) {
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
	if(data.length > 170 && data.length <= 500) {//170-500
		end = 30;
	} else if(100 < data.length && data.length <= 170) {//100-170
		end = 13;
	} else if(40 < data.length && data.length <= 100) {//40-100
		end = 7;
	} else if(data.length <= 40) {//0-40
		end = 5;
	} else if(data.length > 500) {//500-∞
		end = 170;
	}
	var itemIndex = 0;
	$.each(xAxis, function(i, item) {
		if(item == $("li.tj_gs").first().attr("data-name")) {
			itemIndex = i;
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
						return "第" + (params.dataIndex + 1) + "名";
					}
				}
			},
			itemStyle: {
				normal: {
					color: function(params) {
						if(params.dataIndex == itemIndex) {
							return "#5FBDD3";
						} else {
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

//热词
function hotWord() {
	$.ajax({
		type: "post",
		url: url + "/common/findDataList.do",
		async: true,
		data: {
			dataType: 4
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				hotList = result.list;
				showHotWword()

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

function showHotWword() {
	$(".rc_list").empty();
	$.each(hotList, function(index, flag) {
		if(n == 0) {
			if(index < 6) {
				var b = $("<a>");
				b.html(flag.hotWordName).attr("href", "industryResearch.html?stockName=" + encodeURI(flag.hotWordName) + "&stockCode=" + flag.stockCode);
				$(".rc_list").append(b);
			}
		} else {
			if(index >= 6) {
				var b = $("<a>");
				b.html(flag.hotWordName).attr("href", "industryResearch.html?stockName=" + encodeURI(flag.hotWordName));
				$(".rc_list").append(b);
			}
		}

	});
}
//我的检索
function myInvestigation() {
	$.ajax({
		type: "post",
		url: url + "/common/findSearchMessage.do",
		async: true,
		data: {
			searchType: ""
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				if(result.searchMessageList != undefined) {
					$("#searchMessageList").empty();
					$.each(result.searchMessageList, function(index, flag) {
						if(index < 5) {
							var li = $("<li>");
							var a = $("<a href='" + flag.analysisUrl + "'>");
							var span = $("<span>");
							var i = $("<i>");
							var searchName = '';
							i.html("x");
							i.on("click", function() {
								deleteSearchMsg(flag.id, li);
							});
							flag.searchName.length > 16 ? searchName = flag.searchName.substring(0, 15) + ".." : searchName = flag.searchName;
							span.html(searchName);
							a.html(span);
							a.append(span);
							li.attr("title", flag.searchName)
							li.append(a);
							li.append(i);
							$("#searchMessageList").append(li);
						}
					});
				} else {
					$("#searchMessageList").parent().html("<div style='color:#fff;font-size:16px;'>暂无数据</div>");
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
//删除检索方法
function deleteSearchMsg(id, li) {
	$.ajax({
		type: "post",
		url: url + "/common/deleSearchMessage.do",
		async: true,
		data: {
			id: id
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				li.remove();
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
/**
 * 杜邦分析
 */
function findDuPontAnalysis() {
	$.ajax({
		type: "post",
		url: url + "/finance/findDuPontAnalysis.do",
		async: true,
		data: {
			stockCode: $("li.tj_gs").first().attr("data-num"), //默认取第一个
			date: $("input[name='duPontName']:checked").val()
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("uu");
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				if(result != null) {
					var duPontAnalysis = result;
					var html = findDuPontAnalysisHtml(duPontAnalysis);
					$("#duPontAnalysisData").html(html);
					$(".dataAnalysisTable[data-num='4']").slideDown();
				}
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
/**
 * 杜邦分析页面代码
 * @param duPontAnalysis
 * @returns {String}
 */
function findDuPontAnalysisHtml(duPontAnalysis) {
	var duPontAnalysisHtml = '<ul>';
	duPontAnalysisHtml += '<li class="clearfix jzcsy">';
	duPontAnalysisHtml += '<div class="dbfx_dbox">';
	duPontAnalysisHtml += '<div class="list_box clearfix">';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>净资产收益率</span><b>' + duPontAnalysis.netAssetsIncomeRate.toFixed(2) + '%</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</li>';

	duPontAnalysisHtml += '<li class="clearfix shuline h_01"></li>';
	duPontAnalysisHtml += '<li class="clearfix line01">';
	duPontAnalysisHtml += '<div class="shuxian first"></div>';
	duPontAnalysisHtml += '<div class="shuxian last"></div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix fist_li">';
	duPontAnalysisHtml += '<div class="dbfx_dbox ">';
	duPontAnalysisHtml += '<div class="list_box clearfix w860">';
	duPontAnalysisHtml += '<div class="db_fuhao1"><em>1÷(1-</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>资产负债率</span><b>' + duPontAnalysis.assetLiabilityRatio.toFixed(2) + '%</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao"><em>)=</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>权益乘数</span><b>' + duPontAnalysis.equityMultiplier.toFixed(2) + '%</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao4"><em>X</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>总资产收益率</span><b>' + duPontAnalysis.totalAssetsRatio.toFixed(2) + '%</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix shuline h_02"></li>';
	duPontAnalysisHtml += '<li class="clearfix shuline h_03"></li>';
	duPontAnalysisHtml += '<li class="clearfix shuline h_04"></li>';
	duPontAnalysisHtml += '<li class="clearfix line02">';
	duPontAnalysisHtml += '<div class="shuxian first"></div>';
	duPontAnalysisHtml += '<div class="shuxian last"></div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix line03">';
	duPontAnalysisHtml += '<div class="shuxian first"></div>';
	duPontAnalysisHtml += '<div class="shuxian last"></div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix line04">';
	duPontAnalysisHtml += '<div class="shuxian first"></div>';
	duPontAnalysisHtml += '<div class="shuxian last"></div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix">';
	duPontAnalysisHtml += '<div class="dbfx_dbox ">';
	duPontAnalysisHtml += '<div class="list_box clearfix w860">';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>负债总额/万</span><b>' + duPontAnalysis.totalLiability.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao2"><em>÷</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>资产总额/万</span><b>' + duPontAnalysis.totalAssets.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao3"><em>÷</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>所有者权益总额/万</span><b>' + duPontAnalysis.totalShareholderEquity.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao3"><em></em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>销售净利率</span><b>' + duPontAnalysis.netProfitSalesRatio.toFixed(2) + '%</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao3"><em>X</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>总资产周转率</span><b>' + duPontAnalysis.totalCapitalTurnover.toFixed(2) + '%</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix shuline h_05"></li>';
	duPontAnalysisHtml += '<li class="clearfix shuline h_06"></li>';
	duPontAnalysisHtml += '<li class="clearfix shuline h_07"></li>';
	duPontAnalysisHtml += '<li class="clearfix line05">';
	duPontAnalysisHtml += '<div class="shuxian first"></div>';
	duPontAnalysisHtml += '<div class="shuxian last"></div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix line06">';
	duPontAnalysisHtml += '<div class="shuxian first"></div>';
	duPontAnalysisHtml += '<div class="shuxian last"></div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix line07">';
	duPontAnalysisHtml += '<div class="shuxian first"></div>';
	duPontAnalysisHtml += '<div class="shuxian last"></div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix">';
	duPontAnalysisHtml += '<div class="dbfx_dbox ">';
	duPontAnalysisHtml += '<div class="list_box clearfix">';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>流动负债/万</span><b>' + duPontAnalysis.totalCurrentLiability.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao5"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	var totalNonCurrentLiabilities = 0.0;
	if(duPontAnalysis.totalNonCurrentLiabilities != null && duPontAnalysis.totalNonCurrentLiabilities != "" && duPontAnalysis.totalNonCurrentLiabilities != "null") {
		totalNonCurrentLiabilities = duPontAnalysis.totalNonCurrentLiabilities;
	}
	duPontAnalysisHtml += '<span>非流动负债/万</span><b>' + totalNonCurrentLiabilities.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao5"><em></em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>流动资产/万</span><b>' + duPontAnalysis.totalCurrentAssets.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao5"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>非流动资产/万</span><b>' + duPontAnalysis.totalNonCurrentAssets.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao5"><em></em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>净利润/万</span><b>' + duPontAnalysis.netProfit.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao5"><em>÷</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>营业总收入/万</span><b>' + duPontAnalysis.totalOperatingIncome.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix shuli3">';
	duPontAnalysisHtml += '<div class="dbfx_dbox ">';
	duPontAnalysisHtml += '<div class="list_box clearfix">';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>货币资金/万</span><b>' + duPontAnalysis.monetaryCapital.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>应收账款/万</span><b>' + duPontAnalysis.receivables.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>存货/万</span><b>' + duPontAnalysis.inventory.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix line08"></li>';
	duPontAnalysisHtml += '<li class="clearfix shuli4">';
	duPontAnalysisHtml += '<div class="dbfx_dbox ">';
	duPontAnalysisHtml += '<div class="list_box clearfix">';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>营业总收入/万</span><b>' + duPontAnalysis.totalOperatingIncome.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>总成本/万</span><b>' + duPontAnalysis.totalCost.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>其他利润/万</span><b>' + duPontAnalysis.otherProfit.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>所得税/万</span><b>' + duPontAnalysis.incomeTax.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '<li class="clearfix line09"></li>';
	duPontAnalysisHtml += '<li class="clearfix line11"></li>';
	duPontAnalysisHtml += '<li class="clearfix line10"></li>';
	duPontAnalysisHtml += '<li class="clearfix shuli5">';
	duPontAnalysisHtml += '<div class="dbfx_dbox ">';
	duPontAnalysisHtml += '<div class="list_box clearfix">';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>营业成本/万</span><b>' + duPontAnalysis.operatingCost.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>销售费用/万</span><b>' + duPontAnalysis.salesExpense.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>管理费用/万</span><b>' + duPontAnalysis.administrativeCost.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '<div class="db_fuhao6"><em>+</em></div>';
	duPontAnalysisHtml += '<div class="dblist">';
	duPontAnalysisHtml += '<span>财务费用/万</span><b>' + duPontAnalysis.financialCost.toFixed(2) + '</b>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</div>';
	duPontAnalysisHtml += '</li>';
	duPontAnalysisHtml += '</ul>';
	return duPontAnalysisHtml;
}