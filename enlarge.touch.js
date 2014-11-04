/*
    enlarge.touch.js
    by AbelYao, USKY.ORG
*/
(function(window, undefined)
{
    var events = ["touchstart", "touchmove", "touchend"];
    
    window.enlarge = function(id, width, height)
    {
        var self = document.getElementById(id);
        var img = self.getElementsByTagName("img")[0];
        
        var ratio =
        {
            x: img.width / (width - img.width),
            y: img.height / (height - img.height)
        }
        
        self.style.overflow = "hidden";
        self.style.position = "relative";
        
        self.innerHTML += "<img src=\"" + self.href + "\">";
        var large = self.getElementsByTagName("img")[1];
        large.style.position = "absolute";
        large.style.left = "0px";
        large.style.top = "0px";
        large.style.width = width + "px";
        large.style.height = height + "px";
        large.style.display = "none";
        
        self.onclick = function(){ return false; };
        
        var move = function(e)
        {
            e.preventDefault();
            
            var x = e.changedTouches[0].pageX - self.offsetLeft;
            var y = e.changedTouches[0].pageY - self.offsetTop;
            
            if(x < 0) x = 0;
            if(y < 0) y = 0;
            if(x > img.width) x = img.width;
            if(y > img.height) y = img.height;
            
            large.style.display = "block";
            large.style.left = (0 - x / ratio.x) + "px";
            large.style.top = (0 - y / ratio.y) + "px";
        }
        
        var hide = function()
        {
            large.style.display = "none";
        }
        
        self.addEventListener(events[0], move);
        self.addEventListener(events[1], move);
        self.addEventListener(events[2], hide);
        large.addEventListener(events[1], move);
        large.addEventListener(events[2], hide);
    }
})(window)
