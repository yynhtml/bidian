$(function(){
	//收藏
	$(".collect").click(function(){
		window.location.href = "collect.html"
	})
	//分享
	$(".share").click(function(){
		$(".share-fd").toggle()
	})
	//收货地址
	$(".address").click(function(){
		window.location.href = "address.html"
	})
	//优惠页
	$(".fav").click(function(){
		if(localStorage.getItem('true')){
			window.location.href = "benefit.html"
		}else{
			window.location.href = "login.html"
		}
		
	})
	//退出
	$(".quit").click(function(){
		$(".quit-fd").show()
		$(".ptrue").click(function(){
			localStorage.removeItem('true')
			$("#puser_name").html("请登录")
			window.location.href = "main.html"
			$(".quit-fd").hide()
		})
		$(".pcancel").click(function(){
			$(".quit-fd").hide()
		})
		
	})
	//登录
	$(".user_infor").click(function(){
		window.location.href = "login.html"
	})
	//console.log(localStorage.getItem('true'))
	if(localStorage.getItem('true')){
		$("#puser_name").html(localStorage.getItem('true'))
	}else{
		$("#puser_name").html("请登录")
	}
	var myScroll = new IScroll("#pcon_isc",{
		scrollX: true, 
		scrollY: true,
		click:true,
		tap:true
	})
	
	
})


