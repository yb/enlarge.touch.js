/*
	EnlargeTouch.js
	Abel Yao, 2013
	http://www.abelcode.com/
*/

(function(window, undefined)
{
	var events = ["touchstart", "touchmove", "touchend"];
	
	window.enlarge = function(id, width, height)
	{
		var self = document.getElementById(id);
		var img = self.getElementsByTagName("img")[0];
		
		// 计算大小图之间的比例
		var ratio =
		{
			x: img.width / (width - img.width),
			y: img.height / (height - img.height)
		}
		
		// 设置一些样式
		self.style.overflow = "hidden";
		self.style.position = "relative";
		
		// 创建大图节点
		self.innerHTML += "<img src=\"" + self.href + "\">";
		var large = self.getElementsByTagName("img")[1];
		large.style.position = "absolute";
		large.style.left = "0px";
		large.style.top = "0px";
		large.style.width = width + "px";
		large.style.height = height + "px";
		large.style.display = "none";
		
		// 禁用图片点击
		self.onclick = function(){ return false; };
		
		// 移动
		var move = function(e)
		{
			// 禁用页面滚动
			e.preventDefault();
			
			// 获得触摸坐标
			var x = e.changedTouches[0].pageX - self.offsetLeft;
			var y = e.changedTouches[0].pageY - self.offsetTop;
			
			// 保持滑动在有效范围内
			if(x < 0) x = 0;
			if(y < 0) y = 0;
			if(x > img.width) x = img.width;
			if(y > img.height) y = img.height;
			
			// 移动
			large.style.display = "block";
			large.style.left = (0 - x / ratio.x) + "px";
			large.style.top = (0 - y / ratio.y) + "px";
		}
		
		// 隐藏
		var hide = function()
		{
			large.style.display = "none";
		}
		
		// 绑定事件
		self.addEventListener(events[0], move);
		self.addEventListener(events[1], move);
		self.addEventListener(events[2], hide);
		large.addEventListener(events[1], move);
		large.addEventListener(events[2], hide);
	}
})(window)