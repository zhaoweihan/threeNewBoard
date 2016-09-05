if (getUrlParam("stockCode") == null || getUrlParam("stockCode") == undefined) {
	window.location.href='home.html';
}
if (getUrlParam("stockName") == null || getUrlParam("stockName") == undefined) {
	window.location.href='home.html';
}
	var stockName= decodeURI(getUrlParam("stockName"));
	var stockCode= getUrlParam("stockCode");
//详情页左边栏
$(function(){
	//参数
	var search=window.location.search;
	if(search==null || search=='' || search.indexOf("stockCode")<=-1 ||  search.indexOf("stockName")<=-1){
		window.location.href="home.html";
	}

	//动态添加 左边栏代码
	var leftHtmL=findLeftHtmL(search);
	$(".main_center").prepend(leftHtmL);
	//动态添加头部代码
	var headHtml=findheader(stockName,stockCode);
	$(".right_dbox").prepend(headHtml);
	//访问的页面名字
	var thisHtmlName=window.location.pathname;
	if(thisHtmlName.indexOf("industryResearch")>-1){
		//企业资料
		$(".main_left ul").find("li").eq(0).find("a").addClass("hover");
	}else if(thisHtmlName.indexOf("companyAnnouncement")>-1){
		//公司公告
		$(".main_left ul").find("li").eq(1).find("a").addClass("hover");
	}else if(thisHtmlName.indexOf("equityShareholders")>-1){
		//股本股东
		$(".main_left ul").find("li").eq(2).find("a").addClass("hover");
	}else if(thisHtmlName.indexOf("financialData")>-1){
		//财务数据
		$(".main_left ul").find("li").eq(3).find("a").addClass("hover");
	}else  if(thisHtmlName.indexOf("distributionAllocation")>-1){
		//发行分配
		$(".main_left ul").find("li").eq(4).find("a").addClass("hover");
	}else  if(thisHtmlName.indexOf("publicSentimentMonitor")>-1){
		//舆情监测
		$(".main_left ul").find("li").eq(5).find("a").addClass("hover");
	}
	
	var stockCode=getUrlParam("stockCode");
	//关注按钮设置
	var isAttention=findCompany(stockCode);
	if(isAttention){
		$("#attention").text("已关注");
		$("#attention").addClass("on");
	}else{
		$("#attention").on("click",function(){
			addCompany(stockCode);
			//
			var isAttention=findCompany(stockCode);
			if(isAttention){
				$("#attention").text("已关注");
				$("#attention").addClass("on");
				$("#attention").off();
			}
		});
	}
	
});

/**
 * 获取左边栏代码
 * @param search
 * @returns {String}
 */
function findLeftHtmL(search){
	var leftHtmL='<div class="main_left"><ul>';
		leftHtmL+='<li class="qyzl"><a href="industryResearch.html'+search+'">企业资料</a></li>';
		leftHtmL+='<li class="gsgg"><a href="companyAnnouncement.html'+search+'">公司公告</a></li>';
		leftHtmL+='<li class="gbgd"><a href="equityShareholders.html'+search+'">股本股东</a></li>';
		leftHtmL+='<li class="cwsj"><a href="financialData.html'+search+'">财务数据</a></li>';
		leftHtmL+='<li class="fxfp"><a href="distributionAllocation.html'+search+'">发行分配</a></li>';
		leftHtmL+='<li class="yqjc"><a href="publicSentimentMonitor.html'+search+'">舆情监测</a></li>';
		/*leftHtmL+='<li class="hyyj"><a href="/distributionAllocation.html'+search+'">行业研究</a></li>';--不做*/
		leftHtmL+='</ul></div>';
	return leftHtmL;
}
/**
 * 获取头部代码
 * @returns {String}
 */
function findheader(search){
	var headHtml='<div class="right_nav">';
		headHtml+='<div class="r_n_left">';
		headHtml+='<h2>'+decodeURI(getUrlParam("stockName"))+'</h2>';
		headHtml+='<em>('+getUrlParam("stockCode")+')</em>';
		headHtml+='<a href="javascript:void(0);" id="attention">关注</a>';
		//此处关注成功之后 给a标签添加class="on"
		headHtml+='</div>';
		headHtml+='<div class="r_n_right">';
		headHtml+='<a href="financialIndicatorsBenchmarking.html?stockName='+encodeURI(stockName)+'&stockCode='+stockCode+'" class="cwdb">财务指标对标分析</a>';
		headHtml+='<a href="fiveAbility.html?stockName='+encodeURI(stockName)+'&stockCode='+stockCode+'" class="wnldb">五能力对标分析</a></div>';
		headHtml+='<div class="clr"></div>';
		headHtml+='</div>';
	return headHtml;
}