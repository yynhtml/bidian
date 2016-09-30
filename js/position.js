$(function(){
	$("#fanhui").click(function(){
		window.location.href = "../html/bidian.html"
	})
	jilu();
	function jilu(){
		var str = '';
		
		if(localStorage["place"]){
			var oldLocal = localStorage["place"];
			var arr = oldLocal.split(";");
			arr.reverse();
			if(arr.length>5){
				arr.pop();
				localStorage["place"] = arr[0] + ";" + arr[1] + ";" + arr[2] + ";" + arr[3] + ";" + arr[4];
			}
			str += '<li><i class="iconfont">&#xe622;</i>历史记录</li>';
			for(var i = 0;i < arr.length;i++){
				str += '<li class="shuju">'+arr[i]+'</li>';
			}
			str += '<li id="cle">清空历史记录</li>';
			$(".lishi").html(str);
		}else{
			str += '<li><i class="iconfont">&#xe622;</i>历史记录</li>';
			str += '<li id="cle">清空历史记录</li>';
			$(".lishi").html(str);
		}
	}

	$("#btn").click(function(){
		
		if($("#search").val()){
			var place = $("#search").val();
			if(localStorage["place"]){
				var oldLocal = localStorage["place"];
				var arr = oldLocal.split(";");
				var flag = true;
				for(var i = 0;i < arr.length;i++){
					if(place == arr[i]){
						flag = false;
					}
				}
				if(flag){
					var newLocal = oldLocal + ";" + place;
					localStorage["place"] = newLocal;
				}
				
			}else{
				localStorage["place"] = place;
			}
			localStorage["curplace"] = place;
			$("#search").val("");
			//jilu();
			window.location.href = "bidian.html";
		}
		
	})
	$(".lishi").on("click","#cle",function(){
		localStorage.removeItem("place");
		jilu();
	})
	
	var oLi = $(".shuju");
	$(".lishi").on("click",".shuju",function(){
		//alert($(this).html());
		$("#search").val($(this).html());
	})
	
	$("#curposi").on("click",function(){
		//alert(1)
		$.ajax({
			url:"http://pv.sohu.com/cityjson",
			async:true,
			success:function(data){
				alert(data);
			}
		});
	})
})
