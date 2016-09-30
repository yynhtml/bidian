$(function(){	
	
	//-------------------------返回个人中心
	$('#mainpage .header .return').on('touchend',function(){
		window.location.href = 'mine.html'//点击返回返回到用户中心页
	})
	
	//------------------------------选项卡的切换
	$('#main .tab p').on('touchend',function(){
		var index =  $(this).index()
		$(this).find('span').addClass('color')
		$(this).siblings().find('span').removeClass('color')
		$(this).parents('#main').find('.tabbox> div').eq(index).show()
		$(this).parents('#main').find('.tabbox>div').eq(index).siblings().hide()
	})
	//兑换红包点击进入兑换红包页面
	$('#mainpage .redbox .footer .add').on('touchend',function(){
		$("#duihuan").show().siblings().hide()
	})	
	//兑换红包页面返回到主页
	$('#duihuan .header .return').on('touchend',function(){
		$(this).parents('#duihuan').hide()
		$(this).parents('#duihuan').siblings().show()		
	})	
	//------------alert弹出框的确定按钮
	$("#zhez .zhez-close").on('touchend',function(){
		$(this).parents('#zhez').hide()
	})
	//---------------兑换页的验证-----------------
	var flagduihuan = false
	$('#duihuan .duihuan_main p input').blur(function(){
		var val = $(this).val()
		if(val == ''){
			$('#zhez').show()
			$('#zhez .zhez-box p').html('请输入兑换码领取红包喔~')
			flagduihuan = false
		}else{
			if(!/^\d{6}$/.test(val)){
				$('#zhez').show()
				$('#zhez .zhez-box p').html('您输入的兑换码不正确,请输入6位数字')
				flagduihuan = false
			}else{
				$('#zhez').hide()
				flagduihuan = true
			}
		}
	})
	//------------------------兑换按钮点击事件
	$('#duihuan .duihuan_main .submitduihua').on('touchstart',function(){
		//alert(flagduihuan)
		if(flagduihuan){
			$('#zhez').show()
			var rednum = Math.floor(Math.random()*10+1)
			$('#zhez .zhez-box p').html('恭喜您获得'+rednum+'元红包~')
			localStorage.setItem('redbao'+rednum,rednum)
			localStorage.setItem('redbaosuccess',true)
			setTimeout(function(){
				$('#duihuan').hide()
				$('#duihuan').siblings().show()
				$('#mainpage .redbox .box .have').show().siblings().hide()
				if(localStorage.getItem('redbao'+rednum)){
					var str = ''
					str = '<p>您有一张'+localStorage.getItem('redbao'+rednum)+'现金红包,赶快下单吧</p>'				
					$('#mainpage .redbox .box .have').append(str)
				}
			},3000)		
		}else{
			var val = $('#duihuan .duihuan_main p input').val()
			if(val == ''){
				$('#zhez').show()
				$('#zhez .zhez-box p').html('请输入兑换码领取红包喔~')
				flagduihuan = false
			}else{
				if(!/^\d{6}$/.test(val)){
					$('#zhez').show()
					$('#zhez .zhez-box p').html('您输入的兑换码不正确,请输入6位数字')
					flagduihuan = false
				}
			}
		}
	})
	//红包的cookie放进页面
	if(localStorage.getItem('redbaosuccess')){
		//alert()
	$('#mainpage .redbox .box .have').show().siblings().hide()
	}else{
		$('#mainpage .redbox .box .no').show().siblings().hide()
	}
	//代金券的cookie放进页面-----------!!!!!!需要加cookie名
	if(localStorage.getItem('taid')){
		//alert()
	$('#mainpage .quan .havebenefit').show().siblings().hide()
	}else{
		$('#mainpage .quan .nobenefit').show().siblings().hide()
	}
	
	//请求商品店铺优惠券的ajax
	var taid=localStorage.getItem("taid")
	$.ajax({
		url:"../json/JJM_goods.json",
		async:true,
		success:function(mag){
			str=""
			data=mag.data
			for(var i in data){
				if(taid == data[i].id){
					//console.log(data[i]);
					str+="<dl>"
					str+="<dt class='dt_1' dataid='"+data[i].id+"'><img  src='"+data[i].img+"' /></dt>"
					str+="<dd class='dd_1'>"+data[i].name+"</dd>"
					str+="<dd class='dd_2'>"+data[i].sjdjq+"现金优惠券</dd>"
					str+="</dl>"
				}
				
			}
			$('#mainpage .quan .havebenefit').append(str)
		}
	});

	
	
})












