const t={bodyEl:document.querySelector("body"),btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};let e=null;function n(){t.bodyEl.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}function o(t,e){t.setAttribute("disabled",""),e.removeAttribute("disabled")}t.btnStart.addEventListener("click",(function(){n(),e=setInterval(n,1e3),o(t.btnStart,t.btnStop)})),t.btnStop.addEventListener("click",(function(){clearInterval(e),o(t.btnStop,t.btnStart)}));
//# sourceMappingURL=01-color-switcher.bbf8a053.js.map