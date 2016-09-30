

			window.onload = function () {
				//鼠标跟随
				var oBox1 = document.getElementById('box1') ;
				var oDiv = oBox1.getElementsByTagName('div') ;
				var oBox_span = oBox1.getElementsByClassName('box1_span')[0] ;
				
				for ( var i = 0; i < oDiv.length; i ++ ) {
					
					oDiv[i].addEventListener("touchend", function(){
						//给oDiv[i]绑定touchend（手机点击事件）事件
						oBox_span.style.left = this.offsetLeft + 'px' ;
						//console.log(this.offsetLeft)
					})
				}
				
				
		 	/* 长宽占位 rem算法, 根据root的rem来计算各元素相对rem, 默认html 320/20 = 16px */
		 	function placeholderPic(){
		  		var w = document.documentElement.offsetWidth ;
		  		document.documentElement.style.fontSize= w / 20 + 'px' ;
		 	}
				placeholderPic();
		 	window.onresize = function(){
		  		placeholderPic();
		 	}				
			}
			
			
			$(function(){
				$("#btn").on("click",function(){
					var name = $("#content").find("input").eq(0).val();
					var pass = $("#content").find("input").eq(1).val();
					$.ajax({
						url:"http://datainfo.duapp.com/shopdata/userinfo.php",
						data:{
							status:"register",
							userID:name,
							password:pass
						},
						success:function(data){
							if(data==1){
								alert("sucess");
								window.location.href="detail.html"
							}else if(data==2){
								alert("faild");
							}else if(data==0){
								alert("重名");
							}
						}
						
					})
					
				})
			})
