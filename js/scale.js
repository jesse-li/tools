/*这种设计模式下，移动端需要使用meta来缩放，web端需要使用zoom来缩放
			 	 页面所有元素都必须按照设计图的尺寸来固定
			  web端的缩放比例，预计的显示宽度/设计图的宽度
			  android 4.4以下对viewport缩放支持不太好，使用zoom配合target-densitydpi=device-dpi来缩放
			  	魅族手机使用viewport缩放有点问题,需要使用上面的方法处理
			  	
			  	手机旋转时，android系浏览器和safari获取视窗的不同
			  	
			  	假如android和safari的size都是320*640
			  	
			  	在竖屏模式下   window.screen.width  window.screen.height
			  	android  320                  640
			  	safari   320                  640
			  	
			  	在横屏模式下   window.screen.width  window.screen.height
			  	android  640                  320
			  	safari   320                  640
			  	
			 	上面的问题，等有空再修复，这个版本暂时不用(已修复)
			  	
			  	在orientationchange的回调里增加一个定时器，解决某些低端安卓机获取可视区信息延迟的问题
			  	
			  	firefox不支持zoom，使用scale兼容
			  	解决在某些内嵌页下，screen输出的是设备的分辨率，而不是可视区的宽度
			  	window.screen.width ===document.documentElement.clientWidth?window.screen.width:window.screen.width/window.devicePixelRatio;
			  	
			  	大更新，由于window.screen在某些内嵌页下，返回的是设备的物理分辨率，并不是我们想要的设备可视区的信息，这样导致缩放比例出错，统一使用documen.documentElement.clientWidth和documen.documentElement.clientHeight。
			  	在resize的时候还原zoom或者meta 重新去获取正确的视窗信息（因为缩放的原因，拿到的size是被放大了，之所以不记录缩放系数，因为有可能导致精度问题）
			  	
			  	
			 **/
			
			/*2017-07-03 upDate
			 缩放规则更改
			 在安卓设备(4.4以上)上统一使用zoom来缩放(meta,target-densitydpi=device-dpi在某些内核下会自带缩放,即使没有设置initial-scale)
			 
			 安卓设备(4.4以下)使用zoom + target-densitydpi=device-dpi
			 
			 非安卓的设置使用<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />来缩放
			 
			 不使用target-densitydpi=device-dpi可能会引起一些问题,待观察*/
			
			/*2017-07-05 项目注意..
			zoom 最顶层只能使用到html上,所以会导致获取一些位置信息的错误,比如event.pageX/Y scrollTop等,不属于html和其子孙类的属性,这个问题可以通过使用除以缩放比例(parseFloat zoom的值)来修正*/
			
			/*2017-07-11 bug fixed
			解决在某些内核下,页面滑动(touchmove)也会触发resize,从而导致resetScale触发的问题*/
			
			/*2017-09-08* bug fixed /
			/*某些安卓版本下使用target-densitydpi=device-dpi会自动缩放,暂时不用,直接用zoom进行缩放*/
			//alert(navigator.userAgent)
			
			/*alert(window.orientation)*/
//			scale(1080,540);
			/*function scale(deWidth,webWidth){
				var changeTimer = null,sWidth = window.screen.width ===document.documentElement.clientWidth?window.screen.width:document.documentElement.clientWidth;
				if(/iPhone|iPad|iPod/.test(navigator.userAgent)&&typeof window.orientation!=="undefined"&&window.orientation !== 0){
					sWidth = window.screen.height;
				}
				if(navigator.userAgent.indexOf("Mobile")!==-1){
					
				window.onorientationchange = function(){
					
					changeTimer&&clearTimeout(changeTimer);
					changeTimer = setTimeout(function(){
						if(/iPhone|iPad|iPod/.test(navigator.userAgent)&&typeof window.orientation!=="undefined"&&window.orientation !== 0){
					sWidth = window.screen.height;
				}else{
					sWidth = window.screen.width
				}
						if(sWidth/deWidth<=1){
							if (navigator.userAgent.match(/Android (\d+\.\d+)/)){
								if(parseFloat(navigator.userAgent.match(/Android (\d+\.\d+)/)[1])<4.4||navigator.userAgent.indexOf("MZ-")!==-1){
									
									document.documentElement.style.zoom = sWidth/deWidth;
									return false;
								}
							}
							var meta = document.createElement("meta");
							meta.setAttribute("name","viewport");
							meta.setAttribute("content","width=device-width,initial-scale="+(sWidth/deWidth).toFixed(6)+",user-scalable=no,target-densitydpi=device-dpi");
							
							document.querySelector("[name=viewport]").remove();
							document.head.appendChild(meta);
								
							
						}
					},500)
					
				}
				if(sWidth/deWidth<=1){
					if (navigator.userAgent.match(/Android (\d+\.\d+)/)){
						
						if(parseFloat(navigator.userAgent.match(/Android (\d+\.\d+)/)[1])<4.4||navigator.userAgent.indexOf("MZ-")!==-1){
							
							document.documentElement.style.zoom = sWidth/deWidth;
							return false;
						}
					}
					
					var meta = document.createElement("meta");
							meta.setAttribute("name","viewport");
							meta.setAttribute("content","width=device-width,initial-scale="+(sWidth/deWidth).toFixed(6)+",user-scalable=no,target-densitydpi=device-dpi");
							document.querySelector("[name=viewport]").remove();
							document.head.appendChild(meta);
						alert(document.querySelector("[name=viewport]").content)
					
					
				}
			}else{
				if(navigator.userAgent.indexOf("Firefox")!==-1){
					document.documentElement.style.transform = "scale("+webWidth/deWidth+")";
				}else{
					document.documentElement.style.zoom = webWidth/deWidth;
				}
			}
			}*/
			/*function scale(deWidth,webWidth){
				alert("ok")
				var changeTimer = null;
				var initWidth = document.documentElement.clientWidth;
				var initHeight = document.documentElement.clientHeight;
				
				var sWidth = initWidth;
				
				if(navigator.userAgent.indexOf("Mobile")!==-1){
					
				window.onorientationchange = function(){
					
					if (navigator.userAgent.match(/Android (\d+\.\d+)/)&&(parseFloat(navigator.userAgent.match(/Android (\d+\.\d+)/)[1])<4.4||navigator.userAgent.indexOf("MZ-")!==-1)){
								
									document.documentElement.style.zoom = 1;
									
								
							}else{
								var meta = document.createElement("meta");
								meta.setAttribute("name","viewport");
								meta.setAttribute("content","width=device-width,initial-scale=1,user-scalable=no,target-densitydpi=device-dpi");
								
								document.querySelector("[name=viewport]").remove();
								document.head.appendChild(meta);
							}
					changeTimer&&clearTimeout(changeTimer);
					changeTimer = setTimeout(function(){
						
						sWidth = document.documentElement.clientWidth;
						
						alert(sWidth)
						alert(sWidth/deWidth<=1)
						if(sWidth/deWidth<=1){
							
							if (navigator.userAgent.match(/Android (\d+\.\d+)/)&&(parseFloat(navigator.userAgent.match(/Android (\d+\.\d+)/)[1])<4.4||navigator.userAgent.indexOf("MZ-")!==-1)){
								
									document.documentElement.style.zoom = sWidth/deWidth;
									
								
							}else{
								var meta = document.createElement("meta");
								meta.setAttribute("name","viewport");
								meta.setAttribute("content","width=device-width,initial-scale="+(sWidth/deWidth).toFixed(6)+",user-scalable=no,target-densitydpi=device-dpi");
								
								document.querySelector("[name=viewport]").remove();
								document.head.appendChild(meta);
							}
							
							
							
						}
					},500)
					
				}
				if(sWidth/deWidth<=1){
					alert(sWidth)
					if (navigator.userAgent.match(/Android (\d+\.\d+)/)&&(parseFloat(navigator.userAgent.match(/Android (\d+\.\d+)/)[1])<4.4||navigator.userAgent.indexOf("MZ-")!==-1)){
								
									document.documentElement.style.zoom = sWidth/deWidth;
									
								
							}else{
								var meta = document.createElement("meta");
								meta.setAttribute("name","viewport");
								meta.setAttribute("content","width=device-width,initial-scale="+(sWidth/deWidth).toFixed(6)+",user-scalable=no,target-densitydpi=device-dpi");
								
								document.querySelector("[name=viewport]").remove();
								document.head.appendChild(meta);
							}
					
					
				}
			}else{
				if(navigator.userAgent.indexOf("Firefox")!==-1){
					document.documentElement.style.transform = "scale("+webWidth/deWidth+")";
				}else{
					document.documentElement.style.zoom = webWidth/deWidth;
				}
			}
			}*/
			


var Scale = {
	init:function(deWidth,webWidth,specialScale){
		var that = this,changeTimer = null,initOrientation = window.orientation;
		that.sWidth = document.documentElement.clientWidth;
		that.sHeight = document.documentElement.clientHeight;
		that.deWidth = deWidth;
		that.webWidth = webWidth;
		that.specialScale = specialScale === true?true:false;
		/*if(navigator.userAgent.match(/Android (\d+\.\d+)/)&&(parseFloat(navigator.userAgent.match(/Android (\d+\.\d+)/)[1])<4.4)){
						var meta = document.createElement("meta");
							meta.setAttribute("name","viewport");
							meta.setAttribute("content","width=device-width,initial-scale=1,user-scalable=no,target-densitydpi=device-dpi");
							document.querySelector("[name=viewport]").remove();
							document.head.appendChild(meta);
		}*/
		if(navigator.userAgent.indexOf("Mobile")!==-1){
			
			that.setScale();
			
			window.onorientationchange = function(){
				/*alert("ok")*/
				that.resetScale();
				changeTimer&&clearTimeout(changeTimer);
				changeTimer = setTimeout(function(){
					that.sWidth = document.documentElement.clientWidth;
					that.setScale();
				},500)
			}
			
			if(navigator.userAgent.indexOf("iPhone OS")!==-1&&parseFloat(navigator.userAgent.split("iPhone OS ")[1].split(" ")[0].replace("_","."))>=9||navigator.userAgent.indexOf("iPhone OS") ===-1){
				/*if(navigator.userAgent.indexOf("Mobile") === -1){*/
				//解决某些浏览器下（ios7，safari），屏幕旋转会频繁触发resize
				//没必要在移动端上去监听resize，有orientationchange就够了
				//有些地方可能还是需要resize，比如内嵌到sdk，sdk有全屏操作时
				window.onresize = function(){
					if(initOrientation !== window.orientation){//区分resize和orientationchange
						initOrientation = window.orientation;
						return false;
					}
					if(that.initWidth === document.documentElement.clientWidth){//在某些内核下页面滑动也会触发resize
						return false
					}
					/*initWidth = document.documentElement.clientWidth;*/
					that.resetScale();
					changeTimer&&clearTimeout(changeTimer);
					changeTimer = setTimeout(function(){
						that.sWidth = document.documentElement.clientWidth;
						that.setScale();
					},500)
				}
			}
			
			
			
		}else{
			if(navigator.userAgent.indexOf("Firefox")!==-1){
				document.documentElement.style.transform = "scale("+that.webWidth/that.deWidth+")";
				document.documentElement.style.transformOrigin = "center 0";
			}else{
				document.documentElement.style.zoom = that.webWidth/that.deWidth;
			}
		}
	},
	setScale:function(){
		var that = this;
		if(that.sWidth/that.deWidth<=1){
			var widthAndHeightScale = document.documentElement.clientWidth>document.documentElement.clientHeight&&that.specialScale?document.documentElement.clientHeight/document.documentElement.clientWidth-0.1:1;
			//设置一个缩放比例，当屏幕宽高比不正常时（横屏时），进行缩放
			if(navigator.userAgent.match(/Android (\d+\.\d+)/)){
				
				document.documentElement.style.zoom = that.sWidth/that.deWidth*widthAndHeightScale;
			}else{
				
				var meta = document.createElement("meta");
				meta.setAttribute("name","viewport");
				meta.setAttribute("content","width=device-width,initial-scale="+(that.sWidth/that.deWidth*widthAndHeightScale)+",user-scalable=no");
				document.querySelector("[name=viewport]").remove();
				document.head.appendChild(meta);
			}
		}else{//处理横屏时，设备宽度大于设计图宽度时的处理，web上不用处理
			var widthAndHeightScale = document.documentElement.clientWidth>document.documentElement.clientHeight&&that.specialScale?document.documentElement.clientHeight/document.documentElement.clientWidth-0.1:1;
			//设置一个缩放比例，当屏幕宽高比不正常时（横屏时），进行缩放（主要针对有一屏显示需求的情况）
			if(navigator.userAgent.match(/Android (\d+\.\d+)/)){
				
				document.documentElement.style.zoom = widthAndHeightScale;
			}else{
				
				var meta = document.createElement("meta");
				meta.setAttribute("name","viewport");
				meta.setAttribute("content","width=device-width,initial-scale="+(widthAndHeightScale)+",user-scalable=no");
				document.querySelector("[name=viewport]").remove();
				document.head.appendChild(meta);
			}
		}
		
		that.initWidth = document.documentElement.clientWidth;
	},
	resetScale:function(){
		document.documentElement.style.zoom = 1;
		var meta = document.createElement("meta");
		meta.setAttribute("name","viewport");
		meta.setAttribute("content","width=device-width,initial-scale=1,user-scalable=no");
		document.querySelector("[name=viewport]").remove();
		document.head.appendChild(meta);
					
	}
}

/*function scale(deWidth,webWidth){
	if(navigator.userAgent.match(/Android (\d+\.\d+)/)&&(parseFloat(navigator.userAgent.match(/Android (\d+\.\d+)/)[1])<4.4)){
						var meta = document.createElement("meta");
							meta.setAttribute("name","viewport");
							meta.setAttribute("content","width=device-width,initial-scale="+(sWidth/deWidth)+",user-scalable=no,target-densitydpi=device-dpi");
							
							document.querySelector("[name=viewport]").remove();
							document.head.appendChild(meta);
						}
				var changeTimer = null;
				var initWidth = document.documentElement.clientWidth;
				var initHeight = document.documentElement.clientHeight;
				var sWidth = initWidth;
				if(navigator.userAgent.indexOf("Mobile")!==-1){
					
					window.onorientationchange = function(){
						resetScale();
						changeTimer&&clearTimeout(changeTimer);
						changeTimer = setTimeout(function(){
							sWidth = document.documentElement.clientWidth;
							setScale(sWidth,deWidth);
						},500)
					}
					setScale(sWidth,deWidth);
				}else{
					if(navigator.userAgent.indexOf("Firefox")!==-1){
						document.documentElement.style.transform = "scale("+webWidth/deWidth+")";
					}else{
						document.documentElement.style.zoom = webWidth/deWidth;
					}
				}
			}
			
			
			function setScale(sWidth,deWidth){
				
				if(sWidth/deWidth<=1){
					alert(sWidth)
					if (navigator.userAgent.match(/Android (\d+\.\d+)/)){
								
									document.documentElement.style.zoom = sWidth/deWidth;
							}else{
								var meta = document.createElement("meta");
								meta.setAttribute("name","viewport");
								meta.setAttribute("content","width=device-width,initial-scale="+(sWidth/deWidth)+",user-scalable=no");
								
								document.querySelector("[name=viewport]").remove();
								document.head.appendChild(meta);
								alert(meta.content)
								alert(document.documentElement.style.zoom)
								
							}
					
					
				}
				
			}
			
			function resetScale(){
				document.documentElement.style.zoom = 1;
				var meta = document.createElement("meta");
				meta.setAttribute("name","viewport");
				meta.setAttribute("content","width=device-width,initial-scale=1,user-scalable=no");
				
				document.querySelector("[name=viewport]").remove();
				document.head.appendChild(meta);
							
			}*/
			




