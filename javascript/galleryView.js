import { getGalleryData } from "./retreiveGalleryData.js";

const viewArea = document.getElementById("viewImg");
const mainGallery = document.getElementById("mainGallery");
const galleryData = await getGalleryData();

function createGallery(){
    const blankArea = {
        file: "blankImg.png",
        name: "",
        desc: "",
        note: [],
        width: 480,
        height: 480,
        ratio: 1
    };
    const tall = [];
    const wide = [];
    let elemNum = 0;
    let tallTurn = true;
    let galleryHTML = "";

    for(let entry = 0; entry < galleryData.length; entry++){
        if(galleryData[entry].ratio <= 1){tall.push(galleryData[entry])}
        else{wide.push(galleryData[entry])}
    }

    for(let i = 0; i < tall.length % 3; i++){
        tall.push(blankArea)
    }

    for(let i = 0; i < wide.length % 2; i++){
        wide.push(blankArea)
    }
    //lim was added becuase using the length of tall and wide in the loop adjusted to changes from inside the loop
    let lim = ((tall.length / 3) + (wide.length / 2));
    for(let i = 0; i < lim; i++){
        console.log("w");
        if (tall.length == 0 && wide.length == 0){
            console.log("b");
            break;
        }

        galleryHTML += `<div class="galleryRow">`;
        //Using a trueth table I discovered this give output of 1 when the next row should be tall and 0 when it should be short
        let isTall = +(tall.length != 0 && (!tallTurn && wide.length != 0));
        let sizeData = wide;
        if(isTall){sizeData = tall}
        //adding isTall to the for allows for a far simplier for loop
        for(let n = 0; n < 2 + isTall; n++){
            galleryHTML += `<div class="galleryImg">
                <h3>${sizeData[n].name}</h3>
                <div class="sizeLimit">
                    <label class="btn_img" style="position: relative;">
                        <img src="assets/${sizeData[n].file}" alt="${sizeData[n].name}">
                        <button id="r${i}c${n}e${elemNum}" onclick="openView(this.id)"></button>
                    </label>
                </div>
            </div>`;
            elemNum++;
        }
        if(isTall){tall.splice(0, 3)}
        else{wide.splice(0, 2)}
        galleryHTML += `</div>`;
        tallTurn = !tallTurn;
    }
    mainGallery.innerHTML = galleryHTML;
}
createGallery();



function closeView(){
    viewArea.style = "pointer-events: none;";
    viewArea.innerHTML = "";
}
window.closeView = closeView;



function openView(imgID){
    //gets index of img in galleryData from the ID
    let galleryIndex = imgID.substring(imgID.indexOf('e') + 1);
    galleryIndex = +galleryIndex;
    viewArea.style = "pointer-events: auto;";
    viewArea.innerHTML = `
        <div class="areaCover">
        </div>
        <div class="boundImg">
            <img src="assets/${galleryData[galleryIndex].file}">
        </div>
        <div class="boundDet">
            <label class="btn_img" style="width: 44px; right: 8px; top: 8px;">
                <img src="assets/closeButton_lm.png" alt="close image view">
                <button onclick="closeView()"></button>
            </label>
            <div style="height: 40px;"></div>
            <p class="tm_0"><span>Name: </span>${galleryData[galleryIndex].name}</p>
            <p class="tm_1"><span>Description: </span>${galleryData[galleryIndex].desc}</p>
            <p class="tm_2"><span>Notes: </span>${galleryData[galleryIndex].note}</p>
            <p class="tm_3"><span>File: </span>${galleryData[galleryIndex].file}</p>
        </div>
    `;
}
window.openView = openView;