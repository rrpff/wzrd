!function(){var _$client_1={};const editor=document.getElementById("editor"),debounce=(e,t)=>{let n;return(...o)=>{n&&clearTimeout(n),n=setTimeout(()=>e(...o),t)}},change=()=>{eval(editor.value)};change(),editor.addEventListener("keyup",debounce(change,500))}();