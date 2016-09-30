





/*==============================================================================*/
						/*======需要的localstorge数据在81,82行=======*/
/*==============================================================================*/






$(function() {
	/* 长宽占位 rem算法, 根据root的rem来计算各元素相对rem, 默认html 640/16 = 40px */
	function placeholderPic() {
		var w = document.documentElement.offsetWidth;
		document.documentElement.style.fontSize = w / 16 + 'px';
	}
	placeholderPic();
	window.onresize = function() {
		placeholderPic();
	}

	//列表页接口获取数据
	//var myScroll;//定义变量

	var dataid = Number(localStorage.getItem("dataID"));
	//alert(Number(dataid))
	ajax1();

	function ajax1() {
		$.ajax({
			url: "http://127.0.0.1:8020/bidianwaimai/zxwgc/src/json/detail1.json",
			async: true,
			success: function(mag) {
				var data2 = mag.data2;
				var str = '';
				var str2 = '';
				console.log(data2);
				for(var i in data2) {
					if(data2[i].id == dataid) {
						var num = Math.floor(Math.random() * 100)

						str += '<section class="sec"><section><img src="' + data2[i].img + '"></section><section class="name">' + data2[i].name + '</section><section class="state">' + '<section>月售<span>' + num + '</span>份</section>' + '</section><section class="attr"><span>￥</span><b class="bb2">' + data2[i].attr + '</b></section><img class="im" src="../images/zmjiaru.jpg" dataid = "' + data2[i].id + '" ></section>'
						str2 += '</section><section class="attr"><span>￥</span><b class="bb1">' + data2[i].attr + '<b></section>'
					}
				}
				$("#content .list").append(str);
				$("footer .mon").html(str2);

			}
		});

	}

	/****************************点击加入购物车*************************************/
	var num = 0;
	$("#content").on("click", ".im", function() {
			var val = 0;
			num++;
			var va = $(".sec .bb2").text()
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
			localStorage.setItem("zmdataid", dataid) //商品id
			localStorage.setItem("zmcount", val) //商品数量
			localStorage.setItem("zmnumber", num) //商品数量
				//alert(localStorage.getItem("count"))
				//alert(localStorage.getItem("dataid"))
				//alert(localStorage.getItem("number"))

		})
		/****************************点击结算*************************************/
	$("footer").on("click", ".jiesuan", function() {
			window.location.href = "zmconfirm.html"
		})
		/****************************点击返回上一页*************************************/
	$("header").on("click", ".left", function() {
		window.location.href = "detail1.html"
	})

	//		function Scroll(){//滚动回弹函数
	//			myScroll = new IScroll("#wrapper",{
	//			})
	//		}
	//		Scroll();

	/****************************点击领取券*************************************/
	$(".money .btn").click(function() {
			$(this).parent().hide();
			$("header").css("height", "8rem")
		})
		/****************************公告*************************************/

	$(".attention .btn2").click(function() {
			window.location.href = "zmgwc.html"
		})
		/****************************分类*************************************/
	$("#content .btn3").click(function() {
		alert("全部分类")
	})

	/****************************购物车*************************************/
	$("footer .gwc").click(function() {
			alert("购物车")
		})
		/****************************5个活动*************************************/
	$("header .img3").click(function() {
		alert("5个活动")
	})
	$("header .img2").click(function() {
		alert("鼎卉鲜花（北京2店）")
	})
	$("header .img1").click(function() {
		alert("鼎卉鲜花index")
	})

});