const navOptions = document.getElementById('togl_trig_options');
const animateOptions = document.getElementById('selectionAnimator');
const rootVariables = document.querySelector(':root');
const scrollingBars = document.getElementById("scrollingBars");

function togl_trig_activate(){
    if (navOptions.checked){
        animate_rollOut(1000, 0, 450);
    }
    else{
        animate_rollOut(1000, 450, 0);
    }
}

function animate_rollOut(durration, startPos, endPos){
    let interval = 0;
    const interval_rollOut = setInterval(() => {
        interval += 33;
        const rootComputed = getComputedStyle(rootVariables);
        let properties = Array.from(rootComputed).filter(property => property.startsWith("--"));
        for(let p = 0; p < properties.length; p++){
            if(properties[p] == "--posX-optionsFilm"){
                let currentX = rootComputed.getPropertyValue(properties[p]);
                rootVariables.style.setProperty(properties[p], (startPos + ((interval * (endPos - startPos)) / durration)).toString() + "px");
            }
        }
        if(interval >= durration){
            rootVariables.style.setProperty("--posX-optionsFilm", endPos.toString() + "px");
            clearInterval(interval_rollOut);
        }
    }, 33);
}


