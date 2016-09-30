
	$(function(){
			//列表页接口获取数据
			var dataid = Number(localStorage.getItem("dataID"));
			var myScroll;//定义变量
				ajax1();
				Scroll();
				function ajax1(){
				$.ajax({
					url:"http://127.0.0.1:8020/bidianwaimai/zxwgc/src/json/detail1.json",
					async:false,
					success:function(mag) {
						var data2 = mag.data2;
						var str = '';
						console.log(data2);
						$.each(data2, function(index) {//这种加载方式叫懒加载//这是each的固定格式
							var odiv = $("<div class='sec'></div>") //list里放odiv,odiv里放图片和名字
							//console.log(odiv,eval(data2[index].id))
							var odivpic = $("<div class='pic'>图片正在加载中</div>")
							var pic = $("<img src='"+data2[index].img+"'/>")
							var name = $("<div class='name'>"+data2[index].name+"</div>")
							var attr = $("<div class='attr'>仅售￥<b class='bb2'>"+data2[index].attr+"</b></div>")
							var state = $("<div><img class='im' src='../images/zmjiaru.jpg' dataid =  '"+ data2[index].id + "' ></div>")
							odiv.append(name);
							odiv.append(odivpic);
							odiv.append(attr);
							odiv.append(state);
							pic.on("load",function(){
								Refresh();//这里要先刷新才能运行scroll函数
								odivpic.html(pic);//有“图片正在加载中”，所以要干掉
							})
							
							$(".list").append(odiv)
						});
					}
				});
									
				}

				
				//当上啦超过50px时，执行刷新
				$("#box").on("touchmove",function(){
					if(myScroll.y>50){
						$(".refreshUp").show()
					}
				})
				//var num=1;
				$("#box").on("touchend",function(){
					if(myScroll.y>50){
						$(".refreshUp").hide()//头部的刷新字样隐藏
						//Refresh()//刷新：看效果
					}
					if(myScroll.y<myScroll.maxScrollY-50){//当滑动到底部超过50px时，加载ajax1的数据
						ajax1();
						//num++
					}
				})	
				
				
				function Scroll(){//滚动回弹函数
					myScroll = new IScroll("#wrapper",{
						tap:true//默认false，这是一个开关，写了之后可以防止误触
					})
				}				
				//刷新函数
				function Refresh(){
					myScroll.refresh()
				}


		 	/* 长宽占位 rem算法, 根据root的rem来计算各元素相对rem, 默认html 640/16 = 40px */
		 	function placeholderPic(){
		  		var w = document.documentElement.offsetWidth ;
		  		document.documentElement.style.fontSize= w / 16 + 'px' ;
		 	}
				placeholderPic();
		 	window.onresize = function(){
		  		placeholderPic();
		 	}

	/****************************点击加入购物车*************************************/
	var num = 0;
	$(".list").on("tap", ".im", function() {//不能用click我也不知道为什么
			var val = 0;
			num++;
			var va = $(".sec .bb2").text()
			alert(va)
			val = num * Number(va)
			$("footer .gwc").html(num)
			$("footer .jiesuan").css({
				"display": "block"
			})
			$("footer .mon").css({
				"display": "block"
			})
			$("footer .gwc").css({
				"opacity":"0.8","background":"#ccc"
			})
			$("footer .bb1").html(val)

			var dataid = $(this).attr("dataid")
			localStorage.setItem("dataid", dataid) //商品id
			localStorage.setItem("count", val) //商品数量
				//alert(localStorage.getItem("count"))
				//alert(localStorage.getItem("dataid"))

		})

		 	
		 	

 });			
				
				
				

			
			
			
	












