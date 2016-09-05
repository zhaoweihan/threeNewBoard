$(function() {
	//修改密码
	$("#pwdEdit").validate({
		rules: {
			password: {
				required: true,
				password: true,
				rangelength: [6, 16]
			},
			newPwd: {
				required: true,
				password: true,
				rangelength: [6, 16],
				notEqualTo:"#password"
			},
			verifyPwd: {
				required: true,
				equalTo: "#newPwd"
			}
		},
		messages: {
			password: {
				required: "请填写密码",
				password: "密码仅支持数字、字母、字符",
				rangelength: "密码长度6-16位"
			},
			newPwd: {
				required: "请填写密码",
				password: "密码仅支持数字、字母、字符",
				rangelength: "密码长度6-16位",
				notEqualTo:"新密码不能与原密码一致"
			},
			verifyPwd: {
				required: "请填写确认密码",
				equalTo: "与密码不一致"
			}
		}
	});
	//修改手机哈
	var peValidator = $("#phoneEdit").validate({
		rules: {
			phoneNumber: {
				required: true,
				mobile: true,
				remote: {
					url: url + "/tbuser/checkPhoneNum.do", //后台处理程序
					type: "post", //数据发送方式
					dataType: "json", //接受数据格式   
					data: { //要传递的数据
						type: 0
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
					}
				}
			},
		},
		messages: {
			phoneNumber: {
				required: "请填写手机号",
				mobiel: "手机号格式不正确",
				remote: "手机号已注册，请换其他的手机号"
			},
			verificationCode: {
				required: "请填写验证码",
				digits: "验证码为整数",
				rangelength: "验证码为4-6位数字",
				remote: "验证码不正确"
			}
		}
	});
	//发送验证码
	$("#sendVcode").on("click", function() {
		if (peValidator.element("#phoneNumber")) {
			sendSMS($(this));
		}

	});
	//修改密码提交
	$("#pwdEditBtn").on("click", function() {
		if ($("#pwdEdit").valid()) {
			$.ajax({
				type: "post",
				url: url + "/tbuser/updatePassword.do",
				async: true,
				data: {
					password: $("#password").val(),
					passwordNew: $("#newPwd").val()
				},
				beforeSend: function(xhr) {
					xhr.setRequestHeader("UU", $.cookie("UU"));
					xhr.setRequestHeader("phone", $.cookie("phone"));
				},
				success: function(data) {
					if (data.retCode == 0000) {
						$.zmAlert("修改成功");
						dropOut();
					}else {
						errorAlert(data.retCode,data.retMsg);
					}
				}
			});
		}
	});
	//修改手机号提交
	$("#phoneEditBtn").on("click", function() {
		if ($("#phoneEdit").valid()) {
			$.ajax({
				type: "post",
				url: url + "/tbuser/updatePhoneNum.do",
				async: true,
				data: {
					phoneNumberNew: $("#phoneNumber").val(),
					flag: $("#verificationCode").val()
				},
				beforeSend: function(xhr) {
					xhr.setRequestHeader("UU", $.cookie("UU"));
					xhr.setRequestHeader("phone", $.cookie("phone"));
				},
				success: function(data) {
					if (data.retCode == 0000) {
						$.zmAlert("修改成功");
						dropOut();
					} else {
						errorAlert(data.retCode,data.retMsg);
					}
				}
			});
		}
	});

	//tab切换
	$(".user_set_title a").click(function() {
		var n = $(this).index();
		$(this).addClass("hover").siblings().removeClass("hover");
		$(".user_box").find(".user_set_list").eq(n).show().siblings().hide();
	});
});