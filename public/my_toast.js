let icon = {
    success: '<span>✅</span>', 
    danger: '<span>🛑</span>', 
    warning: '<span>⚠️</span>', 
    info: '<span>ℹ️</span>', 
}; 
let activatedToasts = [];  
const showToast = ( 
    message = "Sample Message", 
    toastType = "info", 
    duration = 5000) => { 
    if ( 
        !Object.keys(icon).includes(toastType)) 
        toastType = "info"; 
  
    let box = document.createElement("div"); 
    box.classList.add( 
        "toast", `toast-${toastType}`); 
    box.innerHTML = ` <span style="float: right;" onclick="closeToast(this)">❌</span><div class="toast-content-wrapper"> 
                      <div class="toast-icon"> 
                      ${icon[toastType]} 
                      </div> 
                      <div class="toast-message">${message}</div> 
                      <div class="toast-progress"></div> 
                      </div>`; 
    duration = duration || 5000; 
    box.querySelector(".toast-progress").style.animationDuration = 
            `${duration / 1000}s`; 
    box.style.setProperty('animation', `slideInRight 0.3s ease-in-out forwards, fadeOut 0.5s ease-in-out forwards ${duration/1000-0.8}s`); 
if(activatedToasts.length >= 1){
	activatedToasts[activatedToasts.length - 1].style.animationPlayState = 'paused';
 var fir = activatedToasts[activatedToasts.length - 1]
var sec = fir.childNodes[2];
var thi = sec.childNodes[5];
thi.style.animationPlayState = 'paused';
	}
    document.body.appendChild(box)
    activatedToasts.push(box);
  var fto =  box.childNodes[2];
  var fthe = fto.childNodes[5];
  fthe.addEventListener("animationend", (event) => {
  	var fp = (event.target).parentElement;
	  var sp = fp.parentElement;
	  sp.remove();
	  runNext();
  });
    };
function closeToast(me){
	me.parentElement.remove();
	runNext();
	}
		function runNext(){
			console.log(activatedToasts.length);
			activatedToasts.pop();
			if(activatedToasts.length == 0) return;
			var firfi = activatedToasts[activatedToasts.length - 1];
			var firsec = firfi.childNodes[2];
			var firfinan= firsec.childNodes[5];
		   firfi.style.animationPlayState = 'running';
       	firfinan.style.animationPlayState = 'running';
			};
