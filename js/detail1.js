
		
	$(function(){
			//列表页接口获取数据
			var myScroll;//定义变量
				ajax1();
				Scroll();
				function ajax1(){
				$.ajax({
					url:"../json/detail1.json",//http://127.0.0.1:8020/bidianwaimai/zxwgc/src/json/detail1.json有风险
					async:false,
					success:function(mag) {
						var data2 = mag.data2;
						var str = '';
						console.log(data2);
//						for(var i in data2){
//							str+='<section class="sec"><section class="name">'+data2[i].name+'</section><section><img src="'+data2[i].img+'"></section><section class="attr">'+data2[i].attr+'</section><section class="state">'+data2[i].state+'</section></section>'
//						}
//						$(".list").append(str);
						$.each(data2, function(index) {//这种加载方式叫懒加载//这是each的固定格式
							var odiv = $("<div class='sec'></div>") //list里放odiv,odiv里放图片和名字
							//console.log(odiv,eval(data2[index].id))
							var odivpic = $("<div class='pic'>图片正在加载中</div>")
							var pic = $("<img src='"+data2[index].img+"'/>")
							var name = $("<div class='name'>"+data2[index].name+"</div>")
							var attr = $("<div class='attr'>仅售￥"+data2[index].attr+"</div>")
							var state = $("<div class='state'  dataid='"+data2[index].id+"'>"+data2[index].state+"</div>")
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
		 	/****************************点击触发函数*************************************/
		 	$(".list").on("tap",".state",function(){
		 		var dataid = $(this).attr("dataid")
		 		//alert(dataid)
		 		localStorage.setItem("dataID",dataid)
		 		window.location.href="detail2.html"
		 		//alert(localStorage.getItem("dataID"))
		 	})
		 	/****************************nav************************************/
 });			
				
				
				

			
			
			
	












