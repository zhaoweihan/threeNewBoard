$(function() {
	//表单验证
	$("#loginForm").validate({
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
			password: {
				required: true,
				password: true,
				minlength: 6,
				maxlength: 16
			}
		},
		messages: {
			phoneNumber: {
				required: "请填写手机号",
				mobile: "手机号格式不正确",
				maxlength: "您的手机号超过了11位",
				remote: "此手机号还未注册"
			},
			password: {
				required: "请填写密码",
				password: "密码格式不正确",
				minlength: "密码最低6位",
				maxlength: "密码最高16位"
			}
		},
		submitHandler: function(form) {
			loginAjax($("#phoneNumber").val(), $("#password").val());
		},
	});
	//手机号、密码输入框交互事件
	$("form input[type='text']").on("focus", function() {
		$(this).parent().addClass("focus");
	});
	$("form input[type='text']").on("blur", function() {
		$(this).parent().removeClass("focus");
	});
	$("form input[type='password']").on("focus", function() {
		$(this).parent().addClass("focus");
	});
	$("form input[type='password']").on("blur", function() {
		$(this).parent().removeClass("focus");
	});
	$("#password").on("focus",function(){
		$("#loginMsg").hide();
	});
});