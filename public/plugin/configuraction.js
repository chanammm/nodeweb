ym.init = {
	plugin:{
		fn:function(){},
		bool:false,
		loading:`<div class="k-ball7a"></div><div class="k-ball7b"></div><div class="k-ball7c"></div><div class="k-ball7d"></div>`,
		ui:function(){
			return this.arguments;
		}
	},
	XML:function(ent){
		/* 封装ajax函数
			* {string} ent.type http连接的方式，包括POST和GET两种方式
		  	* {string} ent.url 发送请求的url
		  	* {boolean} ent.async 是否为异步请求，true为异步的，false为同步的
		  	* {object} ent.data 发送的参数，格式为对象类型
		  	* {function} ent.success ajax发送并接收成功调用的回调函数
		*/
		ent = ent || {};
		ent.method = ent.method.toUpperCase() || "POST";
		ent.uri = ent.uri || '';
		ent.async = ent.async || true;
		ent.xmldata = ent.xmldata || {};
		ent.success = ent.success || function(){};
		var xml = null, params = [], postData;
		if(window.XMLHttpRequest){
			xml = new XMLHttpRequest();
		}else{
			xml = new ActiveXObject("Microsoft.XMLHTTP");
		};
		for(key in ent.xmldata){
			params.push(key + '=' + ent.xmldata[key]);
		}
		postData = params.join('&');
		if(ent.method.toUpperCase() === "POST"){
			xml.open(ent.method, ent.uri, ent.async);
			xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			xml.send(postData);
		}else if(ent.method.toUpperCase() === "GET"){
			xml.open(ent.method, ent.uri + '?' + postData, ent.async);
			xml.send(null);
		}
		xml.onreadystatechange = function(){
			if(xml.readyState == 4 && xml.status == 200){
				ent.done(JSON.parse(xml.responseText));
			}
		}
	},
	GETURI:function(){
		var req = new RegExp("(^|&)" + arguments[0] + "=([^&]*)(&|$)", "i") ,res = window.location.search.substr(1).match(req);
		if(res != null) return decodeURI(res[2]);
		return null;
	},
	GETRANDOM:function(){
		arguments = arguments[0] || 12;
		var m = "", i = 0; str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for(let i = 0; i < arguments; i++){
			m += str.charAt(Math.floor(Math.random() * str.length));
		}
		return m;
	},
	ERROR:function(){
		var code = {};
		if( typeof arguments[0] === 'function' ){
			code = {
				start:200,
				msg:arguments[0].msg
			}
		}else{
			code = {
				start:400,
				msg:'状态错误'
			}
		}
		return code;
	},
	LOADING:function(){
		switch(typeof arguments[0]){
			case 'object':
				jQuery(arguments[0].tap).html(`<div class="k-ball-holder" style="${arguments[0].style}">${ym.init.plugin.loading}<div style="margin-left:60%;">${arguments[0].select}</div></div>`);  //改变提交的方式
				break;
			default:
				console.log(2);
		}
	},
	getDateTime:function(data)
	{
			var date = new Date(data);   //如果date为10位不需要乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());

			return Y+M+D+h+m+s;
	},
	MBOX:function(){
		if(arguments[0].redom){
			jQuery(arguments[0].redom).html(arguments[0].resetdom.inner);
			jQuery(arguments[0].resetdom.tag).html(arguments[0].resetdom.inner);
		}
		var dom = `<div class="module">${arguments[0].msg}</div>`;
		jQuery('body').append(dom);
		jQuery('.module').css({
			'marginLeft':'-' + jQuery('.module').innerWidth() / 2+ 'px',
			'marginTop':'-' + jQuery('.module').innerWidth() / 2 + 'px',
		})
		setTimeout(function(){
			jQuery('.module').remove();
		},arguments[0].dely);
	},
	COMPILESTR:{
		encryption:function(_e){
			var c = String.fromCharCode(_e.charCodeAt(0) + _e.length);
		    for(var i = 1;i < _e.length; i++){
		        c += String.fromCharCode(_e.charCodeAt(i) + _e.charCodeAt(i - 1));
		    }
		     return escape(c);
		},
		decrypt:function(_e){
			_e = unescape(_e);
		    var c = String.fromCharCode(_e.charCodeAt(0)-_e.length);
		    for(var i=1;i<_e.length;i++){
		        c+=String.fromCharCode(_e.charCodeAt(i)-c.charCodeAt(i-1));
		    }
		    return c;
		}
	},
	_COLUMN:{
			template:function(template){
				const evalExpr = /<%=(.+?)%>/g; //解码
				const expr = /<%([\s\S]+?)%>/g; //解码
				template = template
				.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`') //echo 
				.replace(expr, '`); \n $1 \n  echo(`'); //expr
				
	
				template = 'echo(`' + template + '`);';
				let script =
					`(function parse(data){
			    		let output = "";
			
					    function echo(html){
					      output += html;
					    }
			    		${ template }
			
			    	return output;
			  	})`;
				return script;
			},
			varel:function(_e,column){
				let template = `
					<ul>
					  	<% for(let i = 0; i < data.supplies.length; i++) { %>
						    <% for(let key in data.supplies[i]) { %>
						    	<% if((data.supplies[i][key]).constructor === Object){ %>
										<% for(let o in data.supplies[i][key]){ %>
											<li><%= data.supplies[i][key][o] %></li>
										<% } %>
								<% }else{ %>
									<li><%= data.supplies[i][key] %></li>
								<% } %>
						    <% } %>
					  	<% } %>
						<% if(data.ace){ %>
							<li><%= data.ace %></li>
						<% } %>
					</ul>
				`;
				var parse = eval(ym.init._COLUMN.template(template));
				document.getElementById('ac')
				.innerHTML = parse({
					supplies: _e,
					ace:'ace'
				});
			}
	}
};
function Vercode (params = {}){  //初始对象方法
		let p = Object.assign({
				lineWidth: 0.5,  // 线条宽度
        lineNum: 2,  // 线条数量
        dotNum: 20, // 点的数量
        dotR: 1, // 点的半径
        foregroundColor: [10, 80], // 前景色区间
        backgroundColor: [150, 250], // 背景色区间
        fontSize: 20, // 字体大小
        fontFamily: 'Georgia', // 字体类型
        fontStyle: 'fill', // 字体绘制方法，fill/stroke
        content: 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789', // 验证码因子
        len: 4 // 验证码长度

		},params);
		Object.keys(p).forEach(e => {   //将所有的属性添加到this上
			this[e] = p[e];
		});
		this.canvas = null;  //canvas dom
		this.point = null;  //canvas 2d
}

Vercode.prototype.getColor = function(arr){  //获取随机颜色
	let colors = new Array(3).fill('');  //新建一个长度为3的数组对象 值填充为 ''
	colors = colors.map(v => this.getRand(...arr));	  //随机抽取数组成员组成 新数组
	return colors;
}

Vercode.prototype.getRand = function(...arr){		//获取某个区间的随机数
	arr.sort((a,b) => a - b);	//数组 从小到大
	return Math.floor(Math.random() * (arr[1] - arr[0]) + arr[0]);
}

Vercode.prototype.getText = function(){	//验证码
	var len = this.content.length, str = '';
	for(let i = 0; i < this.len; i++){
		str += this.content[this.getRand(0,len)];
	};
	return str;
}

Vercode.prototype.canLine = function(){	//绘制线条
	for(let i = 0; i < this.lineNum; i++){
		//随机获取线条的起点坐标
		let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height),
				endx = this.getRand(0, this.canvas.width), endy = this.getRand(0, this.canvas.width);
		this.point.beginPath();
		this.point.lineWidth = this.lineWidth;

		//随机获取路径颜色
		let colors = this.getColor(this.foregroundColor);
		this.point.strokeStyle = `rgba(${colors[0]},${colors[1]},${colors[2]},0.8)`;

		//指定绘制路径
		this.point.moveTo(x, y);
		this.point.lineTo(endx, endy);
		this.point.closePath();
		this.point.stroke();
	}
}

//绘制圆点
Vercode.prototype.arc = function(){
	for(let i = 0; i < this.dotNum; i++){
		//获取圆心
		let x = this.getRand(0, this.canvas.width), y = this.getRand(0, this.canvas.height);
		this.point.beginPath();

		//指定圆周
		this.point.arc(x, y, this.dotR, 0, Math.PI * 2, false);
		this.point.closePath();

		//随机路径
		let colors = this.getColor(this.foregroundColor);
		this.point.fillStyle = `rgba(${colors[0]},${colors[1]},${colors[2]},0.8)`;

		this.point.fill();
	}
}

//绘制文字
Vercode.prototype.font = function(){
	let str = this.getText();  //绘制验证码
	this.callback(str); //利用回调函数

	//指定文字风格
	this.point.font = `${this.fontSize}px ${this.fontFamily}`;
	this.point.textBaseline = 'middle'; // 设置文本基线，middle是整个文字所占方框的高度的正中。


	// 指定文字绘制风格
	let fontStyle = `${this.fontStyle}Text`;
	let colorStyle = `${this.fontStyle}Style`;

	for (let i = 0; i < this.len; i++) { // 循环绘制每个字
			let fw = this.point.measureText(str[i]).width; // 获取文字绘制的实际宽度

			// 获取每个字的允许范围，用来确定绘制单个文字的横坐标
			let x = this.getRand(this.canvas.width / this.len * i, (this.canvas.width / this.len) * i + fw/2);

			// 随机获取字体的旋转角度
			let deg = this.getRand(-6, 6);

			// 随机获取文字颜色
			let colors = this.getColor(this.foregroundColor);
			this.point[colorStyle] = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;

			// 开始绘制
			this.point.save();
			this.point.rotate(deg * Math.PI / 180);
			this.point[fontStyle](str[i], x, this.canvas.height / 2);
			this.point.restore();
	}
}

Vercode.prototype.draw = function(dom, callback = function () {}) { // 绘图
	// 获取canvas dom
	if (!this.point) {
			this.canvas = dom;
			// console.log(dom instanceof HTMLElement);
			if (!this.canvas) return;
			this.point = this.canvas.getContext('2d');
			if (!this.point) return;

			// 回调函数赋值给this，方便使用
			this.callback = callback;
			this.canvas.onclick = () => {
					this.drawAgain();
			}
	}

	// 随机画布颜色，使用背景色
	let colors = this.getColor(this.backgroundColor);
	this.point.fillStyle = `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.8)`;

	// 绘制画布
	this.point.fillRect(0, 0, this.canvas.width, this.canvas.height);

	// 绘图
	this.arc();
	this.canLine();
	this.font();
};

Vercode.prototype.clear = function() { // 清空画布
	this.point.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Vercode.prototype.drawAgain = function() { // 更新画布
	this.clear();
	this.draw(this.callback);
};

if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
	module.exports = Vercode;
}

//虚拟DOM
class Elements{
	constructor(type, props, childre){
		this.type = type;
		this.props = props;
		this.childre = childre;
	}
}
function createElementDom(type, props, childre){   //返回新函数
	return new Elements(type, props, childre);
}
function render(dom){	  //虚拟DOM 转换 为DOM
	let dm = document.createElement(dom.type);   //创建名为  type  的元素
	for(let key in dom.props){   //遍历属性对象 设置属性
		setAttre(dm, key, dom.props[key]);
	}

	dom.childre.forEach(chlid => {  //遍历子节点，如果还存在虚拟DOM 继续递归渲染，不然就是文本节点直接渲染
		chlid = (chlid instanceof Elements) ? render(chlid) : document.createTextNode(chlid);
		dm.appendChild(chlid);  //添加到元素内 
	});
	return dm;
}

function setAttre(node, key, value){   //添加属性
	switch(key){
		case 'value':
			if(node.tagName.toLowerCase() == "input" || node.tagName.toLowerCase() == "textarea"){  //输入条件
				node.value = value;
			}else{
				node.setAttribute(key, value);
			};
			break;
		case 'style':
			node.style.cssText = value;  //样式条件
			break;
		default:
			node.setAttribute(key, value);
			break;
	}
}
function renderDom(el, target){   //渲染Dom
	target.appendChild(el);
}




















//<% for(let i=0; i < data.supplies.length; i++) { %>
//					    <% for(let j = 0; j < 12; j++) {%>
//					    	<td><%= data.supplies[i] %></td>
//					    <% } %>
//					  <% } %>


// function Foo () {  //Foo的函数
//     getName = function () { console.log(1) } 
//     return this
//   }
//   Foo.getName = function () { console.log(2) }//静态属性存储了一个匿名函数
  
//   Foo.prototype.getName = function () { console.log(3) } //Foo的原型对象新创建了一个叫getName的匿名函数

//   var getName = function () { console.log(4) } //函数变量表达式

//   function getName () { console.log(5) } //声明一个叫getName函数

// //输入的值
//   	Foo.getName();  //直接访问静态属性
// 	  getName();	//	
//   	Foo().getName(); //
//   	getName();	//	
//   	new Foo.getName();	//
//   	new Foo().getName();
// 		new new Foo().getName();
		

		