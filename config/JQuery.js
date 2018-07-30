(function(){
	//jquery 骨架
	//暴露外部适用的一个接口
	var jQuery = window.jQuery = window.$ = function(){};
	//处理原型对象
	jQuery.fn = jQuery.prototype = {};
	//继承的功能
	jQuery.extend = jQuery.fn.extend = function(){};
	
	jQuery.extend({});  //静态方法
	
	jQuery.fn.extend({}); //添加实例对象
	
})();
