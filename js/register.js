$(function(){
	/*============================随机验证码=============================*/
	var Code=$(".Code").val()
	var getphone=$(".txt").val()
	var arr = ['1','0','3','2','4','5','A','B','C','D','E','F','G','K','L','M','N','O','P','Q','R','S','T','U','V','W','I','S','T','6','7','8','9','b','i','d','i','a','n','w','a','i','m','a','i']; 
	$(".codel").click(function(){
		var arr1 = '';
		for(var i = 0;i<4;i++){						
			var o = Math.floor(Math.random()*44);						
			arr1 += arr[o];
		}
		$(".Code").val(arr1)
		/*========================获取验证码遮罩消失=======================*/
		$(".shade_get").hide()
	})
	/*==========================点击注册===========================*/
	$(".btn").click(function(){
		var Code=$(".Code").val()
		var txt=$(".txt").val()
		var pass=$(".pass").val()
		var pass2=$(".pass2").val()
		var phone=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		var passz=/^.{6,}$/;
		/*==========================正则判断============================*/
		if(txt==""){
			$(".oappend").html("请您填写手机号！")
			$(".shade").show().next(".point").show();
		}else if(!phone.test(txt)){
			$(".oappend").html("请您输入正确的手机号！")
			$(".shade").show().next(".point").show();
		}else if(pass==""){
			$(".oappend").html("请您填写密码！")
			$(".shade").show().next(".point").show();
		}else if(!passz.test(pass)){
			$(".oappend").html("至少六位安全密码！")
			$(".shade").show().next(".point").show();
		}else if(pass != pass2){
			$(".oappend").html("您的两次密码不一致！")
			$(".shade").show().next(".point").show();
		}else if(Code==""){
			$(".oappend").html("请您获取验证码！")
			$(".shade").show().next(".point").show();
		}else{
			
			/*==================存储localStorage===================*/
			var jsons = {"name":txt,"pass":pass,"pass2":pass2} 
			localStorage.setItem(txt,JSON.stringify(jsons))
			window.location.href="login.html"
		}	
	})
	/*==================点击返回==================*/
	$(".now").click(function(){
		window.location.href="login.html"
	})
    /*=====================遮罩层消失===================*/
	$(".shade_btn").click(function(){
		$(".shade").hide().next(".point").hide();
	})
})