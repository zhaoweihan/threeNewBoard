if(getUrlParam("stockName") != null && getUrlParam("stockCode") != null) {
	var nameList = decodeURI(getUrlParam("stockName")).split(",");
	var codeList = getUrlParam("stockCode").split(",");
	$.each(nameList, function(index, flag) {
		var li = $("<li class='tj_gs'>");
		li.attr("data-num", codeList[index]).attr("data-name", nameList[index]);
		var span = $("<span>");
		span.html(nameList[index] + " " + codeList[index]);
		var a = $("<a href='javascript:;'>");
		var img = $("<img src='images/cha.jpg' width='37' height='38'>");
		a.html(img);
		li.append(span);
		li.append(a);
		a.on("click", function() {
			$(this).parent(".tj_gs").remove();
		});
		$("#companyList").append(li);
	});

}
if(getUrlParam("target") != null && getUrlParam("date") != null) {
	var targetList = getUrlParam("target").split(",");
	var timesList = getUrlParam("date").split(",");
	$.each(targetList, function(index, flag) {
		var liList = targetList[index].split("_");
		var nums = null;
		switch(liList[0]) {
			case "scale":
				nums = 0;
				break;
			case "operate":
				nums = 1;
				break;
			case "other":
				nums = 2;
				break;
		}
		$("#targetList li").eq(nums).find("div.data-radio").eq(liList[1] - 1).children("input").attr("checked", 'checked');
		$("#targetList li").eq(nums).find("div.data-radio").eq(liList[1] - 1).children("label.radio").addClass('on');
		$("#targetList li").eq(nums).find("div.data-radio").eq(liList[1] - 1).children("label.radioWord").css("color", "rgb(95, 189, 211)");
	});
	$.each(timesList, function(index, flag) {
		var sad = null;
		switch(timesList[index]) {
			case "2015-12-31":
				sad = 0;
				break;
			case "2015-06-30":
				sad = 1;
				break;
			case "2014-12-31":
				sad = 2;
				break;
			case "2014-06-30":
				sad = 3;
				break;
		}
		$("#timesList").find("div.data-checkbox").eq(sad).children("input").attr("checked", "checked");
		$("#timesList").find("div.data-checkbox").eq(sad).children("label.checkbox").addClass("on");
		$("#timesList").find("div.data-checkbox").eq(sad).children("label.checkboxWord").css("color", "rgb(95, 189, 211)");
	});
	chartsData("bar");
}