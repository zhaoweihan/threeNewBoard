/*
 修改密码
 * */
$(function() {

	$("#uploadPwdForm").validate({
		rules: {
			password: {
				required: true,
				password: true,
				minlength: 6,
				maxlength: 16
			},
			newPassword: {
				required: true,
				password: true,
				minlength: 6,
				maxlength: 16
			},
			rePassword: {
				required: true,
				equalTo: "#passwordNew"
			}
		},
		messages: {
			password: {
				required: "请填写原密码",
				password: "原密码格式不正确",
				minlength: "密码最低6位",
				maxlength: "密码最高16位"
			},
			newPassword: {
				required: "请填写新密码",
				password: "新密码格式不正确",
				minlength: "密码最低6位",
				maxlength: "密码最高16位"
			},
			rePassword: {
				required: "请填写确认密码",
				equalTo: "与新密码不一致"
			}
		},
		submitHandler: function(form) {
			uploadPwd();
		},
	});
});
//修改手机号
function uploadPwd() {
	$.ajax({
		type: "post",
		url: url + "/tbuser/updatePassword.do",
		async: true,
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu", $.cookie("uu"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		data: {
			phoneNumber: $.cookie("mobile"),
			password: $("#password").val(),
			passwordNew: $("#passwordNew").val()
		},
		success: function(data) {
			if (data.retCode == 0000) {
				$.zmAlert("修改成功",1500,"login.html");
			} else {
				$.zmAlert(data.retCode + "：" + data.retMsg);
			}
		}
	});
}