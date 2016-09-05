var stockCode=getUrlParam("stockCode");
$(function() {
	//查询增减持
	$.ajax({
		type: "post",
		url: url + "/share/findPurchasingShare.do",
		async: true,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			if (data.retCode == 0000) {
				//$(data.retData.purchasingShareList).each(function(){
				$("#topTenList").empty();
				$("#lastTenList").empty();
				$.each(data.retData.purchasingShareList, function(index, item) {
					var tr = $("<tr>");
					var td1 = $("<td>");
					var td2 = $("<td>");
					var td3 = $("<td>");
					td1.html("<a href='javascript:;'>"+item.companyName+"</a>");
					td2.html(item.shareNumber);
					td3.html(item.lastChange);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					if(index<10){
						$("#topTenList").append(tr);
					}else{
						$("#lastTenList").append(tr);
					}
				})
				//})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	
	//查询股本结构
	$.ajax({
		type: "post",
		url: url + "/share/findShareStructure.do",
		async: true,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			if (data.retCode == 0000) {
				//$(data.retData.shareStructureList).each(function(){
				$.each(data.retData.shareStructureList, function(index, item) {
					$("#noticeDate").append("<span>"+item.noticeDate+"</span>");
					$("#generalCapital").append("<span>"+item.generalCapital+"</span>");
					$("#generalCapitalA").append("<span>"+item.generalCapitalA+"</span>");
					$("#circulationAShares").append("<span>"+item.circulationAShares+"</span>");
					$("#restrictedAShare").append("<span>"+item.restrictedAShare+"</span>");
					$("#causeOfChange").append("<span>"+item.causeOfChange+"</span>");
				})
				//})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	
	//十大股东
	$.ajax({
		type: "post",
		url: url + "/share/findShare.do",
		async: true,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			if (data.retCode == 0000) {
				var dateValue="";
				$("#noticeDateList").empty();
				//$(data.retData.shareList).each(function(){
				$("#topTenShareList").empty();
				$.each(data.retData.shareList, function(index, item) {
					var tr = $("<tr>");
					var td1 = $("<td class='jjname'>");
					var td2 = $("<td>");
					var td3 = $("<td>");
					var td4 = $("<td>");
					var td5 = $("<td>");
					var td6 = $("<td>");
					td1.html(item.companyName);
					td2.html(item.holdCount);
					td3.html(item.shareChange);
					td4.html(item.proportion);
					td5.html(item.realityAddReduce);
					td6.html(item.shareType);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					tr.append(td5);
					tr.append(td6);
					$("#topTenShareList").append(tr);
					if(dateValue==""){
						dateValue=item.noticeDate;
					}
				});
				//})
				var date=$("<a href='javascript:;' class='hover' >");
				date.on("click",function(){
					$(this).addClass("hover").siblings().removeClass("hover");
					findTopTenNewShare();
				})
				date.html(dateValue);
				$("#noticeDateList").append(date);
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
	
	//查询股本历史时间
	$.ajax({
		type: "post",
		url: url + "/share/findShareDate.do",
		async: true,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$.each(data.retData.shareDate, function(index, item) {
					var date=$("<a href='javascript:;'>");
					date.on("click",function(){
						$(this).addClass("hover").siblings().removeClass("hover");
						findTopTenOldShare(item);
					})
					date.html(item);
					$("#noticeDateList").append(date);
				})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
});

function findTopTenNewShare(){
	$.ajax({
		type: "post",
		url: url + "/share/findShare.do",
		async: true,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			if (data.retCode == 0000) {
				//$(data.retData.shareList).each(function(){
				$("#topTenShareList").empty();
				$.each(data.retData.shareList, function(index, item) {
					var tr = $("<tr>");
					var td1 = $("<td class='jjname'>");
					var td2 = $("<td>");
					var td3 = $("<td>");
					var td4 = $("<td>");
					var td5 = $("<td>");
					var td6 = $("<td>");
					td1.html(item.companyName);
					td2.html(item.holdCount);
					td3.html(item.shareChange);
					td4.html(item.proportion);
					td5.html(item.realityAddReduce);
					td6.html(item.shareType);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					tr.append(td5);
					tr.append(td6);
					$("#topTenShareList").append(tr);
				})
				//})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}

function findTopTenOldShare(date){
	$.ajax({
		type: "post",
		url: url + "/share/findShareOld.do",
		async: true,
		data: {
			stockCode: stockCode,
			noticeDate: date
		},
		success: function(data) {
			if (data.retCode == 0000) {
				//$(data.retData.shareList).each(function(){
				$("#topTenShareList").empty();
				$.each(data.retData.shareList, function(index, item) {
					var tr = $("<tr>");
					var td1 = $("<td class='jjname'>");
					var td2 = $("<td>");
					var td3 = $("<td>");
					var td4 = $("<td>");
					var td5 = $("<td>");
					var td6 = $("<td>");
					td1.html(item.companyName);
					td2.html(item.holdCount);
					td3.html(item.shareChange);
					td4.html(item.proportion);
					td5.html(item.realityAddReduce);
					td6.html(item.shareType);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					tr.append(td5);
					tr.append(td6);
					$("#topTenShareList").append(tr);
				})
				//})
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
