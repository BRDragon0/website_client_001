export async function getGalleryData(){
    //Make sure current browser supports sessionStorage if not run everyTime
    if (typeof(Storage) !== "undefined"){
        if (sessionStorage.getItem("strGalleryData") !== null){
            return JSON.parse(sessionStorage.getItem("strGalleryData"));
        }
        else{
            return await fetchData();
        }
    }
    return await fetchData();

    //Create constructor for galleryData element
    function GalleryDataEntry(){
        this.file = "ERROR";
        this.name = "none";
        this.desc = "none";
        this.note = [];
        this.width = 0;
        this.height = 0;
        this.ratio = 0;
    }

    async function fetchData(){
        const sessionSeed = Math.random();
        const responce = await fetch("./assets/gallery/gallery.txt");
        let txtData = "";
        if(!responce.ok){
            console.error(`Gallery images could not be retrieved from the text file\nREASON:${responce.status}`)
        }
        else{
            txtData = await responce.text();
            txtData = txtData.split('!');
        }
        return formatData(txtData);
    }

    function formatData(txtData){
        const sectionMarkers = ['#', ':', '-', '?'];
        const sections = [];
        for(let entry = 0; entry < txtData.length; entry++){
            sections.push([]);
            const sectionFound = [];
            for (let char = 0; char < txtData[entry].length; char++){
                if (sectionMarkers.includes(txtData[entry][char])){
                    sectionFound.push(char);
                }
            }
            sectionFound.push(txtData[entry].length);
            for (let n = 1; n < sectionFound.length; n++){
                sections[entry].push(txtData[entry].substring(sectionFound[n - 1], sectionFound[n]).trim());
            }
        }
        sections.pop();
        return convertData(sections);
    }

    function convertData(sections){
        const result = [];
        for (let entry = 0; entry < sections.length; entry++){
            let tempEntry = new GalleryDataEntry();
            for (let line = 0; line < sections[entry].length; line++){
                switch (sections[entry][line][0]) {
                    case '#':
                        tempEntry.file = "gallery/" + sections[entry][line].substring(1);
                        break;
                    case ':':
                        tempEntry.name = sections[entry][line].substring(1);
                        break;
                    case '-':
                        tempEntry.desc = sections[entry][line].substring(1);
                        break;
                    case '?':
                        tempEntry.note.push(sections[entry][line].substring(1));
                        break;
                    default:
                        break;
                }
            }
            const tempImg = new Image();
            tempImg.src = "./assets/" + tempEntry.file;
            //console.log(tempImg.naturalWidth);
            tempEntry.width = tempImg.naturalWidth;
            tempEntry.height = tempImg.naturalHeight;
            tempEntry.ratio = tempEntry.width / tempEntry.height;
            result.push(tempEntry);
        }
        sessionStorage.setItem("strGalleryData", JSON.stringify(result));
        return result;
    }
}
