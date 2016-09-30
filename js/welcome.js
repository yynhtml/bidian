(function($){
	setTimeout(function(){
		$("#box").hide();
	},3000)
	/*滑动动画*/
	var mySwiper = new Swiper('.swiper-box')
	/*点击事件*/
  	$(".btn").click(function(){
  		window.location.href="html/bidian.html";
  	})
})(Zepto)
