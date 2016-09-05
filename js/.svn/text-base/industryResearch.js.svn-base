$(function(){

	//获取企业基本信息
	conpanyMsg(getUrlParam("stockCode"));
	
	//获取企业高管信息
	findDignitary(getUrlParam("stockCode"));
	
	//检测用户是否关注企业
	checkUserConcernCompany(getUrlParam("stockCode"));
	
})

//获取企业基本信息
function conpanyMsg(stockCode){
	$.ajax({
		type:"post",
		url: url + "/enterprise/findObj.do",
		async:true,
		data:{
			stockCode:stockCode
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("UU");
			xhr.setRequestHeader("phone");
		},
		success:function(data){
			if(data.retCode == 0000){
				if(data.retData.companyForShort != null){
					$("#companyForShort").text(data.retData.companyForShort);
				}else{
					$("#companyForShort").text("无");
				}
				if(data.retData.stockCode != null){
					$("#stockCode1").text(data.retData.stockCode);
				}else{
					$("#stockCode1").text("无");
				}
				if(data.retData.companyName != null){
					$("#companyName").text(data.retData.companyName);
				}else{
					$("#companyName").text("无");
				}
				if(data.retData.stockCode != null){
					$("#stockCode2").text(data.retData.stockCode);
				}else{
					$("#stockCode2").text("无");
				}
				if(data.retData.registeredCapital != null){
					$("#registeredCapital").text(data.retData.registeredCapital);
				}else{
					$("#registeredCapital").text("无");
				}
				if(data.retData.stockDate != null){
					$("#stockDate").text(data.retData.stockDate);
				}else{
					$("#stockDate").text("无");
				}
				if(data.retData.industry != null){
					$("#industry").text(data.retData.industry);
				}else{
					$("#industry").text("无");
				}
				
				if(data.retData.territory != null){
					$("#territory").text(data.retData.territory);
				}else{
					$("#territory").text("无");
				}
				if(data.retData.companyProfile != null){
					$("#companyProfile").text(data.retData.companyProfile);
				}else{
					$("#companyProfile").text("无");
				}
				if(data.retData.businessScope != null){
					$("#businessScope").text(data.retData.businessScope);
				}else{
					$("#businessScope").text("无");
				}
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	})
}

//获取企业高管信息
function findDignitary(stockCode){
	$.ajax({
		type:"post",
		url: url + "/enterprise/findDignitary.do",
		async:true,
		data:{
			stockCode:stockCode
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("UU");
			xhr.setRequestHeader("phone");
		},
		success:function(data){
			if(data.retCode == 0000){
				var dignitaryMsg = "";
				$(data.retData.dignitaryList).each(function(){
					var msg = "<tr><td class='username'><a href='javascript:;'>"+this.name+"</a></td>" +
							"<td class='zhiwei'>"+this.position+"</td>" +
							"<td class='chigushu'>"+this.sharesNumber+"</td>" +
							"<td class='jbzl'>"+this.intro+"</td>" +
							"<td class='baogaoqi'>"+this.reportPeriod+"</td></tr>";
					dignitaryMsg += msg;
					
				})
				$("#dignitaryTable").append(dignitaryMsg);
			}else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	})
}

//检测用户是否关注
function checkUserConcernCompany(stockCode){
	$.ajax({
		type:"post",
		url: url + "/tbuser/viewTbUserCompanyOne.do",
		async:true,
		data:{
			stockCode:stockCode
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("UU");
			xhr.setRequestHeader("phone");
		},
		success:function(data){
			if(data.retCode == 0000){
				$("#concernCompany").parent().attr("class","on");
				$("#concernCompany").text("已关注");
				$("#concernCompany").parent().on("click",function(){
					editConcern(this,stockCode);
				})
			}else{
				$("#concernCompany").text("关注");
				$("#concernCompany").parent().on("click",function(){
					editConcern(this,stockCode);
				})
			}
		}
	})
}

//操作关注
function editConcern(data,stockCode){
	if($(data).children().text() == "已关注"){
		deleCompany(stockCode);
		$("#concernCompany").parent().removeClass("on");
		$("#concernCompany").text("关注");
	}else{
		addCompany(stockCode);
		$("#concernCompany").parent().attr("class","on");
		$("#concernCompany").text("已关注");
	}
}