const sketchPad = document.getElementById("sketch-zone");
const padWidth = sketchPad.offsetWidth;
const padHeight = sketchPad.offsetHeight;
const inputField = document.getElementById("grid-size-input");
const warningMessage = document.getElementById("warning");

let gridSize = document
  .getElementById("grid-size-input")
  .placeholder.split(": ")[1];
let pixelBox = document.createElement("div");
pixelBox.className = "pixel";

inputField.addEventListener("keyup", function () {
  validateInputSize(inputField.value);
});

function populatePad() {
  let pixelDimensions = Math.floor((10 * padWidth) / gridSize) / 10;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const newPixel = pixelBox.cloneNode(true);
    newPixel.setAttribute("id", i);
    newPixel.style.width = pixelDimensions + "px";
    newPixel.style.height = pixelDimensions + "px";
    sketchPad.appendChild(newPixel);
  }
}

function listenForMouse() {
  let pixelBoxes = document.getElementsByClassName("pixel");
  for (let i = 0; i < gridSize * gridSize; i++) {
    pixelBoxes[i].addEventListener("mouseover", function () {
      pixelBoxes[i].style.background = "black";
    });
  }
}

const adjustButton = document.getElementById("size-button");

adjustButton.addEventListener("click", function () {
  const userInput = document.getElementById("grid-size-input").value;

  gridSize = parseInt(userInput);
  populateAndListen();
});

function populateAndListen() {
  clearPad();
  populatePad();
  listenForMouse();
}

function clearPad() {
  sketchPad.innerHTML = "";
}

function validateInputSize(inputFieldValue) {
  if (inputFieldValue == "") {
    return;
  } else if (inputFieldValue > 200 || inputFieldValue < 1) {
    inputField.value = 200;
    warningMessage.style.visibility = "visible";
  } else {
    warningMessage.style.visibility = "hidden";
  }
}

populateAndListen();
