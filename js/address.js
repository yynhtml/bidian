
//localStorage.setItem('true','aaa')
$(function(){
	if(!localStorage.getItem('true')){//未登录状态
		$('#unlogin').css('display','block').siblings().css('display','none')
	}else{//登录状态
		$('#login').css('display','block').siblings().css('display','none')
		
		
		if(localStorage.getItem('addrsuccess')){//有收货地址的情况下			
			$('#login .have').css('display','block').siblings().css('display','none')
			}else{//没有收获地址的情况下
				$('#login .start').css('display','block').siblings().css('display','none')
				setTimeout(function(){
					$('#login .no').css('display','block').siblings().css('display','none')
				},3000)
				
			}
		
	}
	//添加地址点击进入填写信息页面
	$('#login #footer .add').on('touchend',function(){
		$(".write").css('display','block').siblings().css('display','none')
	})
	
	//未登录状态下的收货地址页按钮跳转到登录页
	$('#unlogin .login').on('touchend',function(){
		window.location.href = 'login.html'
	})
	//返回个人中心
	$('#login .header .return').on('touchend',function(){
		window.location.href = 'mine.html'//点击返回返回到用户中心页
	})
	//填写信息页返回到地址信息页
	$('.write .header .return').on('touchend',function(){
		$(this).parents('.write').css('display','none')
		$(this).parents('body').find('#login').css('display','block')
		if(localStorage.getItem('addrsuccess')){//判断有地址信息			
		$(this).parents('body').find('#login .have').css('display','block').siblings().css('display','none')
		}else{//没有地址信息
			$(this).parents('body').find('#login .no').css('display','block').siblings().css('display','none')
		}		
	})	
/*------------填写收货地址的时候点击加标签的操作-----------*/	
	$('.message .biao').on('touchend',function(){
		$(this).parents('.write').find('.biao_filter .biao_show').addClass('biao_play').removeClass('biao_play1')
		$(this).parents('.write').find('.biao_filter').show()
	})
	$('.biao_filter .cancel').on('touchend',function(){
		$(this).parents('.write').find('.biao_filter .biao_show').addClass('biao_play1').removeClass('biao_play')
		$(this).parents('.write').find('.biao_filter').hide()
	})
	$('.biao_filter .config').on('touchend',function(){
		$(this).parents('.write').find('.biao_filter .biao_show').addClass('biao_play1').removeClass('biao_play')
		$(this).parents('.write').find('.biao_filter').hide()
			var valname = $(this).parents('.write').find("input[name='biao']:checked").siblings().html()
			//console.log(valname)
			var oB = $(this).parents('.write').find('.message .biao b')
			oB.html(valname)
			if(oB.html() == '无'){
				oB.html('')
				oB.css('background','#fff')
			}else if(oB.html() == '家'){
				oB.css('background','orangered')
			}else if(oB.html() == '公司'){
				oB.css('background','dodgerblue')
			}else if(oB.html() == '学校'){
				oB.css('background','#56d176')
			}
	})
/*-----------------表单验证-----------------*/	
var messageflag1 = false
var messageflag2 = false
var messageflag3 = false
var messageflag4 = false
var elestr = ''
//	$('.message .name').blur(function(){
//			var name = $(this).val()
//			if(name == ''){
//				swal('您输入的联系人不能为空')
//				messageflag1 = false
//			}else{
//				messageflag1 = true
//			}
//	})
//	$('.message .phone').blur(function(){
//		var phone = $(this).val()
//		if(phone == ''){
//			swal('您输入的手机号不能为空')
//			messageflag2 = false
//		}else{
//			if(!(/^1[34578]\d{9}$/.test(phone))){
//				swal("手机号码有误，请重填")
//				messageflag2 = false
//			}else{
//				messageflag2 = true
//			}
//		}
//	})
//	$('.message .addr').blur(function(){
//			var addr = $(this).val()
//			if(addr == ''){
//				swal('您输入的地址不能为空')
//				messageflag3 = false
//			}else{
//				messageflag3 = true
//			}
//	})
//	$('.message .detailaddr').blur(function(){
//			var detailaddr = $(this).val()
//			if(detailaddr == ''){
//				swal('请输入详细地址方便我们的配送工作')
//				messageflag4 = false
//			}else{
//				messageflag4 = true
//			}
//	})


//$('.message .addr').focus(function(){
//	window.location.href = 'ditu.html'
//})
//------------alert弹出框的确定按钮
$("#zhez .zhez-close").on('touchend',function(){
	$(this).parents('#zhez').hide()
})
$('.message .name').blur(function(){
			var name = $(this).val()
			if(name == ''){
				$("#zhez").show()
				$("#zhez p").html('您输入的联系人不能为空')
				messageflag1 = false
			}else{
				$("#zhez").hide()
				messageflag1 = true
			}
	})
	$('.message .phone').blur(function(){
		var phone = $(this).val()
		if(phone == ''){
			$("#zhez").show()
			$("#zhez p").html('您输入的手机号不能为空')
			//swal('您输入的手机号不能为空')
			messageflag2 = false
		}else{
			if(!(/^1[34578]\d{9}$/.test(phone))){
				$("#zhez").show()
				$("#zhez p").html('手机号码有误，请重填')
				//swal("手机号码有误，请重填")
				messageflag2 = false
			}else{
				$("#zhez").hide()
				messageflag2 = true
			}
		}
	})
	$('.message .addr').blur(function(){
			var addr = $(this).val()
			if(addr == ''){
				$("#zhez").show()
				$("#zhez p").html('您输入的地址不能为空')
				messageflag3 = false
			}else{
				$("#zhez").hide()
				messageflag3 = true
			}
	})
	$('.message .detailaddr').blur(function(){
			var detailaddr = $(this).val()
			if(detailaddr == ''){
				$("#zhez").show()
				$("#zhez p").html('请输入详细地址方便我们的配送工作')
				messageflag4 = false
			}else{
				$("#zhez").hide()
				messageflag4 = true
			}
	})
	//------------提交地址信息的按钮
	$('.message .submitbtn').on('touchend',function(){	
		if(messageflag1&&messageflag2&&messageflag3&&messageflag4){
		var data = new Object
		data.name = $(this).parent().find('.name').val()
		data.sex = $(this).parent().find('.sexP input[name="sex"]:checked').val()
		data.phone = $(this).parent().find('.phone').val()
		data.biao = $(this).parent().find('.biao b').html()
		data.biaocolor = $(this).parent().find('.biao b').css('background-color')		
		data.address = $(this).parent().find('.detailaddr').val()
		var str = JSON.stringify(data);
		localStorage.setItem("address",str)
		localStorage.setItem('addrsuccess',true)		
		$(this).parents('.write').css('display','none')
		$(this).parents('body').find('#login').css('display','block')
		$(this).parents('body').find('#login .have').css('display','block').siblings().css('display','none')
		var itemdata = localStorage.getItem("address")
		var dataitem = JSON.parse(itemdata)
		//console.log(dataitem.name)
		elestr =
		'<dl>'+
			'<dt class="left">'+
				'<p class="top"><span>'+dataitem.name+'</span><span>'+dataitem.sex+'</span><span>'+dataitem.phone+'</span></p>'+
				'<p class="bot"><b style="background:'+dataitem.biaocolor+'">'+dataitem.biao+'</b><span>'+dataitem.address+'</span></p>'+
			'</dt>'+
			'<dd class="right"></dd>'+
		'</dl>'		
		$(this).parents('body').find('#login .have').append(elestr)
		
		}else if(!messageflag1){
			$("#zhez").show()
			$("#zhez p").html('您输入的联系人不能为空')
		}else if(!messageflag2){
			var phone = $(this).parent().find('.phone').val()
			if(phone == ''){
				$("#zhez").show()
				$("#zhez p").html('您输入的手机号不能为空')
				messageflag2 = false
			}else{
				if(!(/^1[34578]\d{9}$/.test(phone))){
					$("#zhez").show()
					$("#zhez p").html('手机号码有误，请重填')
					messageflag2 = false
				}else{
					messageflag2 = true
				}
			}
		}else if(!messageflag3){
			$("#zhez").show()
			$("#zhez p").html('您输入的地址不能为空')
		}else if(!messageflag4){
			$("#zhez").show()
			$("#zhez p").html('请输入详细地址方便我们的配送工作')
		}
	})	
//$('.have').on('click','dl dd',function(){
//	$(this).parents('.write').css('display','block').siblings().css('display','none')
//})	
	
	
	
	
	//取出存地址的cookie放入页面
	//if(localStorage.getItem('addrsuccess')){
		
		
	//}
		
	
	
	
})
