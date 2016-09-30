$(function(){
	var dataid = localStorage.getItem("dataid")
	$.ajax({
		
		url:"../json/JJM_goods.json",
		async:true,
		success:function(mag){
			str=""
			data=mag.data
			for(var i in data){
				if(dataid == data[i].id){
					console.log(data[i]);
					str+="<dl>"
					str+="<dt class='dt_1' dataid='"+data[i].id+"'><img  src='"+data[i].img+"' /></dt>"
					str+="<dd class='dd_1'>"+data[i].name+"</dd>"
					str+="</dl>"
				}
				
			}
			$(".pic").append(str);
		}
	});
	var taid=""
	$(".mark").on("click",function(){
		$(".shade").show().next(".point").show();
		taid=$(this).parent().prev().find(".dt_1").attr("dataid")
		localStorage.setItem("taid",taid)

	})
	$(".shade_btn").on("touchend",function () {
		window.location.href="benefit.html";	
	})
	$(".shade_btn1").on("touchend",function () {
		$(this).parents(".point").hide().prev().hide();	
	})
	$(".pic_1").on("touchend",function () {
		window.location.href="JJM _bl list.html";
	})
	
	
})
