!function(t,e){function n(t){t.preventDefault()}function o(t,e,n){return 0>t?n?e-1:0:t>=e?n?0:e-1:t}function i(t,e,n){var o="0px",i="0px";"v"===e?i=n+"px":o=n+"px",t.css({"-webkit-transform":"translate3d("+o+", "+i+", 0px);",transform:"translate3d("+o+", "+i+", 0px);"})}function a(e){var n=t.extend(!0,{},h,e),o=this;o.curIndex=-1,o.o=n,o.startY=0,o.movingFlag=!1,o.$this.addClass("fullPage-wp"),o.$parent=o.$this.parent(),o.$pages=o.$this.find(n.page).addClass("fullPage-page fullPage-dir-"+n.dir),o.pagesLength=o.$pages.length,o.update(),o.initEvent(),o.start()}function r(t,e){this.$this=t,a.call(this,e)}if("undefined"==typeof t)throw new Error("zepto.fullpage's script requires Zepto");var s=null,h={page:".page",start:0,duration:500,loop:!1,drag:!1,dir:"v",der:.1,change:function(){},beforeChange:function(){},afterChange:function(){},orientationchange:function(){}};t.extend(r.prototype,{update:function(){"h"===this.o.dir&&(this.width=this.$parent.width(),this.$pages.width(this.width),this.$this.width(this.width*this.pagesLength)),this.height=this.$parent.height(),this.$pages.height(this.height),this.moveTo(this.curIndex<0?this.o.start:this.curIndex)},initEvent:function(){var t=this,n=t.$this;n.on("touchstart",function(e){return t.status?t.movingFlag?0:(t.startX=e.targetTouches[0].pageX,void(t.startY=e.targetTouches[0].pageY)):1}),n.on("touchend",function(e){if(!t.status)return 1;if(t.movingFlag)return 0;var n="v"===t.o.dir?(e.changedTouches[0].pageY-t.startY)/t.height:(e.changedTouches[0].pageX-t.startX)/t.width,o=n>t.o.der||n<-t.o.der?n>0?-1:1:0;t.moveTo(t.curIndex+o,!0)}),t.o.drag&&n.on("touchmove",function(e){if(!t.status)return 1;if(t.movingFlag)return t.startX=e.targetTouches[0].pageX,t.startY=e.targetTouches[0].pageY,0;var o=e.changedTouches[0].pageY-t.startY;(0==t.curIndex&&o>0||t.curIndex===t.pagesLength-1&&0>o)&&(o/=2);var a=e.changedTouches[0].pageX-t.startX;(0==t.curIndex&&a>0||t.curIndex===t.pagesLength-1&&0>a)&&(a/=2);var r="v"===t.o.dir?-t.curIndex*t.height+o:-t.curIndex*t.width+a;n.removeClass("anim"),i(n,t.o.dir,r)}),e.addEventListener("orientationchange",function(){(180===e.orientation||0===e.orientation)&&t.o.orientationchange("portrait"),(90===e.orientation||-90===e.orientation)&&t.o.orientationchange("landscape")},!1),e.addEventListener("resize",function(){t.update()},!1)},holdTouch:function(){t(document).on("touchmove",n)},unholdTouch:function(){t(document).off("touchmove",n)},start:function(){this.status=1,this.holdTouch()},stop:function(){this.status=0,this.unholdTouch()},moveTo:function(t,n){var a=this,r=a.$this,s=a.curIndex;if(t=o(t,a.pagesLength,a.o.loop),n?r.addClass("anim"):r.removeClass("anim"),t!==s){var h=a.o.beforeChange({next:t,cur:s});if(h===!1)return 1}return a.movingFlag=!0,a.curIndex=t,i(r,a.o.dir,-t*("v"===a.o.dir?a.height:a.width)),t!==s&&a.o.change({prev:s,cur:t}),e.setTimeout(function(){a.movingFlag=!1,t!==s&&(a.o.afterChange({prev:s,cur:t}),a.$pages.removeClass("cur").eq(t).addClass("cur"))},a.o.duration),0},movePrev:function(t){this.moveTo(this.curIndex-1,t)},moveNext:function(t){this.moveTo(this.curIndex+1,t)},getCurIndex:function(){return this.curIndex}}),t.fn.fullpage=function(e){return s||(s=new r(t(this),e)),this},t.fn.fullpage.version="0.5.0",t.each(["update","moveTo","moveNext","movePrev","start","stop","getCurIndex","holdTouch","unholdTouch"],function(e,n){t.fn.fullpage[n]=function(){return s?s[n].apply(s,arguments):0}})}(Zepto,window);