const sketchPad = document.getElementById("sketch-zone");
const padWidth = sketchPad.offsetWidth;
const padHeight = sketchPad.offsetHeight;
const inputField = document.getElementById("grid-size-input");
const warningMessage = document.getElementById("warning");
const colorPicker = document.getElementById("selectedColor");
const colorPickerRadio = document.getElementById("radioPick");
const colorModeRadios = document.querySelectorAll('input[name="mode"]');
const fillSettingRadios = document.querySelectorAll('input[name="fillMode"]');

let selectedColorModeRadio = document.querySelector(
  'input[name="mode"]:checked'
).value;

let selectedFillSetting = document.querySelector(
  'input[name="fillMode"]:checked'
).value;

let colorToUse = "black";

let gridSize = document
  .getElementById("grid-size-input")
  .placeholder.split(": ")[1];
let pixelBox = document.createElement("div");
pixelBox.className = "pixel";

// Listeners

inputField.addEventListener("change", function () {
  validateInputSize(inputField.value);
});

const adjustButton = document.getElementById("size-button");

adjustButton.addEventListener("click", function () {
  const userInput = document.getElementById("grid-size-input").value;

  gridSize = parseInt(userInput);
  populateAndListen();
});

colorPicker.addEventListener("click", function () {
  colorPickerRadio.checked = "true";
});

colorPicker.addEventListener("change", function () {
  colorToUse = colorPicker.value;
});

colorModeRadios.forEach((radio) =>
  radio.addEventListener("click", function () {
    selectedColorModeRadio = radio.value;
    setColor(selectedColorModeRadio);
  })
);

fillSettingRadios.forEach((radio) =>
  radio.addEventListener("change", function () {
    selectedFillSetting = radio.value;
  })
);

// Listeners end

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

function colorThePixel(pixel) {
  pixel.style.background = colorToUse;
  if (selectedColorModeRadio == "random") {
    randomColor();
  }
}

function listenForMouseEvents() {
  let pixelBoxes = document.getElementsByClassName("pixel");

  for (let i = 0; i < gridSize * gridSize; i++) {
    pixelBoxes[i].addEventListener("mouseover", function () {
      if (selectedFillSetting == "fillOnHover") {
        colorThePixel(pixelBoxes[i]);
      }
    });
    pixelBoxes[i].addEventListener("click", function () {
      if (selectedFillSetting == "fillOnClick") {
        colorThePixel(pixelBoxes[i]);
      }
    });
  }
}

function colorOnMouseOver(pixel) {
  if (selectedFillSetting == "fillOnHover") {
    pixel.style.background = colorToUse;
    if (selectedColorModeRadio == "random") {
      randomColor();
    }
  }
}

function setColor(key) {
  if (key == "black") {
    colorToUse = "black";
  } else if (key == "random") {
    colorToUse = randomColor();
  } else if (key == "pickColor") {
    colorToUse = colorPicker.value;
  }
}

function randomColor() {
  const color = [...Array(6)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  colorToUse = "#" + color;
}

function populateAndListen() {
  clearPad();
  populatePad();
  listenForMouseEvents();
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
