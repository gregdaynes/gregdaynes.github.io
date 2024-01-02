/*!
* FitText.js 1.0 jQuery free version
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
*
* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
*/
!function(){var addEvent=function(el,type,fn){el.addEventListener?el.addEventListener(type,fn,!1):el.attachEvent("on"+type,fn)},extend=function(obj,ext){for(var key in ext)ext.hasOwnProperty(key)&&(obj[key]=ext[key]);return obj};window.fitText=function(el,kompressor,options){var settings=extend({minFontSize:-1/0,maxFontSize:1/0},options),fit=function(el){var compressor=kompressor||1,resizer=function(){el.style.fontSize=Math.max(Math.min(el.clientWidth/(10*compressor),parseFloat(settings.maxFontSize)),parseFloat(settings.minFontSize))+"px"};resizer(),addEvent(window,"resize",resizer),addEvent(window,"orientationchange",resizer)};if(el.length)for(var i=0;i<el.length;i++)fit(el[i]);else fit(el);return el}}(),document.addEventListener("DOMContentLoaded",(()=>{window.fitText(document.querySelector("header h1"),.714),window.fitText(document.querySelector("header h2"),3.284)}));