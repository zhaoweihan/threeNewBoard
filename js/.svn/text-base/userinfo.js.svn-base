/* 个人中心
 * 
 * 
 */
$(function(){
	
	findTrade();
	
	//个人信息页添加行业
	$("#addhy").click(function(){
		var industryInfo = $("#industryInfo").val();
		$(industryInfo.split(",")).each(function(){
			var industry = this;
			$("#TradeList li").each(function(){
				if($(this).text() == industry){
					$(this).attr("class","on");
				}
			});
		})
		$(".tcbackground").show();
		$(".followIndustry").show();
	})
	
	$("#userInfoForm").validate({
		rules:{
			email:{
				required:false,
				email:email,
			}
		},
		messages:{
			email:{
				email:"请填写正确的电子邮箱"
			}
		}
	}); 
	
	getUserInfo();//获取个人信息
	
	//保存个人信息
	$("#saveUserInfo").on("click",function(){
		if($("#userInfoForm").valid()){
			$.ajax({
				type:"post",
				url:url+"/tbuser/updateUser.do",
				async:true,
				data:{
					phoneNumber : $("#phoneNumber").val(),
					userName : $("#userNameMsg").val(),
					employer :  $("#employer").val(),
					position : $("#position").val(),
					industryInfo : $("#industryInfo").val(),
					email : $("#email").val(),
					weChat : $("#weChat").val(),
				},
				beforeSend:function(xhr){
					xhr.setRequestHeader("uu");
					xhr.setRequestHeader("phone");
				},
				success:function(data){
					if (data.retCode==0000) {
						if($("#userNameMsg").val() != null && "" != $("#userNameMsg").val()){
							$.cookie('userName',$("#userNameMsg").val() , {
								expires: 30
							});
						}
						$.zmAlert("保存成功",1500,"userInformation.html");
					} else{
						errorAlert(data.retCode,data.retMsg);
					}
				}
			});
		}
	});
	
	$("#finish").on("click",function(){
		var industryInfo="";
		$("#TradeList li.on").each(function(index,item){
			index==0?industryInfo+=$(item).text():industryInfo+=","+$(item).text();
		});
		$("#industryInfo").val(industryInfo);
		$(".tcbackground").hide();
		$(".followIndustry").hide();
	});
});
//获取个人信息
function getUserInfo(){
	$.ajax({
		type:"post",
		url:url+"/tbuser/getTbUser.do",
		async:true,
		data:{
			
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success:function(data){
			if (data.retCode==0000) {
				if(data.retData.userName != ""){
					$("#userNameMsg").val(data.retData.userName).attr("readonly","readonly");
				}
				if(data.retData.employer != ""){
					$("#employer").val(data.retData.employer).attr("readonly","readonly");
				}
				if(data.retData.position != ""){
					$("#position").val(data.retData.position).attr("readonly","readonly");
				}
				$("#phoneNumber").val(data.retData.phoneNumber);
				$("#email").val(data.retData.email);
				$("#industryInfo").val(data.retData.industryInfo);
				$("#weChat").val(data.retData.weChat);
				
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}

//查询行业信息
function findTrade() {
	$.ajax({
		type: "post",
		url: url + "/common/findTrade.do",
		async: true,
		data: {
			parentName: 0,
			tradeGrade: 1
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$("#TradeList").html("");
				var result = data.retData;
				//遍历关注行业列表
				$.each(result.tradeList, function(index, item) {
					var li=$("<li>");
					li.html(item.tradeName)
					li.on("click", function() {//切换关注行业选中状态 
						if ($("#TradeList li.on").size()>9&&!$(this).hasClass("on")) {
							$("#TradeList li.on").first().removeClass("on");
						}
						$(this).toggleClass("on");
					});
					$("#TradeList").append(li);
				});
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}
$(document).ready(function(e){
	$(".tcbackground").click(function(){
		$(".followIndustry").hide();
		$(this).hide();
	})
})
