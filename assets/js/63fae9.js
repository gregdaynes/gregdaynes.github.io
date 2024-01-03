/**
 * fitty v2.4.2 - Snugly resizes text to fit its parent container
 * Copyright (c) 2023 Rik Schennink <rik@pqina.nl> (https://pqina.nl/)
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).fitty=t()}(this,(function(){"use strict";return function(e){function t(e,t){var n=Object.assign({},E,t),i=e.map((function(e){var t=Object.assign({},n,{element:e,active:!0});return function(e){e.originalStyle={whiteSpace:e.element.style.whiteSpace,display:e.element.style.display,fontSize:e.element.style.fontSize},W(e),e.newbie=!0,e.dirty=!0,a.push(e)}(t),{element:e,fit:w(t,u),unfreeze:g(t),freeze:F(t),unsubscribe:z(t)}}));return f(),i}function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"string"==typeof e?t(i(document.querySelectorAll(e)),n):t([e],n)[0]}if(e){var i=function(e){return[].slice.call(e)},r=0,o=1,l=2,u=3,a=[],c=null,f="requestAnimationFrame"in e?function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{sync:!1};e.cancelAnimationFrame(c);var n=function(){return d(a.filter((function(e){return e.dirty&&e.active})))};if(t.sync)return n();c=e.requestAnimationFrame(n)}:function(){},s=function(e){return function(t){a.forEach((function(t){return t.dirty=e})),f(t)}},d=function(e){e.filter((function(e){return!e.styleComputed})).forEach((function(e){e.styleComputed=v(e)})),e.filter(h).forEach(S);var t=e.filter(m);t.forEach(y),t.forEach((function(e){S(e),p(e)})),t.forEach(b)},p=function(e){return e.dirty=r},y=function(e){e.availableWidth=e.element.parentNode.clientWidth,e.currentWidth=e.element.scrollWidth,e.previousFontSize=e.currentFontSize,e.currentFontSize=Math.min(Math.max(e.minSize,e.availableWidth/e.currentWidth*e.previousFontSize),e.maxSize),e.whiteSpace=e.multiLine&&e.currentFontSize===e.minSize?"normal":"nowrap"},m=function(e){return e.dirty!==l||e.dirty===l&&e.element.parentNode.clientWidth!==e.availableWidth},v=function(t){var n=e.getComputedStyle(t.element,null);return t.currentFontSize=parseFloat(n.getPropertyValue("font-size")),t.display=n.getPropertyValue("display"),t.whiteSpace=n.getPropertyValue("white-space"),!0},h=function(e){var t=!1;return!e.preStyleTestCompleted&&(/inline-/.test(e.display)||(t=!0,e.display="inline-block"),"nowrap"!==e.whiteSpace&&(t=!0,e.whiteSpace="nowrap"),e.preStyleTestCompleted=!0,t)},S=function(e){e.element.style.whiteSpace=e.whiteSpace,e.element.style.display=e.display,e.element.style.fontSize=e.currentFontSize+"px"},b=function(e){e.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:e.previousFontSize,newValue:e.currentFontSize,scaleFactor:e.currentFontSize/e.previousFontSize}}))},w=function(e,t){return function(n){e.dirty=t,e.active&&f(n)}},z=function(e){return function(){a=a.filter((function(t){return t.element!==e.element})),e.observeMutations&&e.observer.disconnect(),e.element.style.whiteSpace=e.originalStyle.whiteSpace,e.element.style.display=e.originalStyle.display,e.element.style.fontSize=e.originalStyle.fontSize}},g=function(e){return function(){e.active||(e.active=!0,f())}},F=function(e){return function(){return e.active=!1}},W=function(e){e.observeMutations&&(e.observer=new MutationObserver(w(e,o)),e.observer.observe(e.element,e.observeMutations))},E={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in e&&{subtree:!0,childList:!0,characterData:!0}},M=null,x=function(){e.clearTimeout(M),M=e.setTimeout(s(l),n.observeWindowDelay)},C=["resize","orientationchange"];return Object.defineProperty(n,"observeWindow",{set:function(t){var n="".concat(t?"add":"remove","EventListener");C.forEach((function(t){e[n](t,x)}))}}),n.observeWindow=!0,n.observeWindowDelay=100,n.fitAll=s(u),n}}("undefined"==typeof window?null:window)})),fitty("header h1"),fitty("header h2",{minSize:12});