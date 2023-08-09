const sketchPad = document.querySelector("#sketch-zone");
const padWidth = sketchPad.offsetWidth;
const padHeight = sketchPad.offsetHeight;
const userInputNumber = document.querySelector("#grid-input");
let gridSize = userInputNumber.value;



// console.log(`Width: ${padWidth} | Height: ${padHeight}`);


//
function populatePad(){
    let pixelDimensions = Math.floor(10*padWidth / gridSize) / 10;
    console.log(pixelDimensions);
    for (let i = 0; i < gridSize * gridSize; i++){
        pixelBox = document.createElement('div');
        pixelBox.className = 'pixel';
        pixelBox.setAttribute('id', i);
        pixelBox.style.width = pixelDimensions + "px";
        pixelBox.style.height = pixelDimensions + "px";
        sketchPad.appendChild(pixelBox);
    }
}

function listenForMouse(){
    let pixelBoxes = document.getElementsByClassName('pixel');
    for (let i = 0; i < gridSize * gridSize; i++){
        pixelBoxes[i].addEventListener('mouseover', function(){
            pixelBoxes[i].style.background = "black";
            console.log(i);
        })
    }
}

populatePad();
listenForMouse();

const adjustButton = document.getElementById('size-button');

adjustButton.addEventListener('click', function(){
    window.location.reload();
    console.log("Hello!");
});

