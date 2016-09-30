$(function(){
	
	if(localStorage["curplace"]){
		$(".curplace").html(localStorage["curplace"])
	}else{
		$(".curplace").html("请输入地址信息");
	}
	
	var mySwiper = new Swiper(".swiper-container", {
		loop:true,
		autoplay:1000,
		pagination:'.swiper-pagination',
		onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		}
	});
	
	//商品列表
	$.ajax({
		url:"../js/bidian_list.json",
		async:false,
		success:function(msg){
			var data = msg.data;
			console.log(data.length);
			var str = '';
			for(var i in data){
				str += '<li class="list"><a href="javascript:;"><div class="box" index="'+data[i].id+'"><dl>';
				str += '<dt><img src="'+data[i].img+'"/></dt>';
				str += '<dd><h3>'+data[i].title+'</h3>';
				str += '<p>'+data[i].youhui+'</p>';
				str += '<i class="iconfont collect">&#xe61d;</i><s class="iconfont">'+data[i].mark+'</s></dd></dl>';
				str += '<ul><li><span>'+data[i].qisong+'</span>元起送</li> |';
				str += '<li><span>'+data[i].peisong+'</span>元配送费</li> |';
				str += '<li>約<span>'+data[i].time+'</span>分钟</li></ul></div></a></li>'
			}
			
			$("#con_box").append(str);
			
			huoqu();
			function huoqu(){
				var length = $(".collect").size();
				//console.log(length);
				for(var k = 0;k < localStorage.length;k++){
					console.log(localStorage.key(k));
					for(var t = 0;t < length;t++){
						var shopsColl = $(".collect").eq(t).parents(".box").attr("index");
						console.log(1);
						if(localStorage.key(k) == ("shopsColl"+shopsColl)){
							$(".collect").eq(t).addClass("coll");
						}
					}
				}
			}
			
			
			$(".list").on("tap",function(evt){
				//alert($(this).index());
				localStorage["shopsID"] = $(this).index();
				window.location.href="dibugwc.html";
				evt.stopPropagation();
			})
			$(".collect").on("tap",function(evt){
				var shopsColl = $(this).parents(".box").attr("index");
				if($(this).hasClass("coll")){
					localStorage.removeItem("shopsColl"+shopsColl);

				}else{
					localStorage["shopsColl"+shopsColl] = shopsColl;

				}
				$(this).toggleClass("coll");
				evt.stopPropagation();
				
			})
		}
	});
	
	
	//滚屏事件
	var myScroll = new IScroll("#content",{
		scrollX: true, 
		scrollY: true,
		click:true,
		tap:true
	})
	
	
})
