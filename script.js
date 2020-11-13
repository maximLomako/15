const createField = () => {
  const body = document.querySelector('body');
  const numbers = [...Array(15).keys()];

  body.insertAdjacentHTML('afterbegin',
    `
<div class="container">
  <div class="indicators">
    <div class="counter">000</div>
    <div class="timer">00:00</div>
    <div class="gear">
      <img src="./assets/icons/gear.svg" alt="gear-icon">
    </div>
  </div>
  <div class="field"></div>
</div>`);

  const field = document.querySelector('.field');
  numbers.map(c => field.insertAdjacentHTML('beforeend', `<div class="cell">${c}</div>`));
}
createField();

//global variable
const container = document.querySelector('.container'),
  field = document.querySelector('.field'),
  cell = document.querySelectorAll('.cell');
let numOfCellsinRow = 4;
let fieldWidth = '';
let cellWidth = '';
let cellHeight = '';

const makeResponsibleDesign = () => {
  fieldWidth = window.getComputedStyle(field).getPropertyValue('width');
  cellWidth = parseInt(fieldWidth, 10) /numOfCellsinRow + 'px';
  cellHeight = cellWidth;
  field.style.height = fieldWidth;

  cell.forEach(c => {
    c.style.width = cellWidth;
    c.style.height = cellWidth;
  })
}
makeResponsibleDesign();

const initGame = () => {

}


initGame();



window.addEventListener("resize", makeResponsibleDesign);