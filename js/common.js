var countDown; //短信验证码倒计时
var smsCodes; //短信验证码计时器
var url = ''; //ajax请求公共地址
var searchList = [];
isLogin(); //判断登录
$(function() {
	setLoading();
	// 模拟所有的单选框、多选框
	$(".data-radio label").on(
		"click",
		function() {
			$(this).parent().find(".radio").addClass("on");
			$(this).parent().find(".radio").next(".radioWord").css("color",
				"#5fbdd3")
			if($(this).parent().siblings("div").hasClass("data-radio")) {
				$(this).parent().siblings(".data-radio").find(".radio")
					.removeClass("on");
				$(this).parent().siblings(".data-radio").find(".radio")
					.next(".radioWord").css("color", "")
			} else {
				$(this).parent().parent().siblings().find(".radio")
					.removeClass("on");
			}
			// changeParam();
		});
	$(".data-checkbox label").on("click", function(e) {
		if($(this).hasClass("on")) {
			$(this).removeClass("on");
			$(this).next(".checkboxWord").css("color", "")
		} else {
			$(this).addClass("on");
			$(this).next(".checkboxWord").css("color", "#5fbdd3");
		}

		e.stopPropagation();
	});
	$(".data-checkbox .checkboxWord").on("click", function(e) {
		if($(this).siblings(".checkbox").hasClass("on")) {
			$(this).siblings(".checkbox").removeClass("on");
			$(this).css("color", "")
		} else {
			$(this).siblings(".checkbox").addClass("on");
			$(this).css("color", "#5fbdd3");
		}

		e.stopPropagation();
	});
	// 所有form表单屏蔽 提交事件
	$("form").on("submit", function() {
		return false;
	});

});

function loginAjax(mobile, pwd) {
	$.ajax({
		type: "post",
		url: url + "/tbuser/toLogin.do",
		async: true,
		data: {
			phoneNumber: mobile,
			password: pwd
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				$.cookie('UU', result.UU, {
					expires: 30
				});
				$.cookie('phone', result.Phone, {
					expires: 30
				});
				$.cookie('userName', result.UserName, {
					expires: 30
				});
				$.cookie('headImg', result.imageUrl, {
					expires: 30
				});
				window.location.href = 'home.html';
			} else if(data.retCode == 3006) {
				$("#loginMsg").show();
				$("#loginMsg").html(data.retMsg);
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
// 短信验证码
function sendSMS(me) {
	sendSMSCountdown(me);
	$.ajax({
		type: "post",
		url: url + "/tbuser/verificationCode1.do",
		async: true,
		data: {
			phoneNumber: $("#phoneNumber").val()
		},
		success: function(data) {
			if(data.retCode == 0000) {
			} else {
				errorAlert(data.retCode, data.retMsg);
			}

		}
	});
}
// 短信验证码倒计时
function sendSMSCountdown(me) {
	clearInterval(smsCodes);
	countDown = 60
	me.addClass("disabled").attr("disabled", "disabled").html(
		countDown + "秒后再发送"); // 最后这个html去掉定时器一秒的延迟
	smsCodes = setInterval(function second() {
		countDown--;
		if(countDown != 0) {
			me.html(countDown + "秒后再发送");
		} else {
			me.html("获取验证码").removeClass("disabled").removeAttr("disabled");
			clearInterval(smsCodes);
		}

	}, 1000);
}

// 获取地址栏参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if(r != null)
		return decodeURI(r[2]);
	return null; // 返回参数值
}

// 必须为数字n:输入框id k:可输入最大值
function mustNumber(n, k) {
	var a = $("#" + n).val();
	var numRex = /^[0-9]*.{1,1}[0-9]*$/;
	if(isNaN(a) == true) {
		$("#" + n).val("");
	}
	var c = parseFloat(k);
	if($("#" + n).val() > c) {
		$("#" + n).val(c);
	}
}

// --------图片上传start--------------
function newBlob(data, datatype) {
	var out;
	try {
		out = new Blob([data], {
			type: datatype
		});
	} catch(e) {
		window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

		if(e.name == 'TypeError' && window.BlobBuilder) {
			var bb = new BlobBuilder();
			bb.append(data.buffer);
			out = bb.getBlob(datatype);
		} else if(e.name == "InvalidStateError") {
			out = new Blob([data], {
				type: datatype
			});
		} else {}
	}
	return out;
}

// 判断是否需要blobbuilder
var needsFormDataShim = (function() {
		var bCheck = ~navigator.userAgent.indexOf('Android') && ~navigator.vendor.indexOf('Google') && !~navigator.userAgent.indexOf('Chrome');

		return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
	})(),
	blobConstruct = !!(function() {
		try {
			return new Blob();
		} catch(e) {}
	})(),
	XBlob = blobConstruct ? window.Blob : function(parts, opts) {
		var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
		parts.forEach(function(p) {
			bb.append(p);
		});

		return bb.getBlob(opts ? opts.type : undefined);
	};

function FormDataShim() {
	// Store a reference to this
	var o = this,
		parts = [], // Data to be sent
		boundary = Array(5).join('-') + (+new Date() * (1e16 * Math.random())).toString(32),
		oldSend = XMLHttpRequest.prototype.send;

	this.append = function(name, value, filename) {
		parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

		if(value instanceof Blob) {
			parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
			parts.push(value);
		} else {
			parts.push('\r\n\r\n' + value);
		}
		parts.push('\r\n');
	};

	// Override XHR send()
	XMLHttpRequest.prototype.send = function(val) {
		var fr, data, oXHR = this;

		if(val === o) {
			// 注意不能漏最后的\r\n ,否则有可能服务器解析不到参数.
			parts.push('--' + boundary + '--\r\n');
			data = new XBlob(parts);
			fr = new FileReader();
			fr.onload = function() {
				oldSend.call(oXHR, fr.result);
			};
			fr.onerror = function(err) {
				throw err;
			};
			fr.readAsArrayBuffer(data);

			this.setRequestHeader('Content-Type',
				'multipart/form-data; boundary=' + boundary);
			XMLHttpRequest.prototype.send = oldSend;
		} else {
			oldSend.call(this, val);
		}
	};
}

// 把图片转成formdata 可以使用的数据...
// 这里要把\s替换掉..要不然atob的时候会出错....
function dataURLtoBlob(data) {
	var tmp = data.split(',');

	tmp[1] = tmp[1].replace(/\s/g, '');
	var binary = atob(tmp[1]);
	var array = [];
	for(var i = 0; i < binary.length; i++) {
		array.push(binary.charCodeAt(i));
	}
	return new newBlob(new Uint8Array(array), 'image/jpeg');
}

function uoploadPic(dataUrl) { // n:隐藏域ID
	var fd = needsFormDataShim ? new FormDataShim() : new FormData();
	var files = dataURLtoBlob(dataUrl);
	fd.append('file', files);
	$.ajax({
		type: "post",
		url: url + "/tbuser/uploadUserAvatar.do",
		data: fd,
		async: false,
		processData: false, // 告诉jQuery不要去处理发送的数据
		contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				$.cookie('headImg', result.path, {
					expires: 30
				});
				$(".img_box").hide();
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
// ---------图片上传end-------------

function getVerifyNum() { // 图片验证码
	$.ajax({
		type: "post",
		url: url + "/valCode/getVerifyNum.do",
		async: false,
		data: {},
		// beforeSend: function(xhr) {
		// xhr.setRequestHeader("UU", $.cookie("UU"));
		// xhr.setRequestHeader("phone", $.cookie("phone"));
		// },
		success: function(data) {
			if(data.retCode == 0000) {
				var result = data.retData;
				$("#VerifyNumImg").attr("src", result.localip + result.path);
				$("#VerifyNumImg").attr("data-name", result.path);
				$("#verify_num").rules("remove", "remote");
				$("#verify_num").rules("add", {
					remote: {
						url: url + "/tbuser/testVerifyNum.do", // 后台处理程序
						type: "post", // 数据发送方式
						dataType: "json", // 接受数据格式
						data: { // 要传递的数据
							verName: result.path
						}
					}
				});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

// 获取行业信息
// tradeGrade行业级别，position行业所显示的位置的ID,position二级行业所显示的位置的ID
function commonFindTrade(tradeGrade, position, position2, parentName,
	condition, op1, op2, op3, op4, pageName,startTime,endTime) {
	$("#" + op1).empty();
	$.ajax({
		type: "post",
		url: url + "/common/findTrade.do",
		async: false,
		data: {
			tradeGrade: tradeGrade,
			parentName: parentName
		},
		success: function(data) {
			if(data.retCode == 0000) {
				$("#" + position).empty();
				$(data.retData.tradeList).each(
					function() {
						var hangye = $("<a href='javascript:;' data-value=" + this.tradeName + " >");
						var tradeName = this.tradeName;
						var tradeGrade = this.tradeGrade;
						hangye.html(tradeName);
						hangye.on("click", function() {
							$(this).addClass("hover").siblings().removeClass("hover");
							if(tradeGrade == 1) {
								findTrade2(position2, tradeName, condition,
									op1, op2, op3, op4, pageName,startTime,endTime);
								$("#trade2").show();
							}
							retrieveCondition(condition, op1, op2, op3, op4,
								pageName,startTime,endTime);
						});
						$("#" + position).append(hangye);
					});
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

// 获取二级行业信息
function findTrade2(position, parentName, condition, op1, op2, op3, op4, pageName,startTime,endTime) {
	commonFindTrade(2, position, "", parentName, condition, op1, op2, op3, op4, pageName,startTime,endTime);
}

// 获取城市信息
function findArea(position, condition, op1, op2, op3, op4, pageName,startTime,endTime) {
	$.ajax({
		type: "post",
		url: url + "/common/findArea.do",
		async: false,
		data: {
			tradeGrade: ""
		},
		success: function(data) {
			if(data.retCode == 0000) {
				$(data.retData.cityList).each(
					function() {
						var area = $("<a href='javascript:;' data-value=" + this.cityName + " >");
						area.html(this.cityName);
						area.on("click", function() {
							$(this).addClass("hover").siblings()
								.removeClass("hover");
							retrieveCondition(condition, op1, op2, op3, op4,
								pageName,startTime,endTime);
						})
						$("#" + position).append(area);
					})
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}

// 添加检索条件
// condition显示条件位置的ID,行业信息位置ID,op1,城市信息位置ID,op2,交易方式input标签的name属性值op3,,区别来自不同的页面执行不同的查询列表pageName,开始时间startTimeID结束时间endTimeID
function retrieveCondition(condition, op1, op2, op3, op4, pageName,startTime,endTime) {
	$("#" + condition).empty();
	// 判断行业信息是否存在，是什么行业信息
	if(op1 != "") {
		$($("#" + op1).children()).each(function() {
			var text = $(this).text();
			if($(this).attr("class") == "hover") {
				var p1 = $("<a href='javascript:;' data-type='trade2' data-value=" + this.dataset.value + " ></a>");
				p1.html(text + "<i onclick='delOne(this,\"trade2\")' >x</i>");
				$("#" + condition).append(p1);
			}
		})
	}
	// 判断城市信息是否存在，是什么城市
	if(op2 != "") {
		$($("#" + op2).children()).each(function() {
			var text = $(this).text();
			if($(this).attr("class") == "hover") {
				var p2 = $("<a href='javascript:;' data-type='city' data-value=" + this.dataset.value + " ></a>");
				p2.html(text + "<i onclick='delOne(this,\"city\")'>x</i>");
				$("#" + condition).append(p2);
			}
		})
	}

	// 判断交易方式是否存在，是什么交易方式
	if(op3 != "") {
		$("[name=" + op3 + "]").each(function() {
			if($(this).attr("checked")) {
				var p3 = $("<a href='javascript:;' data-type='deal' data-value=" + $(this).val() + " ></a>");
				p3.html(this.dataset.name + "<i onclick='delOne(this,\"deal\")'>x</i>");
				$("#" + condition).append(p3);
			}
		})
	}
	//判断年报类型是否存在，是那种年报
	if(op4 != "") {
		$("[name=" + op4 + "]").each(function() {
			if($(this).attr("checked")) {
				var p3 = $("<a href='javascript:;' data-type='type' data-value=" + $(this).val() + " ></a>");
				p3.html(this.dataset.name + "<i onclick='delOne(this,\"type\")'>x</i>");
				$("#" + condition).append(p3);
			}
		})
	}

	if(pageName == "findIndustry") {
		$($("#hangye1").children()).each(function() {
			var text = $(this).text();
			if($(this).attr("class") == "hover") {
				var p1 = $("<a href='javascript:;' data-type='trade1' data-value=" + this.dataset.value + " ></a>");
				p1.html(text + "<i onclick='delOne(this,\"trade1\")'>x</i>");
				$("#" + condition).append(p1);
			}
		})
	}
	if(startTime != "" && startTime != undefined){
		if($("#"+startTime).val() != ""){
			var p1 = $("<a href='javascript:;' data-type='startTime' data-value=" + $("#"+startTime).val() + " ></a>");
			p1.html("起始时间：" + $("#"+startTime).val() + "<i onclick='delOne(this,\"startTime\")'>x</i>");
			$("#" + condition).append(p1);
		}
	}
	
	if(endTime != "" && endTime != undefined){
		if($("#"+endTime).val() != ""){
			var p1 = $("<a href='javascript:;' data-type='endTime' data-value=" + $("#"+endTime).val() + " ></a>");
			p1.html("结束时间：" + $("#"+endTime).val() + "<i onclick='delOne(this,\"endTime\")'>x</i>");
			$("#" + condition).append(p1);
		}
	}

	if(pageName == "findEnterprise") {
		$("#choiceCondition").hide();
		getEnterpriseList(1, 20, getEnterpriseCondition());
	}

	if(pageName == "findEarnings") {
		$("#choiceCondition").hide();
		getEarningsList(1, 20, getEarningsCondition());
	}

	if(pageName == "findIndustry") {
		$("#choiceCondition").hide();
		getIndustryList(1, 20, getIndustryCondition());
	}
}

// 退出登录
function dropOut() {
	$.ajax({
		type: "post",
		url: url + "/tbuser/cancelLogin.do",
		async: true,
		data: {},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				$.cookie('UU', '', {
					expires: -1
				});
				$.cookie('phone', '', {
					expires: -1
				});
				$.cookie('userName', '', {
					expires: -1
				});
				$.cookie('headImg', '', {
					expires: -1
				});
				window.location.href = 'login.html';
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
	//	if (pageName == "findIndustry") {
	//		getIndustryList(1, 10, getIndustryCondition());
	//	}
}

// 添加用户关注企业 参数股票代码
function addCompany(stockCode) {
	$.ajax({
		type: "post",
		url: url + "/tbuser/insertTbUserCompany.do",
		async: false,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			if(data.retCode == 0000) {} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
//取消用户关注企业
function deleCompany(stockCode) {
	$.ajax({
		type: "post",
		url: url + "/tbuser/cancelTbUserCompany.do",
		async: true,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			if(data.retCode == 0000) {

			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
/**
 * 查询该企业是否关注
 * @return true 关注，false 未关注 
 */
function findCompany(stockCode) {
	var isAttention = false;
	$.ajax({
		type: "post",
		url: url + "/tbuser/viewTbUserCompanyOne.do",
		async: false,
		data: {
			stockCode: stockCode
		},
		success: function(data) {
			isAttention = data;
		}
	});
	return isAttention;
}
//搜索信息补全
function autocomplete(request, response) {
	$.ajax({
		type: "post",
		url: url + "/enterprise/findCodeName.do",
		async: false,
		data: {
			codeName: request.term,
			pageNum: 1,
			pageSize: 5
		},
		beforeSend: function(xhr) {
			xhr.setRequestHeader("UU", $.cookie("UU"));
			xhr.setRequestHeader("phone", $.cookie("phone"));
		},
		success: function(data) {
			if(data.retCode == 0000) {
				if(data.retData == null) {
					return false;
				}
				var arr = [];
				$.each(data.retData, function(i, item) {
					var obj = {
						label: item.companyForShort + "（" + item.stockCode + "）",
						value: item.companyForShort + "（" + item.stockCode + "）",
						name: item.companyForShort,
						code: item.stockCode
					}
					arr.push(obj);
				});
				searchList = arr;
				response(arr);
			} else {
				errorAlert(data.retCode, data.retMsg);
			}
		}
	});
}
//判断登录状态
function isLogin() {
	var urlHtml = window.location.pathname;
	if(urlHtml.match("login.html") != null || urlHtml.match("register.html") != null || urlHtml.match("retrievePassword.html") != null) { //登录页
		if($.cookie("UU") != undefined && $.cookie("phone") != undefined) {
			window.location.href = "home.html";
		}
	} else { //非登录页（内容页）
		if($.cookie("UU") == undefined || $.cookie("phone") == undefined) {
			window.location.href = "login.html";
		}
	}
}
// ---------扩展表单校验规则
if(jQuery.validator) {
	jQuery.validator.addMethod("mobile", function(value, element) {
		var tel = /^1[3|4|5|7|8]{1}[\d]{9}$/;
		return this.optional(element) || (tel.test(value));
	}, "请正确填写您的手机号");
	jQuery.validator.addMethod("password", function(value, element) {
		var tel = /^[a-zA-Z0-9~!@#$%^&*()_+\-={}:;<>?,.\/]{6,16}$/;
		return this.optional(element) || (tel.test(value));
	}, "您输入的密码格式不正确");
	jQuery.validator.addMethod("notEqualTo", function(value, element, param) {
		return this.optional(element) || (value != $(param).val());
	}, "新密码不能与原密码一致!");
}

//公共下载方法
function downloadFile(url) {
	try {
		var elemIF = document.createElement("iframe");
		elemIF.src = url;
		elemIF.style.display = "none";
		document.body.appendChild(elemIF);
	} catch(e) {

	}
}
//公共的错误处理方法
function errorAlert(code, msg) {
	switch(Number(code)) {
		case 3001:
			$.zmAlert(msg); //请选择股票
			break;
		case 3002:
			$.zmAlert(msg); //请选择日期
			break;
		case 3003:
			$.zmAlert(msg); //请选择指标
			break;
		case 3007:
			$.zmAlert(msg); //修改密码失败
			break;
		case 3008:
			$.zmAlert(msg); //修改手机号失败
			break;
		case 3010:
			$.zmAlert(msg); //搜索内容过短
			break;
		case 3009:
			$.zmAlert("上传头像失败");
			break;
		case 3013:
			$.zmAlert("增加用户关注企业失败");
			break;
		case 3014:
			$.zmAlert("查询用户关注企业失败");
			break;
		case 3016:
			$.zmAlert("原密码不正确");
			break;
		case 3017:
			$.zmAlert("检索已经存在");
			break;
		case 3018:
			dropOut();
			break;
		default:
			$.zmAlert(msg);
			break;
	}
}

/**
 * 公共下载文件方法
 * @param url: c:\\abc.txt
 * @param fileName: abc.txt
 */
function download(url, fileName,index) {
	if(url == null || "" == url) {
		$.zmAlert("文件路径错误！");
	}
	if(fileName == null || "" == fileName) {
		$.zmAlert("文件名错误！");
	}
	
	$("#pdfMasker").animate({
		"bottom": 0
	}, 300,function(){
		pdfIndex=index;
		$("#pdf_prev").off("click");
		$("#pdf_prev").on("click",function(){
			pdfIndex--;
			pdfChange();
		});
		$("#pdf_next").off("click");
		$("#pdf_next").on("click",function(){
			pdfIndex++;
			pdfChange();
		});
		pdfChange();
	});
	
	//window.location.href='http://bdata.159jh.com/home/bdata/files/pdf1/disclosure/2006/0314/16565007.pdf';
	//window.location="/common/downLoad.do?fileName="+fileName+"&url="+url;
}
function pdfChange(url){
	if (pdfIndex==0) {
		$("#pdf_prev").attr("disabled","disabled");
	}else{
		$("#pdf_prev").removeAttr("disabled");
	}
	if (pdfIndex==pdfLIst.length-1) {
		$("#pdf_next").attr("disabled","disabled");
	}else{
		$("#pdf_next").removeAttr("disabled");
	}
	$("#pdfMasker>ul>li").eq(0).find("em").html(pdfIndex+1+"/"+pdfLIst.length);//序号
		$("#pdfMasker>ul>li").eq(1).find("em").html(pdfLIst[pdfIndex].companyName);//企业简称
		$("#pdfMasker>ul>li").eq(2).find("em").html(pdfLIst[pdfIndex].stockCode);//股票代码
		$("#pdfMasker>ul>li").eq(3).find("em").html(pdfLIst[pdfIndex].financialYear);//公告日期
		$("#pdfMasker>ul>li").eq(4).find("em").html(pdfLIst[pdfIndex].financialType);//报告类型
		
		$("#pdf").attr("src", "http://bdata.159jh.com"+pdfLIst[pdfIndex].financialStatements);//compressed.tracemonkey-pldi-09.pdf
		$("html,body").css("overflow", "hidden");
}

/**
 * 写入loading动画
 * @param 
 *
 */
function setLoading(){
	var box='<div class="loadingBox">';
		box+='<div class="loading-3">';
		box+='<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>';
		box+='</div></div>';
		$("body").append(box);
}
/**
 * HashMap
 * @param 
 * @result 
 */
function HashMap() {
	var size = 0;
	var entry = new Object();
	
	this.put = function (key, value) {
		entry[key] = value;
		size++;
	};
	
	this.putAll = function (map) {
		if (typeof map == "object" && !map.sort) {
			for (var key in map) {
				this.put(key, map[key]);
			}
		} else {
			throw "输入类型不正确，必须是HashMap类型！";
		}
	};
	
	this.get = function (key) {
		return entry[key];
	};
	
	this.remove = function (key) {
		if (size == 0)
			return;
		delete entry[key];
		size--;
	};
	
	this.containsKey = function (key) {
		if (entry[key]) {
			return true;
		}
		return false;
	};
	
	this.containsValue = function (value) {
		for (var key in entry) {
			if (entry[key] == value) {
				return true;
			}
		}
		return false;
	};
	
	this.clear = function () {
		entry = new Object();
		size = 0;
	};
	
	this.isEmpty = function () {
		return size == 0;
	};
	
	this.size = function () {
		return size;
	};
	
	this.keySet = function () {
		var keys = new Array();
		for (var key in entry) {
			keys.push(key);
		}
		return keys;
	};
	
	this.entrySet = function () {
		var entrys = new Array();
		for (var key in entry) {
			var et = new Object();
			et[key] = entry[key];
			entrys.push(et);
		}
		return entrys;
	};
	
	this.values = function () {
		var values = new Array();
		for (var key in entry) {
			values.push(entry[key]);
		}
		return values;
	};
	
	this.each = function (cb) {
		for (var key in entry) {
			cb.call(this, key, entry[key]);
		}
	};
	
	this.toString = function () {
		return obj2str(entry);
	};
	
	function obj2str(o) {
		var r = [];
		if (typeof o == "string")
			return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
		if (typeof o == "object") {
			for (var i in o)
				r.push("\"" + i + "\":" + obj2str(o[i]));
			if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}";
			return r;
		}
		return o.toString();
	}
}

/**
 * 弹出框、确认框
 */
(function($) {
	$.extend({
		"zmAlert": function(con, time, urls) { //三个参数 内容、时间、跳转地址（如果有的话）
			if($(".zmAlert").size() == 0) {
				var box = $("<div>");
				var close = $("<button>");
				var bg = $("<div>");
				var p = $("<p>");
				box.attr("class", "zmAlert");
				bg.attr("class", "zmBg");
				close.attr("class", "zmClose");
				box.append(close);
				box.append(p);
				$("body").append(box).append(bg);
				close.unbind("click");
				close.bind("click",
					function() {
						box.fadeOut();
						bg.fadeOut();
					});
				bg.unbind("click");
				bg.bind("click",
					function() {
						box.fadeOut();
						bg.fadeOut();
					});
			}
			time == undefined ? time = 1500 : null;
			time < 1000 ? time = 1000 : null;
			time > 5000 ? time = 5000 : null;
			$(".zmAlert").show();
			$(".zmBg").first().show();
			$(".zmAlert p").html(con);
			alertBack(time, urls);
		},
		"zmConfirm": function(val, f1, f2) { //内容、确认回调、取消回调
			if($(".zmConfirm").size() == 0) {
				var box = $("<div>");
				//var btn = $("<button>");
				var p = $("<p>");
				var a1 = $("<a>");
				var a2 = $("<a>");
				var bg = $("<div>");
				bg.attr("class", "zmBg");
				box.addClass("zmConfirm");
				//btn.addClass("zmclose");
				a1.attr("href", "javascript:;").html("确定");
				a2.attr("href", "javascript:;").html("取消");
				//box.append(btn);
				box.append(p);
				box.append(a1);
				box.append(a2);
				$("body").append(box).append(bg);
				bg.unbind("click");
				//				bg.bind("click", function() {
				//					box.fadeOut();
				//					bg.fadeOut();
				//				});
				/*btn.bind("click", function() {
					box.fadeOut();
				});*/
			}
			$(".zmConfirm").show();
			$(".zmBg").first().show();
			$(".zmConfirm a").unbind("click");
			$(".zmConfirm p").html(val);
			if(typeof(f1) == "function") {
				$(".zmConfirm a").eq(0).bind("click",
					function() {
						$(".zmConfirm").fadeOut();
						$(".zmBg").fadeOut();
						f1();
					});
			}

			$(".zmConfirm a").eq(1).bind("click",
				function() {
					if(f2 != false && typeof(f2) == "function") {
						$(".zmConfirm").fadeOut();
						$(".zmBg").fadeOut();
						f2();
					} else {
						$(".zmConfirm").fadeOut();
						$(".zmBg").fadeOut();
					}
				});
		}
	});

	function alertBack(time, urls) {
		setTimeout(showAlert(urls), time);

	}

	function showAlert(urls) {
		return function() {
			showAlert(urls);
			$(".zmAlert").fadeOut();
			$(".zmBg").fadeOut();
			if(urls != undefined && urls != "") {
				window.location.href = urls;
			}

		}
	}
})(window.jQuery);