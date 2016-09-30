$(function(){
	/*banner*/
	$.ajax({
		
		url:"../json/JJM_banner.json",
		async:true,
		success:function(mag){
			var data=mag.data
			var str=""
			for(var i in data){
				var ban=data[i].img
				//console.log(banner)
				str+="<div><img src='"+ban+"'/></div>"
			}
			$(".banner").append(str)
		}
	});
	
	/*goodslist*/
	var myscroll
	scrolls()
	ajaxs()
	function scrolls(){
		myscroll=new IScroll(".wrapper",{
			click:true,
			tap:true
		})
	}
	function ajaxs(){
		$.ajax({
		
			url:"../json/JJM_goods.json",
			async:true,
            success:function(mag){
            	        var data=mag.data
						$.each(data, function(index) {
							var odl=$("<dl class='dl_l'></dl>")
							var odiv=$("<div class='div1'></div>")
							var odivpic=$("<dt class='pic'><a href='#'>加载图片中</a></dt>")
							var pic=$("<img src='"+data[index].img+"' />")
							
							var name=$("<dd class='dd_1'>"+data[index].name+"</dd>")
							var zhushi=$("<dd dataid='"+data[index].id+"' class='dd_2'><a href='#'>"+data[index].zhushi+"</a></dd>")
							var p1=$("<p><span>"+data[index].jiage+"</span>"+data[index].song+"</p>")
							var p2=$("<p><span>"+data[index].jiage+"</span>"+data[index].peisong+"</p>")
							var p3=$("<p class='dd_p'>"+data[index].time+"</p>")
						    var heart=$("<div class='heart' dataid='"+data[index].id+"'><img src='"+data[index].heart+"'/></div>")
						    var cha=$("<img src='"+data[index].cha+"'/>")
						    var phone=$("<img src='"+data[index].phone+"'/>")
							odl.append(odivpic)
							odl.append(name)
							odl.append(zhushi)
							odl.append(odiv)
							odl.append(heart)
							odl.append(cha)
							odl.append(phone)
							odiv.append(p1)
							odiv.append(p2)
							odiv.append(p3)
							pic.on("load",function(){
								myscroll.refresh()
								odivpic.html(pic)
							})
							$(".list").append(odl)
							phone.css({width:"0.7rem",
								"position":"absolute",
								top:"2.2rem",
								left:"14.7rem",})
							cha.css({width:"1rem",
								"position":"absolute",
								top:"0.9rem",
								left:"14.8rem"})
							heart.find("img").css({
								width:"1rem"
							})
							
							
							
							
						});
						huoqu();
						function huoqu(){
							var length = $(".heart").size();
							for(var k = 0;k < localStorage.length;k++){
								for(var t = 0;t < length;t++){
									var shopsColl = $(".heart").eq(t).attr("dataid");
									console.log(localStorage.key(k));
									var str = "shopsColl"+shopsColl;
									console.log(str);
									if(localStorage.key(k) == str){
										console.log(1)
										$(".heart").eq(t).find("img").attr("src","../images/jjm_xin2.jpg");
										$(".heart")
									}
								}
							}
						}
						$(".heart").on("touchstart",function(evt){
								
							var shopsColl = $(this).attr("dataid");
							console.log(shopsColl)
							//localStorage.setItem("shopsColl"+shopsColl,shopsColl)
							if(localStorage.getItem("shopsColl"+shopsColl)){
								localStorage.removeItem("shopsColl"+shopsColl);
								$(this).find("img").attr("src","../images/JJM_heart.jpg");
							}else{
								localStorage.setItem("shopsColl"+shopsColl,shopsColl)
								$(this).find("img").attr("src","../images/jjm_xin2.jpg");
							}
							evt.stopPropagation();
						})
						
			}
		});
	}
	$(".wrapper").on("touchend",function(){
		if(myscroll.y>40){
			myscroll.refresh()
		}else if(myscroll.y<myscroll.maxScrollY-40){
			ajaxs()
		}
	})
	
	var dataid=""
	$(".goods").on("click",".dd_2",function(){
		//alert()
		dataid =$(this).attr("dataid");
		localStorage.setItem("dataid",dataid)
		window.location.href="JJM_blxqy.html";
	})
})
































































































