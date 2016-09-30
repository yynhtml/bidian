$(function(){
	$(".pback").click(function(){
		window.location.href = "mine.html"
	})
	
	
	var mySwiper = new Swiper(".swiper-container", {
		loop:true,
		pagination:'.swiper-pagination',
		onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
		}
	});
	
	
	//收藏列表
	$.ajax({
		url:"../js/shops.json",
		async:false,
		success:function(msg){
			
			var data = msg.data;
			//console.log(data.length);
			var str = '';
			var localStorage
			var arr =''
			
				for(var i in data){
					localStorage = window.localStorage.getItem("shopsColl"+data[i].id+"")
					console.log(localStorage)
					console.log(parseInt(localStorage))
					if(localStorage != ""){
						if(!isNaN(parseInt(localStorage))){
							//alert(!isNaN(localStorage))
							$(".pcon").hide()
							$("#content")
							str += '<li class="list"><a href="javascript:;"><div class="box" index="'+data[i].id+'"><dl>';
							str += '<dt><img src="'+data[Number(localStorage)].img+'"/></dt>';
							str += '<dd><h3>'+data[Number(localStorage)].title+'</h3>';
							str += '<p>'+data[Number(localStorage)].youhui+'</p>';
							str += '<i class="iconfont remove">&#xe614;</i><s class="iconfont">'+data[Number(localStorage)].mark+'</s></dd></dl>';
							str += '<ul><li><span>'+data[Number(localStorage)].qisong+'</span>元起送</li> |';
							str += '<li><span>'+data[Number(localStorage)].peisong+'</span>元配送费</li> |';
							str += '<li>約<span>'+data[Number(localStorage)].time+'</span>分钟</li></ul></div></a></li>'
						}
						
					}else{
						$("#content").hide()
					}

				}
				console.log(str)
			$("#con_box").append(str);
			//移除收藏
			$(".remove").on("tap",function(evt){
				var shopsColl = $(this).parents(".box").attr("index");
				$(this).parents(".list").remove()
				//alert(shopsColl)
				var length = $(".list").size()
				if(length>0){
					window.localStorage.removeItem("shopsColl"+shopsColl); 
				}else{
					$(".pcon").show()
					$("#content").hide()
					window.localStorage.removeItem("shopsColl"+shopsColl); 
				}
				
				evt.stopPropagation();
				
			})
		}
	});
	var myScroll = new IScroll("#content",{
		scrollX: true, 
		scrollY: true,
		click:true,
		tap:true
	})
})
