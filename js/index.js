// JavaScript Document
window.onload=function(){
	var oBox=document.querySelector('ul');
	var aLi=document.querySelectorAll('ul li');
	var len=aLi.length;
	for(var i=0;i<len;i++){
		aLi[i].style.WebkitTransition = '1s all ease '+(len-i)*300+'ms';
		aLi[i].style.MozTransition = '1s all ease '+(len-i)*300+'ms';
		(function(index){
			setTimeout(function(){
				aLi[index].style.WebkitTransform = 'rotateY('+360/len*index+'deg) translateZ(350px)';
				aLi[index].style.MozTransform = 'rotateY('+360/len*index+'deg) translateZ(350px)';
			},0);
		})(i);		
	}
	//拖
	var iSpeedX = 0;
	var iSpeedY = 0;
	var lastX = 0;
	var lastY = 0;
	var x = 0;
	var y = 0;
	var timer = null;
	document.onmousedown=function(ev){
		clearInterval(timer);
		var disX = ev.pageX-y;
		var disY = ev.pageY-x;
		document.onmousemove=function(ev){
			x = ev.pageY-disY;
			y = ev.pageX-disX;
			oBox.style.WebkitTransform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
			oBox.style.MozTransform='perspective(800px) rotateX('+-x/5+'deg)   rotateY('+y/5+'deg)';
			iSpeedX = ev.pageX-lastX;
			iSpeedY = ev.pageY-lastY;
			lastX = ev.pageX;
			lastY = ev.pageY;
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			//iSpeedX 		y
			//iSpeedY 		x
			timer = setInterval(function(){
				iSpeedX*=0.95;
				iSpeedY*=0.95;
				y+=iSpeedX;
				x+=iSpeedY;
				oBox.style.WebkitTransform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.MozTransform='perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				if(Math.abs(iSpeedX)<1)iSpeedX=0;
				if(Math.abs(iSpeedY)<1)iSpeedY=0;
				if(iSpeedX==0&&iSpeedY==0){
					clearInterval(timer);
				}
			},30);
		};
		return false;
	};
};