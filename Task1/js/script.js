console.log('Pratical task 1');
window.addEventListener('load', start);
var txtRed = document.querySelector('#txtRed');
var txtGreen = document.querySelector('#txtGreen');
var txtBlue = document.querySelector('#txtBlue');
var rangeRed = document.querySelector('#rangeR');
var rangeGreen = document.querySelector('#rangeG');
var rangeBlue = document.querySelector('#rangeB');

function start() {
  function updateColorPicked(event) {
    switch (event.target.id) {
      case 'rangeR':
        txtRed.value = event.target.value;
        break;
      case 'rangeG':
        txtGreen.value = event.target.value;
        break;
      case 'rangeB':
        txtBlue.value = event.target.value;
        break;
    }
    renderColorPicked();
  }
  rangeRed.addEventListener('change', updateColorPicked);
  rangeGreen.addEventListener('change', updateColorPicked);
  rangeBlue.addEventListener('change', updateColorPicked);
  rangeRed.addEventListener('input', updateColorPicked);
  rangeGreen.addEventListener('input', updateColorPicked);
  rangeBlue.addEventListener('input', updateColorPicked);
  addClassToItem(txtRed, 'textbox-small');
  updateElementValue(txtRed, 0);
  updateElementValue(rangeRed, 0);
  updateElementValue(txtGreen, 0);
  updateElementValue(rangeGreen, 0);
  addClassToItem(txtGreen, 'textbox-small');
  updateElementValue(txtBlue, 0);
  updateElementValue(rangeBlue, 0);
  addClassToItem(txtBlue, 'textbox-small');
  renderColorPicked();
}

function updateElementValue(element, value) {
  element.value = value;
}
function addClassToItem(item, className) {
  item.classList.add(className);
}
function renderColorPicked() {
  var colorPicked = document.querySelector('#colorPicked');
  console.log(colorPicked.backgroundColor);
  colorPicked.style.backgroundColor =
    'rgb(' + txtRed.value + ',' + txtGreen.value + ',' + txtBlue.value + ')';
}
