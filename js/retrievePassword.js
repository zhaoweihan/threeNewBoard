/*
 找回密码
 * */
$(function() {
	var rfValidator = $("#retrieveFormP").validate({
		rules: {
			phoneNumber: {
				required: true,
				mobile: true,
				maxlength: 11,
				remote: {
					url: url + "/tbuser/checkPhoneNum.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: { //要传递的数据
						type: 1
					}
				}
			},
			verifyNum: {
				required: true,
				remote: {
					url: url + "/tbuser/testVerifyNum.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: { //要传递的数据
						type: 1
					}
				}
			},
			verificationCode: {
				required: true,
				digits: true,
				rangelength: [4, 6],
				remote: {
					url: url + "/tbuser/testVerificationCode.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: { //要传递的数据
						type: 1
					}
				}
			}
		},
		messages: {
			phoneNumber: {
				required: "请填写手机号",
				mobile: "手机号格式不正确",
				maxlength: "手机号最大为11位",
				remote: "手机号还未注册"
			},
			verifyNum: {
				required: "请填写验证码",
				remote: "验证码不正确"
			},
			verificationCode: {
				required: "请填写短信验证码",
				digits: "短信验证码必须为整数数字",
				rangelength: "验证码长度为4-6位",
				remote: "手机验证码不正确"
			},
		}
	});
	$("#retrieveFormP2").validate({
		rules: {
			password: {
				required: true,
				password: true,
				rangelength: [6, 16]
			},
			rePassword: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
			password: {
				required: "请填写密码",
				password: "密码仅支持数字、字母、字符",
				rangelength: "密码长度6-16位"
			},
			rePassword: {
				required: "请填写确认密码",
				equalTo: "与密码不一致"
			}
		}
	});
	getVerifyNum(); //图片验证码
	//切换图片验证码
	$("#VerifyNumImg").on("click", function() {
		getVerifyNum();
	});
	//发送手机验证码
	$(".codeBtn").on("click", function() {
		if (rfValidator.element("#phoneNumber")) {
			var me = $(this);
			sendSMS(me);
		}
	});
	$("#retrieveSubmit").on("click",function(){
		if ($("#retrieveFormP").valid()) {
			$(".ret").hide();
			$(".pwd").show();
		}
	});
	$("#retrieveSubmit2").on("click",function(){
		if ($("#retrieveFormP2").valid()) {
			retrievePwd();
		}
	});
});

function retrievePwd() {
	$.ajax({
		type: "post",
		url: url + "/tbuser/retrievePassword.do",
		async: true,
		data: {
			phoneNumber: $("#phoneNumber").val(),
			verification_Code: $("#verification_Code").val(),
			verify_num: $("#verify_num").val(),
			password: $("#password").val(),
			verName:$("#VerifyNumImg").attr("data-name")
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if (data.retCode == 0000) {
				window.location.href='login.html'
			} else {
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}