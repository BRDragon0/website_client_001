import { getGalleryData } from "./retreiveGalleryData.js";

const scrollContainer = document.getElementById("scrollingBars");
const galleryData = await getGalleryData();

setScrolling();

async function setScrolling(){
    const docSize = [window.innerWidth, window.innerHeight];
    const numFrames = 2 * (Math.floor(docSize[0] / 100) + 2) - 1;
    scrollContainer.innerHTML = "";
    //For each frame give random img from gallery and name for alt
    for (let n = 1; n <= numFrames; n++){
        let randomNumber = Math.floor((n * Math.random()) % galleryData.length);
        scrollContainer.innerHTML += `
        <div class="scrollFrame" style="animation-delay: -${Math.round(20 / numFrames * n * 1000)}ms;">
            <img class="img_bar_frame" src="assets/filmFrame.png">
            <div class="bar_galleryCover">
                <img class="img_bar_gallery" src="./assets/${galleryData[randomNumber].file}" alt="${galleryData[randomNumber].name}">
            </div>
        </div>
        `;
    }
}