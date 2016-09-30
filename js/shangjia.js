$(function(){
	var gao_ps = null ;
	var gao_jsuan = 0 ;
	var gao_storage_TT = true ;
	//----------------------Ajax加载商品------------------------------
	
	var gao_shopsid = localStorage.getItem('shopsID')
	
	$.ajax({
		url:"../js/data.json",
		async:false,
		data:{
			
		},
		success:function(msg){
			var str="";//str用于加载右边详情栏
			var str2="";//str2用于加载左边列表栏
			var shuju=msg.data;
			var shopgoodlist=shuju[0].shopgoodlist;
			for(var i in shopgoodlist){
				str+="<div class='shangpin-content-title'>";
				str+="<span class='content-title'>"+shopgoodlist[i].title+"</span>";
				str+="<span class='content-detail'>"+shopgoodlist[i].detail+"</span>";
				str+="</div>";
				str2+="<li>"+shopgoodlist[i].title+"</li>";//str2加载左边列表栏
				var goods=shopgoodlist[i].goods;
				for(var j in goods){
					str+="<dl class='"+goods[j].id+"'>";
					str+="<dt><img src='"+goods[j].img+"'/></dt>";
					str+="<dd class='p'>";
					str+="<p class='id'>"+goods[j].name+"</p>";
					str+="<p>月售"+goods[j].sale+"份</p>";
					str+="<p class='gao_p'><span>￥</span>"+goods[j].price+"</p>";
					str+="</dd>";
					str+="<dd class='btn'><span class='gao_jian iconfont'>&#xe616</span><div class='gao_shul'>0</div><span class='gao_jia iconfont'>&#xe617</span></dd>";
					str+="</dl>";
				}				
			}
			$(".tab-shangpin .shangpin-content .shangpin-content-list").append(str);
			$(".tab-shangpin .shangpin-list ul").append(str2);
			//---------------改变头部(全)信息-----------------------
			var peisong=shuju[0].shopdiscount;
			$(".header .header-logo .header-logo-left img").attr("src",shuju[0].shopimg);
			$(".header .header-logo .header-logo-right .name").html(shuju[0].shopname);
			$(".header .header-logo .header-logo-right .peisong").find("span").eq(0).html(peisong[0].delivery);
			$(".header .header-logo .header-logo-right .peisong").find("span").eq(2).html(peisong[1].arrive);
			$(".header .header-logo .header-logo-right .peisong").find("span").eq(4).html(peisong[3].fee);
			$(".gao_span2").text(peisong[2].startfee)
			gao_ps = peisong[3].fee ;
			gao_jsuan = peisong[6].startfeegao ;
			//---------------改变头部(简)信息-----------------------
			$(".partheader .name").html(shuju[0].shopname);
			//---------------改变商家信息-----------------------
			$(".tab-shangjia .information").find("p").eq(1).find("span").html(shuju[1].spieces);
			$(".tab-shangjia .information").find("p").eq(2).find("span").html(shuju[1].shopaddress);
			$(".tab-shangjia .information").find("p").eq(3).find("span").html(shuju[1].time);
			
			
			//console.log($(".btn"))
			var offset = $('.gao_gwctb1').offset();
			//console.log(offset)
			$(".btn .gao_jia").on('touchend' , function(event){
				//alert()
				var addcar = $(this);
				addcar.siblings().addClass('ani');
				var offsetg = addcar.offset();
				var img = addcar.parent().parent().find('img').attr('src');
				var flyer = $('<img class="u-flyer" src="'+img+'">');
				flyer.fly({
					start: {
						left: offsetg.left, //开始位置（必填）#fly元素会被设置成position: fixed
						top: offsetg.top //开始位置（必填）
					},
					end: {
						left: offset.left+10, //结束位置（必填）
						top: offset.top+100, //结束位置（必填）
						width: 0, //结束时宽度
						height: 0, //结束时高度
					},
					onEnd: function(){ //结束回调
						$('.gao_gwctb').css({'background':'#3190e8'})
						$('.gao_gwctb').animate({'width':'2.9rem','height':'2.9rem','margin-top':'-0.2rem','margin-left':'-0.2rem'},20,function(){
						$('.gao_gwctb').animate({'width':'2.5rem','height':'2.5rem','margin-top':'0','margin-left':'0'},20)	
						})
						$('.gao_gwctb1 .iconfont').css({'color':'#fff'})
						this.destory(); //移除dom
					}
				});
			});
		}
	});
	
	var mySwiperto = new Swiper ('.btn', {})      
	//----------------------选项卡------------------------------

	$(".sort .shangpin").click(function(){//点击商品
		$(".sort .shangpin span").css("border-bottom","3px solid #3190e8");
		$(".sort .shangpin span").css("border-radius","0.1rem");
		$(".sort .shangpin span").css("color","#3190e8");
		
		$(".sort .shangjia span").css("border-bottom","0");
		$(".sort .shangjia span").css("border-radius","0");
		$(".sort .shangjia span").css("color","#363636");
		$(".swiper-container .swiper-wrapper").attr("style","transition-duration:0ms;transform: translate3d(0, 0, 0);");
		$(".swiper-container .swiper-wrapper .swiper-slide").toggleClass("swiper-slide-active");
		$(".swiper-container .swiper-wrapper .swiper-slide").toggleClass("swiper-slide-next");
	})
	
	$(".sort .shangjia").click(function(){//点击商家
		$(".sort .shangjia span").css("border-bottom","4px solid #3190e8");
		$(".sort .shangjia span").css("border-radius","0.1rem");
		$(".sort .shangjia span").css("color","#3190e8");
		
		$(".sort .shangpin span").css("border-bottom","0");
		$(".sort .shangpin span").css("border-radius","0");
		$(".sort .shangpin span").css("color","#363636");
		$(".swiper-container .swiper-wrapper").attr("style","transition-duration:0ms;transform: translate3d(-16rem, 0, 0);");
		$(".swiper-container .swiper-wrapper .swiper-slide").toggleClass("swiper-slide-active");
		$(".swiper-container .swiper-wrapper .swiper-slide").toggleClass("swiper-slide-next");
	})
	
	var mySwiper = new Swiper ('.swiper-container', {})//商品 商家横向滑屏
	
	
	//-----------------------竖屏滑动--------------------------
	var Documentheight = $(document).height()
	//console.log(Documentheight)
	var Ulheight = $('.shangpin-list ul').height()
	//console.log(Ulheight)
	var Toheight = $('.partheader').height()
	//console.log(Toheight)
	var Soheight = $('.sort').height()
	//console.log(Soheight)
	var DDheight =Ulheight - (Documentheight - Toheight - Soheight) + 100
	//console.log(DDheight)
	var Ulheight = $('.shangpin-list ul').height(DDheight)
	var myiscoll = new IScroll('.shangpin-list' , {})
	

	var Ullheight = $('.shangpin-content ul').height()
	//console.log(Ullheight)
	var Toheight = $('.partheader').height()
	//console.log(Toheight)
	var Soheight = $('.sort').height()
	//console.log(Soheight)
	var DDDheight =Ullheight - (Documentheight - Toheight - Soheight) + 100
	//console.log(DDDheight)
	var Ullheight = $('.shangpin-content ul').height(DDDheight)
	var myiscoll1 = new IScroll('.shangpin-content' , {})
	
	
	var Tabheight = $('.tab-shangjia').height()
	//console.log(Tabheight)
	var Toheight = $('.partheader').height()
	//console.log(Toheight)
	var Soheight = $('.sort').height()
	//console.log(Soheight)
	var DDDDheight =Tabheight - (Documentheight - Toheight - Soheight) + 50
	//console.log(DDDDheight)
	var Tabheight = $('.tab-shangjiarr').height(DDDDheight)
	var myiscoll2 = new IScroll('.tab-shangjiarr' , {})
	
	
	
	/*计算*/
	//加
	
	//赋值
	var gao_i = Number($('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text())
	var gao_span4 = Number($('.gao_gwc .gao_dilan .gao_span1 .gao_span4').text())
	if (gao_i == 0) {
		$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').css('opacity' , '0')
	}
	
	
	$(".btn .gao_jia").on('touchend' , function(){
		var num = $(this).parent().find('.gao_shul').text() ;
		$(this).siblings().removeClass('Gani').addClass('ani')
		num ++ ;
		$(this).parent().find('.gao_shul').text(num) ;
		
		var gao_i_T = Number($('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text())
		//console.log(gao_i_T)
		
		gao_i ++ 
		//console.log(gao_i)
		//赋值
		$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text(gao_i)
		
		if (gao_i != 0) {
			$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').css('opacity' , '1')
		}
		
		//赋值价格
		var gao_gs =Number($(this).parents("dl").find('.gao_shul ').text())
		var gao_jg =Number($(this).parents("dl").find('.gao_p').text().replace("￥" , ''))
		var gao_zjg =Number($('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text())
		//console.log(gao_zjg)
		
		//console.log(gao_jg)
		
		gao_span4 = gao_gs * gao_jg ;
		var gaop = gao_zjg - gao_span4 + gao_jg ;
		var gaopT = gao_i - gao_i_T ;
		//console.log(gaopT)
		var gaopd = gaop + gao_span4 + gaopT ;
		//console.log(gao_span4)
		$('.gao_gwc .gao_dilan .gao_span1').html("<span>￥</span><span class='gao_span4'>"+gao_ps+"</span>")
		$('.gao_gwc .gao_dilan .gao_span1').css('color' , '#fff')
		$('.gao_gwc .gao_dilan .gao_span1').html("<span>￥</span><span class='gao_span4'><span class='gao'>"+gaopd+"</span><span class='gao_span3'> / "+gao_ps+"</span></span>")
		$('.gao_gwc .gao_dilan .gao_span1 span').css({"display": "inline"})
		
		//赋值价格去结算
		var gao_bb = $('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text()
		//console.log(gao_bb)
		if(gao_jsuan - gao_bb <= 0) {
			//console.log(gao_jsuan)
			$('.gao_gwc .gao_dilan .gao_span2').html('去结算')
			$('.gao_gwc .gao_dilan .gao_span2').css({'background':'#ffc107' , 'color':'#fff'})
		}else {
			var gaochao = gao_jsuan - gao_bb ;
			$('.gao_gwc .gao_dilan .gao_span2').html('还需￥'+gaochao+'起送')
		}
		
		
		//localStorage加载
		
		var data = new Object ;
		
		data.name = $(this).parents('dl').find('.id').text() ;
		data.id = $(this).parents('dl').attr('class') ;
		data.jiaqian = gao_jg ;
		data.gshu = $(this).prev().text() ;
		
		//console.log(data) ;
		var str = JSON.stringify(data) ;
		//stringify(data) json对象的stringify（）方法转换为json格式文本数据
		localStorage.setItem(data.name , str) ;
		//alert("数据一记录！") ;
		
		gao_storage_TT = true ;
		
		$('.gao_gwc .gao_gwcsq').animate({'bottom':'-15rem'},500)
				
	})
	//减
	$(".btn .gao_jian ").on('touchend' , function(){
		var num = $(this).parent().find('.gao_shul').text() ;
		num -- ;
		if (num <= 0) {
			num = 0 ;
			$(this).removeClass('ani').addClass('Gani')
			$(this).next().removeClass('ani').addClass('Gani')
		}
		$(this).parent().find('.gao_shul').text(num) ;
		
		var gao_i_T = Number($('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text())
		//console.log(gao_i_T)
		
		gao_i -- 
		if(gao_i <= 0) {
			gao_i = 0
		}
		//console.log(gao_i)
		//赋值
		$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text(gao_i)
		
		//赋值价格
		var gao_gs =Number($(this).parents("dl").find('.gao_shul ').text())
		var gao_jg =Number($(this).parents("dl").find('.gao_p').text().replace("￥" , '')) 
		var gao_zjg =Number($('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text())
		//console.log(gao_zjg)
		//console.log(gao_jg)
		
		gao_span4 = gao_gs * gao_jg
		//console.log(gao_span4)
		var gaop = gao_zjg - gao_span4 - gao_jg ;
		var gaopT = gao_i - gao_i_T ;
		//console.log(gaopT)
		var gaopd = gaop + gao_span4 + gaopT ;
		//console.log(gao_ps)
		$('.gao_gwc .gao_dilan .gao_span1').html("<span>￥</span><span class='gao_span4'><span class='gao'>"+gaopd+"</span><span class='gao_span3'> / "+gao_ps+"</span></span>")
		$('.gao_gwc .gao_dilan .gao_span1 span').css({"display": "inline"})
		
		
		if (gao_i == 0) {
			$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').css('opacity' , '0')
			$('.gao_gwc .gao_dilan .gao_gwctb').css('background' , '#333')
			$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 .iconfont').css('color' , '#66676a')
			$('.gao_gwc .gao_dilan .gao_span1').css('color' , '#a2a2a3')
			$('.gao_gwc .gao_dilan .gao_span1').html("<span>￥</span><span class='gao_span4'>"+gao_span4+"</span>")
			if (gao_TT == false) {
				$('.gao_gwc .gao_gwcsq').animate({'bottom':'-15rem'},500)
				gao_TT = true
			}
		}
		
		//赋值价格去结算
		var gao_bb = $('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text()
		//console.log(gao_bb)
		if(gao_jsuan - gao_bb <= 0) {
			$('.gao_span2').html('去结算')
			$('.gao_span2').css({'background':'#ffc107' , 'color':'#fff'})
		}else {
			var gaochao = gao_jsuan - gao_bb ;
			if(gao_bb <= 0) {
				$('.gao_span2').html(gao_jsuan + '元起送')
			}else {
				$('.gao_span2').html('还需￥'+gaochao+'起送')
				$('.gao_span2').css({'background':'#535356' , 'color':'#a2a2a3'})
			}
		}
		
		
		//localStorage加载
		
		var data = new Object ;
		
		data.name = $(this).parents('dl').find('.id').text() ;
		data.id = $(this).parents('dl').attr('class') ;
		data.jiaqian = gao_jg ;
		data.gshu = $(this).next().text() ;
		
		//console.log(data) ;
		var str = JSON.stringify(data) ;
		//stringify(data) json对象的stringify（）方法转换为json格式文本数据
		localStorage.setItem(data.name , str) ;
		//alert("数据一记录！") ;
		
		gao_storage_TT = true ;
		
		$('.gao_gwc .gao_gwcsq').animate({'bottom':'-15rem'},500)
		
		//删除localstorage
		var gao_biaoyin = $(this).parents('dl').find('.id').text()
		//console.log(gao_biaoyin)
		var gao_biaoyin1 = $(this).parents('dl').find('.gao_shul').text()
		//console.log(gao_biaoyin1)
		if (gao_biaoyin1 < 1){
			localStorage.removeItem(gao_biaoyin)
		}
	})
	
	

	//购物车点击
	var gao_TT = true ;
	
	$('.gao_dilan').on('touchend' , function(){
		if(gao_i > 0) {
			if(gao_TT == true) {
				$('.gao_gwc .gao_gwcsq').animate({'bottom':'2.4rem'},500)	
				gao_TT = false ;
				//console.log(gao_TT)
				if(gao_storage_TT == true){
					var gao_storage = window.localStorage;
					//console.log(gao_storage)
					
					var gao_csuju = null ;
					
					var reg=/^[\u4E00-\u9FA5]+$/
					
				 	for(var i=0;i<gao_storage.length;i++){
				  	//key(i)获得相应的键，再用getItem()方法获得对应的值
				  		var Gc_storage = gao_storage.key(i);
				  		//console.log(Gc_storage)
				  		
				  		//console.log(reg.test(Gc_storage))
				  		if (reg.test(Gc_storage) == true){
					  		var str = localStorage.getItem(Gc_storage) ;
					  		
					  		var data = JSON.parse(str) ;

					  		var gao_data = '￥' + data.jiaqian * data.gshu
					  		
					  		var result ='<div class="gao_zjian '+data.id+'">'
					  		result +='<div class="gao_shju">'
					        result +='<div class="gao_sping">'+data.name+'</div>'		
					        result +='<div class="gao_jig">'+gao_data+'</div>'		
					        result +='<div class="gao_gsu">'		
					        result +='<span class="gao_jian iconfont">&#xe616</span>'			
					        result +='<div class="gao_shul">'+data.gshu+'</div>'			
					        result +='<span class="gao_jia iconfont">&#xe617</span>'				
					        result +='</div>'		
					        result +='</div>'
					        result +='</div>'
					  		
					  		gao_csuju += result ;
				  		}
				  		
				 	}
				 	$('.gao_gwc .gao_gwcsq .gao_zjian2 .gao_jqian span').text(gao_i) ;
				 	$('.gao_diaor').html(gao_csuju.replace('null' , '')) ;
				 	gao_storage_TT = false ;
				 	
				 	//弹窗加减
					$('.gao_zjian .gao_gsu .gao_jia ').on('touchend' , function(){
						var gao_zjg =Number($('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text())
						//console.log(gao_zjg)
						var gao_prev =Number($(this).prev().text())
						//console.log(gao_prev)
						gao_i ++ 
						var gsu_jia = $(this).prev().text() ;
						//console.log(gsu_jia)
						$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text(gao_i)
						$('.gao_gwc .gao_gwcsq .gao_zjian2 .gao_jqian span').text(gao_i)
						gsu_jia ++
						$(this).prev().text(gsu_jia)
						var gsu_sping = $(this).parents('.gao_zjian').find('.gao_sping').text()
						var str = localStorage.getItem(gsu_sping) ;
				  		var data = JSON.parse(str) ;
				  		
				  		var gao_data = '￥' + data.jiaqian * gsu_jia
				  		$(this).parents('.gao_zjian').find('.gao_jig').text(gao_data)
				  		
				  		var data = new Object ;
		
						data.name = $(this).parents('.gao_zjian').find('.gao_sping').text() ;
						data.id = $(this).parents('.gao_zjian').attr('class').replace('gao_zjian ' , '')
						data.jiaqian = $(this).parents('.gao_zjian').find('.gao_jig').text().replace('￥' , '') / $(this).prev().text() ;
						data.gshu = $(this).prev().text() ;
						
						//console.log(data) ;
						var str = JSON.stringify(data) ;
						//stringify(data) json对象的stringify（）方法转换为json格式文本数据
						localStorage.setItem(data.name , str) ;
						//alert("数据一记录！") ;
						
						var gao_prev1 =Number($(this).prev().text())
						//console.log(gao_prev1)
						var gao_pre = gao_prev1 - gao_prev
						//console.log(gao_pre)
						var gao_dia = $(this).parents('.gao_zjian').find('.gao_jig').text().replace('￥' , '') / $(this).prev().text() ;
						//console.log(gao_dia)
						var gao_bb = gao_zjg + (gao_dia * gao_pre) + gao_pre
						
						$('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text(gao_bb)
						
						
						var gao_let = gao_jsuan - gao_bb
						if(gao_let <= 0){
							$('.gao_gwc .gao_dilan .gao_span2').text('去结算')
							$('.gao_gwc .gao_dilan .gao_span2').css('background' , '#FFC107')
						}else {
							$('.gao_gwc .gao_dilan .gao_span2').text('还需￥'+gao_let+'起送')
							$('.gao_gwc .gao_dilan .gao_span2').css('background' , '#535356')	
						}
						
						
						//页面跟随
						/*gsu_sping
						gao_prev1*/
						var gao_data_id = $(this).parents('.gao_zjian').attr('class').replace('gao_zjian ' , '')
						var gao_dl_id = $('dl[class="'+gao_data_id+'"]')
						
						//console.log(gao_dl_id.find('.id').text())
						gao_dl_id.find('.gao_shul').text(gao_prev1)
						
					})
					
					
					
					$('.gao_zjian .gao_gsu .gao_jian').on('touchend' , function(){
						var gao_zjg =Number($('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text())
						//console.log(gao_zjg)
						var gao_next =Number($(this).next().text())
						//console.log(gao_next)
						gao_i -- 
						if(gao_i <= 0){
							gao_i = 0
						}
						var gsu_jia = $(this).next().text() ;
						//console.log(gsu_jia)
						$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text(gao_i)
						$('.gao_gwc .gao_gwcsq .gao_zjian2 .gao_jqian span').text(gao_i)
						gsu_jia --
						if(gsu_jia <= 0){
							gsu_jia = 0
							var gao_biaoyin = $(this).parents('.gao_zjian').find('.gao_sping').text()
							$(this).parents('.gao_zjian').detach()
							localStorage.removeItem(gao_biaoyin)
							
							var gao_data_id = $(this).parents('.gao_zjian').attr('class').replace('gao_zjian ' , '')
							var gao_dl_id = $('dl[class="'+gao_data_id+'"]')
							
							//console.log(gao_dl_id)

							gao_dl_id.find('.gao_shul').text(0)
							gao_dl_id.find('.gao_shul').removeClass('ani').addClass('Gani')
							gao_dl_id.find('.gao_shul').prev().removeClass('ani').addClass('Gani')
							
							var gao_zjg =Number($('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text())
							var gao_dia = $(this).parents('.gao_zjian').find('.gao_jig').text().replace('￥' , '') / $(this).next().text() ;
							var gao_bb = gao_zjg - gao_dia - 1
							//console.log(gao_bb)
							
							if(gao_bb <= 0){
								$('.gao_gwc .gao_dilan .gao_span2').text('￥'+gao_jsuan+'起送')
								$('.gao_gwc .gao_dilan .gao_span2').css({'background' : '#535356' , 'color' : '#a2a2a3'})
							}
							
							$('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text(gao_bb)
							if($('.gao_diaor').html() == ''){
								$('.gao_gwc .gao_gwcsq').animate({'bottom':'-15rem'},500)
								$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').css('opacity' , '0')
								$('.gao_gwc .gao_dilan .gao_gwctb').css('background' , '#333')
								$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 span').css('color' , '#66676a')
								$('.gao_gwc .gao_dilan .gao_span2').css({'background' : '#535356' , 'color' : '#a2a2a3'})
								localStorage.clear()
							}
						}else {
							$(this).next().text(gsu_jia)
							var gsu_sping = $(this).parents('.gao_zjian').find('.gao_sping').text()
							var str = localStorage.getItem(gsu_sping) ;
					  		var data = JSON.parse(str) ;
					  		
					  		var gao_data = '￥' + data.jiaqian * gsu_jia
					  		$(this).parents('.gao_zjian').find('.gao_jig').text(gao_data)
					  		
					  		
					  		var data = new Object ;
			
							data.name = $(this).parents('.gao_zjian').find('.gao_sping').text() ;
							data.id = $(this).parents('.gao_zjian').attr('class').replace('gao_zjian ' , '')
							data.jiaqian = $(this).parents('.gao_zjian').find('.gao_jig').text().replace('￥' , '') / $(this).next().text() ;
							data.gshu = $(this).next().text() ;
							
							//console.log(data) ;
							var str = JSON.stringify(data) ;
							//stringify(data) json对象的stringify（）方法转换为json格式文本数据
							localStorage.setItem(data.name , str) ;
							//alert("数据一记录！") ;
							
							
							var gao_next1 =Number($(this).next().text())
							//console.log(gao_next1)
							var gao_nex = gao_next1 - gao_next
							//console.log(gao_nex)
							var gao_dia = $(this).parents('.gao_zjian').find('.gao_jig').text().replace('￥' , '') / $(this).next().text() ;
							//console.log(gao_dia)
							var gao_bb = gao_zjg + (gao_dia * gao_nex) + gao_nex
							//console.log(gao_bb)
							$('.gao_gwc .gao_dilan .gao_span1 .gao_span4 .gao').text(gao_bb)
							
							var gao_let = gao_jsuan - gao_bb
							
							if(gao_bb >= 120){
								$('.gao_gwc .gao_dilan .gao_span2').text('去结算')
								$('.gao_gwc .gao_dilan .gao_span2').css({'background' : '#FFC107' , 'color' : '#fff'})
							}else {
								$('.gao_gwc .gao_dilan .gao_span2').text('还需￥'+gao_let+'起送')
								$('.gao_gwc .gao_dilan .gao_span2').css({'background' : '#535356' , 'color' : '#a2a2a3'})
							}
							
							//页面跟随
							/*gsu_sping
							gao_next1*/

							var gao_data_id = $(this).parents('.gao_zjian').attr('class').replace('gao_zjian ' , '')
							var gao_dl_id = $('dl[class="'+gao_data_id+'"]')
							
							//console.log(gao_dl_id)

							gao_dl_id.find('.gao_shul').text(gao_next1)

						}
					})
					
					//清空
					$('.gao_tou .gao_tou_span').on('touchend' , function(){
						gao_i = 0
						$('.gao_gwc .gao_gwcsq').animate({'bottom':'-15rem'},500)
						$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text("0")
						$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').css('opacity' , '0')
						$('.gao_gwc .gao_dilan .gao_gwctb').css('background' , '#333')
						$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 span').css('color' , '#66676a')
						$('.gao_gwc .gao_dilan .gao_span2').css({'background' : '#535356' , 'color' : '#a2a2a3'})
						$('.gao_gwc .gao_dilan .gao_span1').html('<span>￥</span><span class="gao_span4">0</span>')
						$('.gao_gwc .gao_dilan .gao_span1').css('color' , '#a2a2a3')
						
						
						var gao_storage = window.localStorage;
						//console.log(gao_storage)
						var gs_gsu = null ;
						//console.log(gao_storage.length)
						
						var reg=/^[\u4E00-\u9FA5]+$/
						
					 	for(var i=0;i<gao_storage.length;i++){
					  	//key(i)获得相应的键，再用getItem()方法获得对应的值
					  		var Gc_storage = gao_storage.key(i);
					  		
					  		//console.log(Gc_storage)
					  		//console.log(reg.test(Gc_storage))
					  		
					  		if(reg.test(Gc_storage)){
								//console.log(1)
					  			//console.log(Gc_storage)
					  			gs_gsu += Gc_storage + ":"
					  			
					  			var str = localStorage.getItem(Gc_storage) ;
						  		var data = JSON.parse(str) ;

						  		var gao_data = data.id
						  		//console.log(gao_data)
						  		
						  		var gao_dl_id = $('dl[class="'+gao_data+'"]')
						  		
						  		gao_dl_id.find('.gao_shul').text(0)
						  		
						  		gao_dl_id.find('.gao_jian').removeClass('ani').addClass('Gani')
						  		gao_dl_id.find('.gao_shul').removeClass('ani').addClass('Gani')	
						  	}
					 	}
					 	var gs_gsu1 = gs_gsu.replace("null" , "").split(":")
					 	console.log(gs_gsu1)
					 	
					 	for(var i=0 ; i < gs_gsu1.length ; i ++){
					 		var mlgb = gs_gsu1[i]
					 		localStorage.removeItem(mlgb)
					 	}
						/*localStorage.removeItem(gs_gsu)*/
					})
				}
			}else {
				$('.gao_gwc .gao_gwcsq').animate({'bottom':'-15rem'},500)
				gao_TT = true ;
				//console.log(gao_TT)
			}
		}
	})
	
	$('.gao_span2').on('touchend' , function(){
		var gao_qjs = $(this).text()
		//console.log(gao_qjs)
		if(gao_qjs == '去结算'){
			alert("没有登录！请注册")
			var a = localStorage.getItem('true')
			if(a){
				var add = localStorage.getItem('address')
				if (add){
					window.location.href = 'confirm.html'
				}else {
					alert("请填写详细收货地址！")
					window.location.href = 'address.html'
				}
			}else {
				window.location.href = 'register.html'
			}
			
		}
	})
	
	
	$('.partheader .icon1').on('touchend' , function(){
		window.location.href = 'bidian.html'
	})
	
	/*
	//自运行读取数据
	function Autosju () {
		var gao_storage = window.localStorage;
		//console.log(gao_storage)
		
		var gao_csuju = null ;
		
		var gao_qu = null ;
		
		var gao_ll = 0 ;
		var gao_ll1 = 0 ;
		
		var reg=/^[\u4E00-\u9FA5]+$/
		
	 	for(var i=0;i<gao_storage.length;i++){
	  	//key(i)获得相应的键，再用getItem()方法获得对应的值
	  		var Gc_storage = gao_storage.key(i);
	  		//console.log(Gc_storage)
	  		
	  		//console.log(reg.test(Gc_storage))
	  		if (reg.test(Gc_storage) == true){
		  		var str = localStorage.getItem(Gc_storage) ;
		  		
		  		var data = JSON.parse(str) ;
	
				gao_ll += Number(data.gshu)
				
				gao_qu += data.name + '：'
	
		  		var gao_data = '￥' + data.jiaqian * data.gshu
		  		
		  		var result ='<div class="gao_zjian '+data.id+'">'
		  		result +='<div class="gao_shju">'
		        result +='<div class="gao_sping">'+data.name+'</div>'		
		        result +='<div class="gao_jig">'+gao_data+'</div>'		
		        result +='<div class="gao_gsu">'		
		        result +='<span class="gao_jian iconfont">&#xe616</span>'			
		        result +='<div class="gao_shul">'+data.gshu+'</div>'			
		        result +='<span class="gao_jia iconfont">&#xe617</span>'				
		        result +='</div>'		
		        result +='</div>'
		        result +='</div>'
		  		
		  		gao_csuju += result ;
		  		
		  		
		  		var AABB = $('dl[class="'+data.id+'"]')
		  		AABB.find('.gao_jian').addClass('ani')
		  		AABB.find('.gao_shul').addClass('ani')
		  		AABB.find('.gao_shul').text(data.gshu)
		  		
		  		gao_ll1 += data.gshu * data.jiaqian
	  		}
	  		
	 	}
	 	$('.gao_gwc .gao_gwcsq .gao_zjian2 .gao_jqian span').text(gao_i) ;
	 	
	 	$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').text(gao_ll) ;
	 	
	 	$('.gao_diaor').html(gao_csuju.replace('null' , '')) ;
	 	console.log(gao_ll)
	 	if(gao_ll > 0){
	 		$('.gao_gwc .gao_dilan .gao_gwctb .gao_gwctb1 p').css('opacity' , '1') ;
	 		<span>￥</span><span class="gao_span4"><span class="gao"></span><span class="gao_span3"> / 配送费￥33</span></span>
	 	}

	}
	
	Autosju()
	*/
})