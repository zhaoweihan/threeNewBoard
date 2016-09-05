//发行分配
$(function(){
	//解析获取股票代码、股票名称
	privatePlacementType(null);
});
/**
 * 已完成定增，定增预案
 */
function privatePlacementType(type){
	if(type!=5){
		$(".center_title").find("a").eq(0).addClass("hover");
		$(".center_title").find("a").eq(1).removeClass("hover");
	}else{
		$(".center_title").find("a").eq(1).addClass("hover");
		$(".center_title").find("a").eq(0).removeClass("hover");
	}
	findPrivatePlacement(type);
}
/**
 * 根据股票代码找定增信息
 */
function findPrivatePlacement(type){
	$("#privatePlacement").html("");
	$("#notice").html("");
	$.ajax({
		type:"post",
		url:url+"/privatePlacement/findDetail.do",
		async:true,
		data:{
			stockCode:getUrlParam("stockCode"),
			type:type
		},
		beforeSend:function(xhr){
			xhr.setRequestHeader("uu");
		},
		success:function(data){
			if (data.retCode==0000) {
				var result=data.retData;
				if(result!=null){
					for(var i=0;i<result.length;i++){
						var privatePlacement=result[i];
						var html='<tr>';
							html+='<td >'+privatePlacement.placementDate+'</td>';
							if(privatePlacement.schedule==1){
								html+='<td >股东大会通过</td>';
							}else if(privatePlacement.schedule==2){
								html+='<td >董事会通过</td>';
							}else if(privatePlacement.schedule==3){
								html+='<td >停止实施</td>';
							}else if(privatePlacement.schedule==4){
								html+='<td >股东大会未通过</td>';
							}else if(privatePlacement.schedule==5){
								html+='<td >已完成</td>';
							}
							html+='<td >'+privatePlacement.privatePrice.toFixed(2)+'</td>';
							html+='<td >'+privatePlacement.privateNum.toFixed(2)+'</td>';
							html+='<td class="mjje">'+privatePlacement.raisePrice.toFixed(2)+'</td>';
							html+='<td >'+privatePlacement.financingRatio.toFixed(2)+'</td>';
							html+='<td >'+privatePlacement.premiumRate.toFixed(2)+'</td>';
							html+='<td ><a href="javascript:void(0);" class="purchaserClass" style="cursor: pointer;color: blue">发行对象</a>'+getPurchaserHtml(privatePlacement.purchaser,privatePlacement.schedule)+'</td>';
							html+='</tr>';
						$("#privatePlacement").append(html);
						//定增公告
						var noticeList=privatePlacement.noticeList;
						if(noticeList!=null && noticeList.length!=0){
							for(var j=0;j<noticeList.length;j++){
								var notice=noticeList[j];
								var noticeHtml='<li>';
								if(notice.noticeName.length>33){
									noticeHtml+='<a href="javascript:void(0);" title="'+notice.noticeName+'">'+notice.noticeName.substring(0,33)+'..</a>';
								}else{
									noticeHtml+='<a href="javascript:void(0);" title="'+notice.noticeName+'">'+notice.noticeName+'</a>';
								}
								noticeHtml+='<span>'+notice.noticeDate+'</span>';
								noticeHtml+='<i onclick="downloadFile(\''+notice.noticeUrl+'\')">下载</i>';
								noticeHtml+='</li>';
								$("#notice").append(noticeHtml);
							}
						}
					}
					//绑定显示发行对象事件
					$(".purchaserClass").on("click", function() {
						$(this).next().attr("style","");
					});
					$(".chaktx_title").find("a").on("click", function() {
						$(this).parent().parent().attr("style","display:none");
					});
				}else{
					var noHtml='<tr><td colspan="8"  scope="col">暂无数据</td></tr>';
					$("#privatePlacement").html(noHtml);
				}
			} else{
				errorAlert(data.retCode,data.retMsg);
			}
		}
	});
}


/**
 * 发行对象
 * @param purchaser
 * @param type
 * @returns {String}
 */
function getPurchaserHtml(purchaser,type){
	//<!--查看对象弹窗 star-->
	var duixiangHtml='<div class="chaktx" style="display:none">';
		duixiangHtml+='<div class="chaktx_title"><span>发行对象</span><a href="javascript:void(0);">X</a></div>';
		duixiangHtml+='<div class="chaktx_table">';
		duixiangHtml+='<table width="100%" border="1">';
		duixiangHtml+='<tr>';
		duixiangHtml+='<th scope="col" class="tc_fxdx">发行对象</th>';
		duixiangHtml+='<th scope="col" class="tc_rgjg">认购价格(元)</th>';
		duixiangHtml+='<th scope="col" class="tc_rgsl">认购数量(万股)</th>';
		duixiangHtml+='<th scope="col" class="tc_rgje">认购金额(万元)</th>';
		duixiangHtml+='<th scope="col" class="tc_cgqx">持股期限(月)</th>';
		duixiangHtml+='</tr>';
		if(type==5){
			var objList=jQuery.parseJSON(purchaser);
			for(var i=0;i<objList.length;i++){
				var obj=objList[i];
				duixiangHtml+='<tr>';
				duixiangHtml+='<th scope="col" class="tc_fxdx">'+obj.ORGNAME+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgjg">'+obj.F005N_STK236+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgsl">'+obj.F001N_STK236+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgje">'+(obj.F005N_STK236*obj.F001N_STK236).toFixed(2)+'</th>';
				duixiangHtml+='<th scope="col" class="tc_cgqx">'+obj.F004N_STK236+'</th>';
				duixiangHtml+='</tr>';
			}
		}else{
			var str=purchaser.split("、");
			for(var i=0;i<str.length;i++){
				duixiangHtml+='<tr>';
				duixiangHtml+='<th scope="col" class="tc_fxdx">'+str[i]+'</th>';
				duixiangHtml+='<th scope="col" class="tc_rgjg">--</th>';
				duixiangHtml+='<th scope="col" class="tc_rgsl">--</th>';
				duixiangHtml+='<th scope="col" class="tc_rgje">--</th>';
				duixiangHtml+='<th scope="col" class="tc_cgqx">--</th>';
				duixiangHtml+='</tr>';
			}
		}
		duixiangHtml+='</table>';
		duixiangHtml+=' </div>';
		duixiangHtml+='</div>';
//		$("#duixiangHtml").html(duixiangHtml);
	return duixiangHtml;
}