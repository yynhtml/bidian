$(function(){
	/*=============================随机验证码==========================*/
	var Code=$(".Code").val()
	var arr = ['1','0','3','2','4','5','A','B','C','D','E','F','G','K','L','M','N','O','P','Q','R','S','T','U','V','W','I','S','T','6','7','8','9','b','i','d','i','a','n','w','a','i','m','a','i']; 
	$(".codel").click(function(){
		var arr1 = '';
		for(var i = 0;i<4;i++){						
			var o = Math.floor(Math.random()*44);						
			arr1 += arr[o];
		}
		$(".Code").val(arr1)
		/*=======================验证码遮罩层消失=========================*/
		$(".shade_get").hide()
	})
	/*===========================登录验证==============================*/
	$(".btn").click(function(){
//			console.log(localStorage.key(name))
		var Code=$(".Code").val()
//			alert(Code)
		var txt=$(".txt").val()	
		var pass=$(".pass").val()
		var phone=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
//			console.log(JSON.parse(txt))
//			console.log(localStorage.getItem(txt))
//			console.log(JSON.parse(localStorage.getItem(txt)).name)
//			console.log(JSON.parse(localStorage.getItem(txt)).pass)
			/*=======================正则判断=========================*/
			if(txt==""){
				$(".oappend").html("请您填写手机号！")
				$(".shade").show().next(".point").show();
			}else if(!phone.test(txt)){
				$(".oappend").html("手机号格式错误！")
				$(".shade").show().next(".point").show();
			}else if(pass==""){
				$(".oappend").html("请您填写密码！")
				$(".shade").show().next(".point").show();
			}else if(Code==""){
				$(".oappend").html("请您获取验证码！")
				$(".shade").show().next(".point").show();
			}else if(!phone.test(txt)){
				$(".oappend").html("请您输入正确的手机号！")
				$(".shade").show().next(".point").show();
			}else  if(txt != JSON.parse(localStorage.getItem(txt)).name){
				$(".oappend").html("您输入的用户名错误！")
				$(".shade").show().next(".point").show();
			}else if(pass != JSON.parse(localStorage.getItem(txt)).pass){
				$(".oappend").html("您输入的密码错误！")
				$(".shade").show().next(".point").show();
			}else if(txt == JSON.parse(localStorage.getItem(txt)).name && pass ==  JSON.parse(localStorage.getItem(txt)).pass ){
				/*====================存入定值============================*/
				localStorage.setItem("true",JSON.parse(localStorage.getItem(txt)).name)
				window.location.href = "mine.html"
			}
	})
	
	/*=============================点击返回注册页面===========================*/
	$(".now").click(function(){
		window.location.href="register.html"
	})
	/*==============================点击隐藏遮罩层============================*/
	$(".shade_btn").click(function(){
		$(".shade").hide().next(".point").hide();
	})
})

	
	