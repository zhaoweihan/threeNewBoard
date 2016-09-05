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
	var word = $("#chooseWord").find(".data-radio").eq(Number(getUrlParam("target")) - 1);
	word.find("input[type='radio']").attr("checked", "checked");
	word.find("label.radio").addClass("on");
	word.find("label.radioWord").css("color", "rgb(95, 189, 211)");
	var dateNum = null;
	switch(getUrlParam("date")) {
		case "2015-12-31":
			dateNum = 0;
			break;
		case "2015-06-30":
			dateNum = 1;
			break;
		case "2014-12-31":
			dateNum = 2;
			break;
		case "2014-06-30":
			dateNum = 3;
			break;
	}
	var times = $("#chooseTimes").find(".data-radio").eq(dateNum);
	times.find("input[type='radio']").attr("checked", "checked");
	times.find("label.radio").addClass("on");
	times.find("label.radioWord").css("color", "rgb(95, 189, 211)");
	fivePower();
}