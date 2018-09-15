var jzm = {};
TouchSlide({
  slideCell:"#c-banner",
  mainCell:".bd ul",
  effect:"leftLoop",
  autoPlay:true,
  });
  
TouchSlide({
  slideCell:"#c-carhot",
  mainCell:".bd ul",
  effect:"leftLoop",
  autoPlay:false,
 });
jzm.search_list = function(e){
	e = location.href.split('=')[1].replace(/[^0-9]/ig,'');
	var $this = [],li = document.createElement('li'),num,bodyModule = '<div class="module" style="height:'+ document.documentElement.scrollHeight +'px"></div>';
	for(let i = 0; i < e; i ++){
		$this.push(i);
	}
	if($this.length % 10 == 0){
		num = $this.length / 10;
		$('.c-container-content ul').append(li*num);
	}else{
		num = parseInt($this.length / 10) + 1;
	}
	//click action
	$("#c-tor").bind('click',function(e){
		$('.module').remove();
		$(".c-garage-stor").attr('data-bool') == "true" ? $(".c-garage-stor").stop().slideUp(100).attr('data-bool','false') : 
		void function(){
			$(".c-garage-stor").stop().slideDown(100).attr('data-bool','true').siblings('div.c-garage-screen').stop().slideUp(100).attr('data-bool','false');
			$('body').append(bodyModule);
		}();
	});
	$("#c-screen").bind('click',function(e){
		$('.module').remove();
		$(".c-garage-screen").attr('data-bool') == "true" ? $(".c-garage-screen").stop().slideUp(100).attr('data-bool','false') : 
		void function(){
			$(".c-garage-screen").stop().slideDown(100).attr('data-bool','true').siblings('div.c-garage-stor').stop().slideUp(100).attr('data-bool','false');
			$('body').append(bodyModule);
		}();
	});
	$('body').delegate('div.module','click',function(){
		$(this).remove();
		$('.c-garage-screen,.c-garage-stor').slideUp(100).attr('data-bool','false');
	});
	TouchSlide({slideCell:"#c-active-btn",mainCell:"ul",effect:"left",autoPlay:false});
};
new RegExp(location.pathname).test(/\/public\/car_garage.htm/) ? jzm.search_list() : null;
