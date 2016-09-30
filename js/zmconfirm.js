$(function () {
//	var str=''
//	for (var i = 0;i<100;i++) {
//		str+='<section>'+i+'</section>'
//	}
//	$("#gao_scroll").html(str);
	var myisroll = new IScroll("#gao_content");
	
	
	//列表页接口获取数据
	//var myScroll;//定义变量
	var numm=33;
	var dataid = Number(localStorage.getItem("zmdataid"));
	var count = Number(localStorage.getItem("zmcount"))+numm;
	var n = Number(localStorage.getItem("zmnumber"));
	//alert(Number(dataid))
	ajax1();

	function ajax1() {
		$.ajax({
			url: "http://127.0.0.1:8020/bidianwaimai/zxwgc/src/json/detail1.json",
			async: false,
			success: function(mag) {
				var data2 = mag.data2;
				var str = '';
				var str2 = '';
				console.log(data2);
				for(var i in data2) {
					if(data2[i].id == dataid) {
						var num = Math.floor(Math.random() * 100)

						//str += '<section class="sec"><section><img src="' + data2[i].img + '"></section><section class="name">' + data2[i].name + '</section><section class="state">' + '<section>月售<span>' + num + '</span>份</section>' + '</section><section class="attr"><span>￥</span><b class="bb2">' + data2[i].attr + '</b></section><img class="im" src="../images/zmjiaru.jpg" dataid = "' + data2[i].id + '" ></section>'
						str +='<ul>'
						str +='<li><span id="gao_shopname"><img class="img7" src="'+ data2[i].home +'"></span></li>'
						str +='<li><p><span class="gao_goodname">'+ data2[i].name +'</span></p><p class="gao_num">×<span>'+n+'</span></p><p class="gao_plast">￥<span class="gao_sum">224</span></p></li>'
						str +='<li><p><span>包装</span></p><p class="gao_plast">￥<span>0</span></p></li>'
						str +='<li><p><span>配送费</span></p><p class="gao_plast">￥<span id="gao_delivery">'+numm+'</span></p></li>'
						str +='<li><p class="gao_plast">订单￥<span id="gao_total">'+count+'</span></p></li>'
						str +='</ul>'
					}
				}
				$(".gao_shop").append(str);
				
			}
		});
		
		$("#gao_pay .sp1").html($("#gao_total").html())//写在ajax外边就必须是同步加载，（先加载ajax再加载这一行）如果async:true,就是异步加载（同时加载多任务）就必须写在ajax里边
	}
	$("#gao_box").on("click",".gao_icon",function(){
		window.location.href = "detail2.html"
	})
	
	
	
	
	
	
	
	
	
})
